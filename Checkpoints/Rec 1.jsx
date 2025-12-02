import React, { useState } from "react";

function RecuperacaoReact() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const [cidade, setCidade] = useState("");
  const [isEstudante, setIsEstudante] = useState("");
  const [tema, setTema] = useState("claro");

  const alternarTema = () => {
    setTema((temaAnterior) => (temaAnterior === "claro" ? "escuro" : "claro"));
  };

  const estilosTema = {
    claro: {
      backgroundColor: "#f2d5f1ff",
      color: "#333333",
      minHeight: "100vh",
      padding: "20px",
      minWidth: "1024px",
      width: "100%"
    },
    escuro: {
      backgroundColor: "#450b31ff",
      color: "#FFFFFF",
      minHeight: "100vh",
      padding: "20px",
      minWidth: "1024px",
      width: "100%"
    },
  };

  const estiloAtual = estilosTema[tema];

  const [contador, setContador] = useState(0);

  const aumentar = () => {
    setContador((contagemAnterior) => Math.min(10, contagemAnterior + 1));
  };
  const diminuir = () => {
    setContador((contagemAnterior) => Math.max(0, contagemAnterior - 1));
  };
  const resetarContador = () => {
    setContador(0);
  };

  const [itensCompra, setItensCompra] = useState([
    { id: 1, texto: "Ovo", comprado: false },
    { id: 2, texto: "Leite", comprado: true },
  ]);
  const [inputItem, setInputItem] = useState("");

  const adicionarItemCompra = () => {
    if (inputItem.trim() !== "") {
      setItensCompra([
        ...itensCompra,
        { id: Date.now(), texto: inputItem, comprado: false },
      ]);
      setInputItem("");
    }
  };

  const marcarComprado = (id) => {
    setItensCompra(
      itensCompra.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  };

  const removerItem = (id) => {
    setItensCompra(itensCompra.filter((item) => item.id !== id));
  };

  const totaisLista = {
    total: itensCompra.length,
    comprados: itensCompra.filter((item) => item.comprado).length,
  };

  const [formValores, setFormValores] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [formErros, setFormErros] = useState({});
  const [dadosEnviados, setDadosEnviados] = useState(null);

  const validarForm = (valores) => {
    const erros = {};
    if (valores.nome.length < 3) {
      erros.nome = "Nome deve ter no mínimo 3 caracteres";
    }
    if (!valores.email.includes("@")) {
      erros.email = "Email inválido, deve conter @";
    }
    if (valores.senha.length < 6) {
      erros.senha = "Senha deve ter no mínimo 6 caracteres";
    }
    return erros;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const novosValores = { ...formValores, [name]: value };

    setFormValores(novosValores);
    setFormErros(validarForm(novosValores));
  };

  const errosAtuais = validarForm(formValores);
  const camposPreenchidos =
    formValores.nome !== "" &&
    formValores.email !== "" &&
    formValores.senha !== "";
  const isFormValido =
    Object.keys(errosAtuais).length === 0 && camposPreenchidos;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isFormValido) {
      setDadosEnviados(formValores);
      setFormValores({ nome: "", email: "", senha: "" });
      setFormErros({});
    }
  };

  return (
    <div style={estiloAtual}>
      <h1>Recuperação</h1>

      <button onClick={alternarTema}>
        Modo {tema === "claro" ? "Escuro" : "Claro"}
      </button>

      <hr style={{ margin: "20px 0" }} />

      <div>
        <h2>Nome:</h2>
        <label>Nome: </label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
        <br />
        <h2>Idade:</h2>
        <label>Idade: </label>
        <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
        <br />
        <h2>Cidade:</h2>
        <label>Cidade: </label>
        <input value={cidade} onChange={(e) => setCidade(e.target.value)} />
        <br />
        <h2>Profissão:</h2>
        <label>Você é estudante? </label>
        <input
          value={isEstudante}
          onChange={(e) => setIsEstudante(e.target.value)}
        />

        <h2>{nome}</h2>
        <p>Você tem {idade} anos e sua cidade é: {cidade}</p>
        <p>{isEstudante.toUpperCase() == "SIM" ? '🎓 Estudante' : "💼 Profissional"}</p>
        <br />
      </div>
      <hr style={{ margin: "20px 0" }} />

      <div>
        <h2>Contador</h2>
        <h3 style={{ fontSize: "25px", margin: "10px" }}>{contador}</h3>
        <button onClick={aumentar} disabled={contador === 10}>
          +
        </button>
        <button onClick={diminuir} disabled={contador === 0}>
          -
        </button>
        <button onClick={resetarContador}>Reset</button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <div>
        <h2>Lista de Compras</h2>
        <h3> Clique em cima de um item para marcar como comprado!</h3>
        <div>
          <input
            placeholder="Novo item"
            value={inputItem}
            onChange={(e) => setInputItem(e.target.value)}
          />
          <button onClick={adicionarItemCompra}>Adicionar Item</button>
        </div>
        <p>
          <strong>Total de Itens:</strong> {totaisLista.total} |{" "}
          <strong>Comprados:</strong> {totaisLista.comprados}
        </p>
        <ul>
          {itensCompra.map((item) => (
            <li
              key={item.id}
              style={{
                margin: "5px 0",
                textDecoration: item.comprado ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              <span onClick={() => marcarComprado(item.id)}>{item.texto}</span>
              <button
                onClick={() => removerItem(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <div>
        <h2> Formulário</h2>
        <form
          onSubmit={handleFormSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div>
            <label>Nome: </label>
            <input
              name="nome"
              value={formValores.nome}
              onChange={handleFormChange}
            />
            {formErros.nome && (
              <p style={{ color: "red", margin: "0" }}>{formErros.nome}</p>
            )}
          </div>
          <div>
            <label>Email: </label>
            <input
              name="email"
              value={formValores.email}
              onChange={handleFormChange}
            />
            {formErros.email && (
              <p style={{ color: "red", margin: "0" }}>{formErros.email}</p>
            )}
          </div>
          <div>
            <label>Senha: </label>
            <input
              type="password"
              name="senha"
              value={formValores.senha}
              onChange={handleFormChange}
            />
            {formErros.senha && (
              <p style={{ color: "red", margin: "0" }}>{formErros.senha}</p>
            )}
          </div>
          <button type="submit" disabled={!isFormValido}>
            Cadastrar
          </button>
        </form>

        {dadosEnviados && (
          <div
            style={{
              border: "2px solid green",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            <h3>Dados Cadastrados com Sucesso:</h3>
            <p>
              <strong>Nome:</strong> {dadosEnviados.nome}
            </p>
            <p>
              <strong>Email:</strong> {dadosEnviados.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecuperacaoReact;
