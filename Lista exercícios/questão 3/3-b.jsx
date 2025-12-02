import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function ListaComidas() {
  const comidas = ["chocolate", "coxinha", "risoto", "macarrão"];


  return (
    <div>
      <h2> minhas comidas favoritas</h2>
      <ul>
        {comidas.map((comida, index) => (
          <li key={index}>{comida}</li>
        ))}
      </ul>{" "}
    </div>
  );
}


export default ListaComidas;

