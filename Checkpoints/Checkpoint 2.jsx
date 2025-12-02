import React, { useState, useMemo } from "react";


function Checkpoint() {
  const [nomePersonagem, setNomePersonagem] = useState(
    "insira o nome do seu herói"
  );
  const [classePersonagem, setClassePersonagem] = useState("Guerreiro");
  const [racaPersonagem, setRacaPersonagem] = useState("Humano");


  const [efeitosVisiveis, setEfeitosVisiveis] = useState(false);
  const [efeitosAtivos, setEfeitosAtivos] = useState(["Super Velocidade"]);


  const vidaMaxima = 100;
  const [vida, setVida] = useState(vidaMaxima);


  const curarVida = () => {
    if (itensInventario.includes("Poção de cura") && vida < 100) {
      setVida((vidaAnterior) => Math.min(vidaMaxima, vidaAnterior + 10));
    } else {
      alert("Você não possui Poção de cura!");
    }
  };


  const receberDano = () => {
    setVida((vidaAnterior) => Math.max(0, vidaAnterior - 15));
  };


  const corDoEstiloVida = useMemo(() => {
    if (vida > 70) return "green";
    if (vida >= 30) return "gold";
    return "red";
  }, [vida]);


  const progressoVida = (vida / vidaMaxima) * 100;


  const [xp, setXp] = useState(0);
  const [nivel, setNivel] = useState(1);
  const xpFaltante = 300;


  const adicionarXp = (quantidade) => {
    setXp((xpAnterior) => {
      let novoXp = xpAnterior + quantidade;


      if (novoXp >= xpFaltante) {
        novoXp -= xpFaltante;
        setNivel((nivelAnterior) => nivelAnterior + 1);
      }
      return novoXp;
    });
  };


  const progressoXp = (xp / xpFaltante) * 100;
  const [ouro, setOuro] = useState(50);
  const [lojaVisivel, setLojaVisivel] = useState(false);
  const itensLoja = [
    { nome: "Bússola", preco: 10 },
    { nome: "Poção de cura", preco: 15 },
    { nome: "Faca", preco: 20 },
    { nome: "Mapa", preco: 30 },
  ];
  const ganharOuro = (quantia) => setOuro((anterior) => anterior + quantia);
  const [inventarioAberto, setInventarioAberto] = useState(false);
  const [itensInventario, setItensInventario] = useState(["Espada"]);
  const comprarItem = (item) => {
    if (ouro >= item.preco) {
      setOuro((anterior) => anterior - item.preco);
      setItensInventario((itensAnteriores) => [...itensAnteriores, item.nome]);
    }
  };
  const [inputMissao, setInputMissao] = useState("");
  const [categoriaMissao, setCategoriaMissao] = useState("Secundária");
  const [listaMissoes, setListaMissoes] = useState([
    {
      id: 1,
      texto: "Matar o Dragão",
      categoria: "Principal",
      concluida: false,
    },
  ]);
  const [missoesCompletas, setMissoesCompletas] = useState(0);


  const adicionarMissao = () => {
    if (inputMissao.trim() !== "") {
      setListaMissoes([
        ...listaMissoes,
        {
          id: Date.now(),
          texto: inputMissao,
          categoria: categoriaMissao,
          concluida: false,
        },
      ]);
      setInputMissao("");
    }
  };


  const marcarConcluida = (id) => {
    setListaMissoes(
      listaMissoes.map((m) => (m.id === id ? { ...m, concluida: true } : m))
    );
    setMissoesCompletas((anterior) => anterior + 1);
    adicionarXp(100);
    ganharOuro(25);
  };


  const [palavraBase, setPalavraBase] = useState("");
  const [encantamentoGerado, setEncantamentoGerado] = useState("...");


  const gerarEncantamento = (base) => {
    const invertida = base.split("").reverse().join("");
    const transformacao = `MAGIA ${invertida.toUpperCase()}`;
    setEncantamentoGerado(base.length > 0 ? transformacao : "...");
  };


  const [party, setParty] = useState([
    { id: 1, nome: "Mago", nivel: 99, xp: 500 },
  ]);


  const [nomeNovoCompanheiro, setNomeNovoCompanheiro] = useState("");
  const adicionarCompanheiro = () => {
    if (nomeNovoCompanheiro.trim() !== "") {
      setParty((partyAnterior) => [
        ...partyAnterior,
        { id: Date.now(), nome: nomeNovoCompanheiro, nivel: 1, xp: 0 },
      ]);
      setNomeNovoCompanheiro("");
    }
  };


  const rankingOrdenado = useMemo(() => {
    return [...party].sort((a, b) => b.nivel - a.nivel || b.xp - a.xp);
  }, [party]);


  const [pontosAtributo, setPontosAtributo] = useState(10);
  const [atributos, setAtributos] = useState({
    Força: 5,
    Resistência: 5,
    Inteligência: 5,
    Sorte: 5,
  });


  const ajustarAtributo = (atributo, variacao) => {
    setAtributos((anterior) => {
      const novoValor = anterior[atributo] + variacao;
      if (variacao > 0 && pontosAtributo > 0) {
        setPontosAtributo((p) => p - 1);
        return { ...anterior, [atributo]: novoValor };
      } else if (variacao < 0 && novoValor >= 5 && anterior[atributo] > 5) {
        setPontosAtributo((p) => p + 1);
        return { ...anterior, [atributo]: novoValor };
      }
      return anterior;
    });
  };


  return (
    <div
      style={{
        backgroundColor: "#EFD5DA",
        color: "black",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Checkpoint RPG: {nomePersonagem}</h1>
      <hr
        style={{ width: "80%", margin: "20px auto", border: "1px solid #555" }}
      />
      <div>
        <h2>Personagem 👤</h2>
        <label>Nome: </label>
        <input
          value={nomePersonagem}
          onChange={(e) => setNomePersonagem(e.target.value)}
        />
        <br />
        <label>Classe: </label>
        <select
          value={classePersonagem}
          onChange={(e) => setClassePersonagem(e.target.value)}
        >
          <option>Guerreiro</option>
          <option>Mago</option>
          <option>Arqueiro</option>
        </select>
        <br />
        <label>Raça: </label>
        <select
          value={racaPersonagem}
          onChange={(e) => setRacaPersonagem(e.target.value)}
        >
          <option>Humano</option>
          <option>Elfo</option>
          <option>Centauro</option>
          <option>Ogro</option>
        </select>


        <p>
          Efeitos:
          <button onClick={() => setEfeitosVisiveis(!efeitosVisiveis)}>
            {efeitosVisiveis ? "Esconder" : "Mostrar"}
          </button>
        </p>
        {efeitosVisiveis && (
          <ul>
            {efeitosAtivos.map((efeito, index) => (
              <li key={index}>{efeito}</li>
            ))}
            {efeitosAtivos.length === 0 && <li>Nenhum efeito ativo.</li>}
          </ul>
        )}
      </div>
      <hr
        style={{ width: "80%", margin: "20px auto", border: "1px solid #555" }}
      />
      <div>
        <h2>Atributos 🧠 (Pontos: {pontosAtributo})</h2>
        {Object.keys(atributos).map((attr) => (
          <div key={attr}>
            <strong>
              {attr}: {atributos[attr]}
            </strong>
            <button
              onClick={() => ajustarAtributo(attr, 1)}
              disabled={pontosAtributo === 0}
            >
              +
            </button>
            <button
              onClick={() => ajustarAtributo(attr, -1)}
              disabled={atributos[attr] <= 5}
            >
              -
            </button>
          </div>
        ))}
      </div>
      <hr
        style={{ width: "80%", margin: "20px auto", border: "1px solid #555" }}
      />
      <div>
        <h2>
          Combate 🥊
          <p>
            (HP: {vida}/{vidaMaxima})
          </p>
        </h2>
        {vida < 30 && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            💀💀 VIDA CRÍTICA 💀💀
          </p>
        )}
        <div
          style={{
            height: "20px",
            width: "200px",
            backgroundColor: "#ddd",
            border: "1px solid black",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: `${progressoVida}%`,
              height: "100%",
              backgroundColor: corDoEstiloVida,
              transition: "width 0.5s",
            }}
          ></div>
        </div>


        <button onClick={receberDano}>Receber dano 🩸 (-15 HP)</button>
        <button onClick={curarVida}>Curar 🧪 (+10 HP)</button>
      </div>
      <hr
        style={{ width: "80%", margin: "20px auto", border: "1px solid #555" }}
      />
      <div>
        <h2>Nível 🆙</h2>
        <p>
          Nível: {nivel} | XP: {xp}/{xpFaltante} ({progressoXp.toFixed(0)}%)
        </p>


        <div
          style={{
            height: "10px",
            width: "200px",
            backgroundColor: "#ddd",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: `${progressoXp}%`,
              height: "100%",
              backgroundColor: "purple",
              transition: "width 0.5s",
            }}
          ></div>
        </div>


        <button onClick={() => adicionarXp(50)}>
          Derrotar Inimigo 🔪 (+50 XP)
        </button>
      </div>
      <hr
        style={{ width: "80%", margin: "20px auto", border: "1px solid #555" }}
      />
      <div>
        <h2>Economia 💰 (Ouro: {ouro})</h2>
        <button onClick={() => setLojaVisivel(!lojaVisivel)}>
          {lojaVisivel ? "Fechar loja" : "Abrir loja"}
        </button>
        {lojaVisivel && (
          <div>
            <h3>Loja</h3>
            {itensLoja.map((item) => (
              <div key={item.nome}>
                {item.nome} ({item.preco} Ouro)
                <button
                  onClick={() => comprarItem(item)}
                  disabled={ouro < item.preco}
                >
                  Comprar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <hr
        style={{ width: "80%", margin: "20px auto", border: "1px solid #555" }}
      />
      <div>
        <h2>Inventário 🎒</h2>
        <button onClick={() => setInventarioAberto(!inventarioAberto)}>
          {inventarioAberto ? "Fechar inventário" : "Abrir inventário"}
        </button>
        {inventarioAberto && (
          <ul>
            {itensInventario.map((item, index) => (
              <li key={index}>Item: {item}</li>
            ))}
          </ul>
        )}
      </div>
      <hr
        style={{ width: "80%", margin: "20px auto", border: "1px solid #555" }}
      />
      <div>
        <h2>Diário de Missões 📖(Completas: {missoesCompletas})</h2>
        <div>
          <input
            placeholder="Nova Missão"
            value={inputMissao}
            onChange={(e) => setInputMissao(e.target.value)}
          />
          <select
            value={categoriaMissao}
            onChange={(e) => setCategoriaMissao(e.target.value)}
          >
            <option>Principal</option>
            <option>Secundária</option>
            <option>Urgente</option>
          </select>
          <button onClick={adicionarMissao}>Adicionar Missão</button>
        </div>


        <h3>Missões Ativas:</h3>
        <ul>
          {listaMissoes
            .filter((m) => !m.concluida)
            .map((missao) => (
              <li key={missao.id}>
                [{missao.categoria}] {missao.texto}
                <button onClick={() => marcarConcluida(missao.id)}>
                  Concluir
                </button>
              </li>
            ))}
        </ul>
      </div>
      <hr
        style={{ width: "80%", margin: "20px auto", border: "1px solid #555" }}
      />
      <div>
        <h2>Gerador de Encantamentos 🪄</h2>
        <label>Palavra Base: </label>
        <input
          value={palavraBase}
          onChange={(e) => {
            const novaPalavra = e.target.value;
            setPalavraBase(novaPalavra);
            gerarEncantamento(novaPalavra);
          }}
        />
        <p>Encantamento: {encantamentoGerado}</p>
      </div>
      <hr
        style={{ width: "80%", margin: "20px auto", border: "1px solid #555" }}
      />
      <div>
        <h2>Ranking dos Heróis 🏆</h2>
        <div>
          <input
            placeholder="Nome Companheiro"
            value={nomeNovoCompanheiro}
            onChange={(e) => setNomeNovoCompanheiro(e.target.value)}
          />
          <button onClick={adicionarCompanheiro}>Adicionar</button>
        </div>


        <h3>Party (Ranking):</h3>
        <ol>
          {rankingOrdenado.map((heroi) => (
            <li key={heroi.id}>
              {heroi.nome} (Nível:
              <input
                type="number"
                min="1"
                value={heroi.nivel}
                onChange={(e) =>
                  setParty((party) =>
                    party.map((c) =>
                      c.id === heroi.id
                        ? { ...c, nivel: parseInt(e.target.value) || c.nivel }
                        : c
                    )
                  )
                }
                style={{ width: "40px" }}
              />
              , XP: {heroi.xp})
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}


export default Checkpoint;


