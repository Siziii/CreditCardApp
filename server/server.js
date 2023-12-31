const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

//CORS setup
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "POST",
    credentials: true,
};
app.use(cors(corsOptions));

// Validation functions

isValidNumber = (cardNumber) => {

    if (cardNumber.length >= 16 && cardNumber.length <= 19) {
        return true;
    }
    return false;

}

isValidName = (cardName) => {
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

getCardType = (cardNumber) => {
    //check if card number starts with 34 or 37 (amex)
    if (/^34|^37/.test(cardNumber)) {
        return "American Express";
    }
    return "Other";
}


isValidCvv = (cardNumber, cardCvv) => {
    const cardType = getCardType(cardNumber);
    //cards array
    const cvvLengths = {
        "American Express": 4,
        "Other": 3,
    };

    const requiredLength = cvvLengths[cardType];
    return cardCvv.length === requiredLength;

}

isValidLuhnCheckDigit = (cardNumber) => {
    //double every second n from back of the list, if n>9 substract 9, then sum the array, then check if sum mod10
    let cardDigits = cardNumber.split('').map(Number);

    for (let i = cardDigits.length - 2; i >= 0; i -= 2) {
        cardDigits[i] *= 2;
        if (cardDigits[i] > 9) {
            cardDigits[i] -= 9;
        }
    }
    
    const sum = cardDigits.reduce((acc, digit) => acc + digit, 0);
    return sum % 10 === 0;
}


// POST


app.post("/api/validate-credit-card", (req, res) => {
    try {
        const { cardNumber, cardName, cardExpiry, cardCvv } = req.body;

        console.log("Receving request with data:", cardNumber, cardName, cardExpiry, cardCvv);

        // validation booleans
        const isValidCardNumber = isValidNumber(cardNumber);
        const isValidCardName = isValidName(cardName);
        const isValidCardExpiry = isValidExpiry(cardExpiry);
        const isValidCardCvv = isValidCvv(cardNumber, cardCvv);
        const isValidLuhn = isValidLuhnCheckDigit(cardNumber);

        // valid card boolean
        const isValidCard =
            isValidCardNumber &&
            isValidCardName &&
            isValidCardExpiry &&
            isValidCardCvv &&
            isValidLuhn;

        // Send the validation result as a JSON response
        if (isValidCard) {
            //everything is okay, return status 200
            console.log("Valid card.");
            res.status(200).json({
                success: true,
                isValidNumber: isValidCardNumber,
                isValidName: isValidCardName,
                isValidExpiry: isValidCardExpiry,
                isValidCvv: isValidCardCvv,
                isValidLuhn: isValidLuhn,
                isValidCard: isValidCard
            });
        } else {
            //card is invalid, return status 400
            console.log("Invalid card.");
            res.status(400).json({
                success: false,
                isValidNumber: isValidCardNumber,
                isValidName: isValidCardName,
                isValidExpiry: isValidCardExpiry,
                isValidCvv: isValidCardCvv,
                isValidLuhn: isValidLuhn,
                message: "Validation failed",
            });
        }
    } catch (error) {
        //server error
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//start the server on port 5000
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
