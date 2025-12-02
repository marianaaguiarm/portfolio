import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function PlacarJogos() {


  const [ponto, setPonto] = useState('');
  const [nomeTime, setNomeTime] = useState('');
  const [times, setTimes] = useState([]);


  const addTime = () => {


    if (nomeTime.trim() && ponto !== '') {
      const novoTime = {
        nome: nomeTime.trim(),
        pontos: parseInt(ponto)
      };
      const novosTimesOrdenados = [...times, novoTime];
      novosTimesOrdenados.sort((a, b) => b.pontos - a.pontos);
      setTimes(novosTimesOrdenados);
      setNomeTime('');
      setPonto('');
    }
  };
  return (
    <div>
      <h2>Placar de Jogos</h2>
      <input
        type="text"
        value={nomeTime}
        onChange={(e) => setNomeTime(e.target.value)}
        placeholder='Digite o nome de um time...'
      />
      <input
        type="number"
        value={ponto}
        onChange={(e) => setPonto(e.target.value)}
        placeholder='Digite uma pontuação...'
      />
      <button onClick={addTime}>Adicionar Time</button>
      <hr />
      <h3>Classificação</h3>
      <ol>
        {times.map((time, index) => (


          <li key={index}>


            {time.nome} - <strong>{time.pontos}</strong> pontos
          </li>
        ))}
      </ol>
    </div>
  );
}
export default PlacarJogos;

