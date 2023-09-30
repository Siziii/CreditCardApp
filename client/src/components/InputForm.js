import { useState } from "react"
import axios from "axios";

const InputForm = () => {
    const[number,setNumber]=useState('')
    const[name,setName]=useState('')
    const[expiry,setExpiry]=useState('')
    const[cvv,setCvv]=useState('')
    
    const handlePayment = async () =>{
        try{
            console.log("Sending request with data:", number, name, expiry, cvv);
            const response = await axios.post("http://localhost:5000/api/validate-credit-card", {
                cardNumber: number,
                cardName: name,
                cardExpiry: expiry,
                cardCvv: cvv,
                });
                if (response.data.success) {
                console.log("Payment successful!");
                } else {
                console.error("Payment failed. Please check your card details.");
                }
        } catch (error){
            console.error(error);
            
        }
    }

    return ( 
        
        <div className="InputForm">
            <form onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="tel"
                    name="number"
                    placeholder="000 222 333 444"
                    value={number}
                    onChange={e=>setNumber(e.target.value)}
                />
                <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <input 
                    type="text"
                    name="expiry"
                    placeholder="MM/YY Expiry"
                    value={expiry}
                    onChange={e=>setExpiry(e.target.value)}
                />
                <input 
                    type="tel"
                    name="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={e=>setCvv(e.target.value)}
                />
            </form>
            <button className="pay-btn" onClick={handlePayment}>PAY</button>
        </div>
     );
}
 
export default InputForm;