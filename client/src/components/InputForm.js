import { useState } from "react"
const InputForm = () => {
    const[number,setNumber]=useState('')
    const[name,setName]=useState('')
    const[expiry,setExpiry]=useState('')
    const[cvc,setCvc]=useState('')
    
    return ( 
        
        <div className="InputForm">
            <form>
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
                    name="cvc"
                    placeholder="123"
                    value={cvc}
                    onChange={e=>setCvc(e.target.value)}
                />
            </form>
            <button className="pay-btn">PAY</button>
        </div>
     );
}
 
export default InputForm;