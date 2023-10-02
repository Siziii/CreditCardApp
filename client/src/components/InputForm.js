import { useState, useEffect } from "react"
import axios from "axios";
import { CreditCard } from "react-bootstrap-icons";

const InputForm = ({number,setNumber,name,setName,expiry,setExpiry,cvv,setCvv,setCvvFocused}) => {

    const [validationResults, setValidationResults] = useState({
        isValidNumber: true,
        isValidName: true,
        isValidExpiry: true,
        isValidCvv: true,
        isValidLuhn: true,
        isValidCard: true,
    });
    const formatCardNumber = (number) =>{
        const cleanedNumber = number.replace(/\D/g, '');
        return cleanedNumber;
    }

    useEffect(() => {
        console.log("isValidCardNumber ", validationResults.isValidNumber);
        console.log("isValidcardName ", validationResults.isValidName);
        console.log("isValidCardExpiry ", validationResults.isValidExpiry);
        console.log("isValidCardCvv ", validationResults.isValidCvv);
        console.log("isValidLuhn ", validationResults.isValidLuhn);
      }, [validationResults]);

    const handlePayment = async () =>{
        try{
            console.log("Sending request with data:", number, name, expiry, cvv);
            const response = await axios.post("http://localhost:5000/api/validate-credit-card", {
                cardNumber: number,
                cardName: name,
                cardExpiry: expiry,
                cardCvv: cvv,
                });
            setValidationResults(response.data);
            
            if (response.data.success) {
            console.log("Payment successful!");
            } else {
            console.error("Payment failed. Please check your card details.");
            }
        } catch (error){
            if (!error.response.data.success){
                setValidationResults(error.response.data);
                console.log("Payment failed. Please check your card details.")
            }
            else{
            console.error(error);
            }
        }
    }

    return ( 
        
        <div className="InputForm">
            <form onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="tel"
                    name="number"
                    placeholder="0000 0000 0000 0000"
                    value={formatCardNumber(number)}
                    className={validationResults.isValidNumber && validationResults.isValidLuhn ? 'correct' : 'error'}
                    onChange={e=>setNumber(e.target.value)}
                />

                <input 
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={name}
                    className={validationResults.isValidName ? 'correct' : 'error'}
                    onChange={e=>setName(e.target.value)}
                />
                <input 
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    className={validationResults.isValidExpiry ? 'correct' : 'error'}
                    onChange={e=>setExpiry(e.target.value)}
                />
                <input 
                    type="tel"
                    name="cvv"
                    placeholder="123"
                    value={cvv}
                    className={validationResults.isValidCvv ? 'correct' : 'error'}
                    onChange={e=>setCvv(e.target.value)}
                    onFocus={()=>setCvvFocused(true)}
                    onBlur={()=>setCvvFocused(false)}
                />
            </form>
            <button className="pay-btn" onClick={handlePayment}>
                <p>PAY</p>
                <CreditCard size="21"/>
            </button>
            {   
                validationResults.isValidCard ?
                (<p>Payment successful!</p>
                ) : (<p>Please check your credit card info</p>)
            }
        </div>
     );
}
 
export default InputForm;