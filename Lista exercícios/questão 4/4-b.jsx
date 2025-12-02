import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function CartaoLivro({titulo,autor,ano,genero}){
  return(
    <div className='cartao-livro'>
      <h2>
      {titulo}
    </h2>
    <p><strong>autor:</strong>{autor}</p>
    <p><strong>ano:</strong>{ano}</p>
    <p><strong>genero:</strong>{genero}</p>
    </div>
  );
}


function App(){
  return(
    <div>
      <CartaoLivro titulo="anos de chumbo" autor= "chico buarque" ano={2021} genero="ficção"/>
    </div>
  );
}


export default App
