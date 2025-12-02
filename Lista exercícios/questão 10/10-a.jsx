import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function Calculadora() {

  const [num1, setNum1] = useState('')

  const [num2, setNum2] = useState('')

  const [resultado, setResultado] = useState('')





  const calcular = (operacao) => {

    const n1 = parseFloat(num1);

    const n2 = parseFloat(num2);



    if (isNaN(n1) || isNaN(n2)) {

      setResultado('Por favor, insira números válidos')

      return;

    }



    let res;

    switch (operacao) {

      case 'soma':

        res = n1 + n2

        break;

      case 'subtracao':

        res = n1 - n2

        break;

      case 'divisao':

        res = n2 !== 0 ? n1 / n2 : 'erro divisão por zero';

        break;

      case 'multiplicacao':

        res = n1 * n2

        break;

      default:

        res = '';

    }

    setResultado(res);

  };



  return (

    <div>

      <h2>Calculadora</h2>

      <input

        type="number"

        value={num1}

        onChange={(e) => setNum1(e.target.value)}

        placeholder="Primeiro número"

      />

      <input

        type="number"

        value={num2}

        onChange={(e) => setNum2(e.target.value)}

        placeholder="Segundo número"

      />

      <div>{resultado}</div>

      <div>

        <button onClick={() => calcular("soma")}>Somar</button>

        <button onClick={() => calcular("subtracao")}>Subtrair</button>

        <button onClick={() => calcular("multiplicacao")}>Multiplicar</button>

        <button onClick={() => calcular("divisao")}>Dividir</button>

      </div>

    </div>

  )



}



export default Calculadora;