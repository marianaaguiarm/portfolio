import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function InputTempoReal(){
  const [texto, setTexto] = useState ('');


  return(
    <div>
      <h2 >título</h2>
      <input
      type='text'
      value={texto}
      onChange= {(e)=> setTexto(e.target.value)}
      placeholder='digite algo...'/>
      <p>você digitou: {texto.toUpperCase()}</p>
    </div>
  )
}


export default InputTempoReal
