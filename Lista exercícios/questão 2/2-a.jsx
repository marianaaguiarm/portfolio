import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Saudacao ({nome}){
  return <h1> olá, {nome}!</h1>
}


function MyApp() {
  return (<Saudacao nome= "mariana"/>)
}
export default MyApp