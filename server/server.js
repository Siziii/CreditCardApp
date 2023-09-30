const express = require("express");
const app = express();
app.use(express.json());


isValidNumber = (cardNumber) =>{
    if(cardNumber.length >= 16 && cardNumber.length <= 19){
        return true;
    }
    return false;
}

isValidName = (cardName) =>{
    return cardName.trim() !== "";
}

isValidExpiry = (cardExpiry) =>{
    const [monthStr, yearStr] = cardExpiry.split('/').map((str) => str.trim());

    // Convert the extracted strings to numbers
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
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


// POST


app.post("/api/validate-credit-card", (req, res) => {
  const { cardNumber, cardName, cardExpiry, cardCvv } = req.body;

    const isValidCardNumber = isValidNumber(cardNumber);
    const isValidcardName = isValidName(cardName);
    const isValidCardExpiry = isValidExpiry(cardExpiry);
    const isValidCardCvv = isValidCvv(cardCvv);

    const isValidCard = isValidCardNumber && isValidcardName && isValidCardExpiry && isValidCardCvv;

    // Send the validation result as a JSON response
    if (isValidCard) {
    res.status(200).json({ success: true });
    } else {
    res.status(400).json({ success: false });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
