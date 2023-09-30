const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
app.use(cors(corsOptions));


isValidNumber = (cardNumber) =>{

    if(cardNumber.length >= 16 && cardNumber.length <= 19){
        return true;
        
    }
    return false;
    
}

isValidName = (cardName) =>{
    return cardName.trim() !== "";
}

isValidExpiry = (cardExpiry) => {

    const [monthStr, yearStr] = cardExpiry.split('/').map((str) => str.trim());

    // Explicitly parse the month and year as decimal (base 10) numbers
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based

    if (year > currentYear || (year === currentYear && month >= currentMonth)) {
        return true;
    }
    return false;
}

getCardType = (cardNumber) =>{
    if (/^34|^37/.test(cardNumber)) {
        return "American Express";
      }
      return "Other";
}


isValidCvv = (cardNumber,cardCvv) =>{
    const cardType = getCardType(cardNumber);

    const cvvLengths = {
      "American Express": 4,
      "Other": 3,
    };
  
    const requiredLength = cvvLengths[cardType];
    return cardCvv.length === requiredLength;

}

isValidLuhnCheckDigit = (cardNumber) => {
    let cardDigits = cardNumber.split('').map(Number);
    
    for (let i = cardDigits.length - 2; i >= 0; i -= 2) {
        cardDigits[i] *= 2;
        if (cardDigits[i] > 9) {
            cardDigits[i] -= 9;
        }
    }
    
    const sum = cardDigits.reduce((acc, digit) => acc + digit, 0);
    console.log("LUHN", sum % 10 === 0)
    return sum % 10 === 0;
}
 

// POST


app.post("/api/validate-credit-card", (req, res) => {
  const { cardNumber, cardName, cardExpiry, cardCvv } = req.body;

    console.log("Receving request with data:", cardNumber, cardName, cardExpiry, cardCvv);   

    const isValidCardNumber = isValidNumber(cardNumber);
    const isValidcardName = isValidName(cardName);
    const isValidCardExpiry = isValidExpiry(cardExpiry);
    const isValidCardCvv = isValidCvv(cardNumber,cardCvv);
    const isValidLuhn = isValidLuhnCheckDigit(cardNumber);
    const isValidCard = isValidCardNumber && isValidcardName && isValidCardExpiry && isValidCardCvv && isValidLuhn;

    console.log("isValidCardNumber", isValidCardNumber)
    console.log("isValidcardName", isValidcardName)
    console.log("isValidCardExpiry", isValidCardExpiry)
    console.log("isValidCardCvv", isValidCardCvv)
    console.log("isValidLuhn", isValidLuhn)

    // Send the validation result as a JSON response
    if (isValidCard) {
        console.log("Valid card.");
        res.status(200).json({ success: true , isValidNumber: isValidCardNumber,isValidName: isValidcardName ,isValidExpiry: isValidCardExpiry,isValidCvv:isValidCardCvv,isValidLuhn:isValidLuhn });
      } else {
        console.log("Invalid card.");
        res.status(400).json({ success: false });
      }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
