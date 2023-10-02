import './App.css';
import Card from './components/Card';
import InputForm from './components/InputForm';
import { useState } from 'react';
function App() {

  const[number,setNumber]=useState('')
  const[name,setName]=useState('')
  const[expiry,setExpiry]=useState('')
  const[cvv,setCvv]=useState('')
  const[cvvFocused,setCvvFocused]=useState(false)
  
  return (
    <div className="App">
      <Card
        number={number}
        name={name}
        expiry={expiry}
        cvv={cvv}
        cvvFocused={cvvFocused} setCvvFocused={setCvvFocused}
      />
      <InputForm 
        number={number} setNumber={setNumber}
        name={name} setName={setName}
        expiry={expiry} setExpiry={setExpiry}
        cvv={cvv} setCvv={setCvv}
        setCvvFocused={setCvvFocused}
/>
    </div>
  );
}

export default App;

