import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function BoasVindas({usuario}){
  return <h1> bem vindo de volta, {usuario}! </h1>;
}
function MyApp() {
  return <BoasVindas usuario="marizinhagameplayz" />;
}




export default MyApp;