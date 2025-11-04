import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function DataHoraAtual (){
  const agora = new Date();
  const diasSemana= ['domingo', 'segunda', 'terça', 'quarta', 'quinta','sexta', 'sabado'];
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto','setembro', 'outubro', 'novembro', 'dezembro'];
  const diaSemana= diasSemana[agora.getDay()];
  const dia = agora.getDate();
  const mes = meses [agora.getMonth()];
  const ano = agora.getFullYear();
  return (
    <h1> hoje é {diaSemana}, {dia} de {mes} de {ano}</h1>
  )
}


export default DataHoraAtual ;
