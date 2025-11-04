import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MenuRestaurante() {
  const pratos = [
    {
      nome: "Lasanha Bolonhesa",
      preco: 32.9,
      descricao: "Massa fresca com molho à bolonhesa",
    },
    {
      nome: "Salmão Grelhado",
      preco: 45.5,
      descricao: "Filé de salmão com legumes",
    },
    {
      nome: "Pizza Margherita",
      preco: 28.0,
      descricao:
        "Massa artesanal, molho de tomate, mussarela, tomate e manjericão",
    },
    {
      nome: "Risotto limão siciliano",
      preco: 38.7,
      descricao: "Arroz arbóreo cremoso, queijo e limão siciliano",
    },
  ];
  return (
    <div>
      <h1> Cardápio do restaurante</h1>
      <div className="menu-grid">
        {pratos.map((prato, index) => (
          <div key={index} className="prato-card">
            <h3> {prato.nome} </h3>
            <p className="preco">R$ {prato.preco.toFixed(2)}</p>
            <p className="descricao">{prato.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MenuRestaurante;
