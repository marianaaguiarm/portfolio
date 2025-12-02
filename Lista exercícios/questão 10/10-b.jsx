import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {

  const [comprimento, setComprimento] = useState("");

  const [largura, setLargura] = useState("");



  const handleComprimentoChange = (event) => {

    setComprimento(event.target.value);

  };



  const handleLarguraChange = (event) => {

    setLargura(event.target.value);

  };

  const numComprimento = Number(comprimento) || 0;

  const numLargura = Number(largura) || 0;

  const area = numComprimento * numLargura;



  return (

    <div>

      <div>

        <h2>Calculadora de Área de Retângulo</h2>

        <div>

          <label>Comprimento: </label>

          <input

            type="number"

            value={comprimento}

            onChange={handleComprimentoChange}

            placeholder="Digite o comprimento"

          />

        </div>

        <div>

          <label>Largura: </label>

          <input

            type="number"

            value={largura}

            onChange={handleLarguraChange}

            placeholder="Digite a largura"

          />

        </div>

        <h3>Área: {area}</h3>

      </div>

    </div>

  );

}



export default App;

