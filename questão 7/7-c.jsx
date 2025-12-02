import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function InputTempoReal(){
  const [texto, setTexto] = useState ('');
  const tamanhoTexto = texto.length;
  const mens = tamanhoTexto < 3 ? {frase: "digite pelo menos 3 caracteres", cor:'#d02020ff'}: {frase: 'texto válido',cor:'#00ff48ff'}
  return(
    <div>
      <h2 >título</h2>
      <input
      type='text'
      value={texto}
      onChange= {(e)=> setTexto(e.target.value)}
      placeholder='digite algo...'/>
      <p style= {{color: mens.cor}}>você digitou: {mens.frase}</p>
     
    </div>
  )


}
function Verificacao(){
  return <InputTempoReal/>
}


export default Verificacao


