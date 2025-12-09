import React, { useState, useEffect, useRef } from "react";

const MUSICAS_MOCK = [
  {
    id: 1,
    titulo: "Washing Machine Heart",
    artista: "Mitski",
    capa: "http://cdn.pastemagazine.com/www/articles/Mitski_BetheCowboy_Art.jpg",
  },
  {
    id: 2,
    titulo: "Jigsaw falling into place",
    artista: "Radiohead",
    capa: "https://i.scdn.co/image/ab67616d0000b273de3c04b5fc750b68899b20a9",
  },
  {
    id: 3,
    titulo: "Aerials",
    artista: "System of a down",
    capa: "https://i.scdn.co/image/ab67616d00001e0207bc7d2a745636c356b4d0aa",
  },
];

const formatarTempo = (tempo) => {
  if (!tempo) return "0:00";
  const min = Math.floor(tempo / 60);
  const seg = Math.floor(tempo % 60);
  return `${min}:${seg < 10 ? "0" : ""}${seg}`;
};

function BarraLateral({
  playlists,
  criarPlaylist,
  playlistAtiva,
  setPlaylistAtiva,
  favoritasContagem,
}) {
  return (
    <div
      style={{
        width: "220px",
        backgroundColor: "#000",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        <span style={{ fontSize: "24px" }}>🎵</span> Spot
        <span style={{ fontSize: "24px", color: "#31DB2C" }}>IF</span>y
      </div>
      <div style={{ borderTop: "1px solid #181818", paddingTop: "10px" }}>
        <button
          onClick={criarPlaylist}
          style={{
            backgroundColor: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          <span>➕</span> Criar Playlist
        </button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            onClick={() => setPlaylistAtiva("todas")}
            style={{
              padding: "10px 0",
              cursor: "pointer",
              color: playlistAtiva === "todas" ? "#fff" : "#b3b3b3",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: playlistAtiva === "todas" ? "bold" : "normal",
            }}
          >
            <span>📜</span> Todas
          </li>
          <li
            onClick={() => setPlaylistAtiva("favoritas")}
            style={{
              padding: "10px 0",
              cursor: "pointer",
              color: playlistAtiva === "favoritas" ? "#fff" : "#b3b3b3",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: playlistAtiva === "favoritas" ? "bold" : "normal",
            }}
          >
            <span>❤️ ({favoritasContagem})</span> Favoritas
          </li>
          {playlists.map((pl) => (
            <li
              key={pl.id}
              onClick={() => setPlaylistAtiva(pl.id)}
              style={{
                padding: "10px 0",
                cursor: "pointer",
                color: playlistAtiva === pl.id ? "#fff" : "#b3b3b3",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: playlistAtiva === pl.id ? "bold" : "normal",
              }}
            >
              <span>🗂️</span> {pl.nome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Cabecalho({ busca, setBusca }) {
  return (
    <div style={{ padding: "20px", backgroundColor: "transparent" }}>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "8px 15px",
          display: "flex",
          alignItems: "center",
          width: "300px",
        }}
      >
        <span style={{ color: "#b3b3b3", marginRight: "10px" }}>🔍</span>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar músicas ou artistas..."
          style={{ border: "none", outline: "none", width: "100%" }}
        />
      </div>
    </div>
  );
}

function ListaDeMusicas({
  musicas,
  alternarReproducao,
  musicaAtual,
  estaTocando,
  favoritas,
  alternarFavorito,
  playlists,
  adicionarMusicaAPlaylistGlobal,
}) {
  const [musicaMenuAberto, setMusicaMenuAberto] = useState(null);
  const [playlistSelecionada, setPlaylistSelecionada] = useState("");

  function lidarComAdicao(musicaId) {
    if (!playlistSelecionada) {
      alert("Por favor, selecione uma playlist.");
      return;
    }

    adicionarMusicaAPlaylistGlobal(musicaId, playlistSelecionada);
    setMusicaMenuAberto(null);
    setPlaylistSelecionada("");
  }

  useEffect(() => {
    if (playlists.length === 0) {
      setMusicaMenuAberto(null);
    }
  }, [playlists.length]);

  return (
    <div style={{ padding: "20px" }}>
      {musicas.map((musica, i) => (
        <div
          key={musica.id}
          onClick={() => alternarReproducao(musica)}
          style={{
            display: "grid",
            gridTemplateColumns:
              musicaMenuAberto === musica.id
                ? "30px 40px 1fr 200px"
                : "30px 40px 1fr auto auto",
            alignItems: "center",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor:
              musicaAtual?.id === musica.id
                ? "rgba(29, 185, 84, 0.1)"
                : "transparent",
            transition: "background 0.2s",
          }}
        >
          <span
            style={{
              gridColumn: "1/2",
              width: "30px",
              textAlign: "center",
              color: "#b3b3b3",
              fontSize: "14px",
            }}
          >
            {musicaAtual?.id === musica.id && estaTocando ? "▶" : i + 1}
          </span>
          <img
            src={musica.capa}
            alt=""
            style={{
              gridColumn: "2/3",
              width: "40px",
              height: "40px",
              marginRight: "15px",
            }}
          />

          <div style={{ gridColumn: "3/4", flex: 1 }}>
            <div
              style={{
                fontWeight: "500",
                color: musicaAtual?.id === musica.id ? "#1db954" : "#fff",
              }}
            >
              {musica.titulo}
            </div>
            <div style={{ fontSize: "13px", color: "#b3b3b3" }}>
              {musica.artista}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              gridColumn: musicaMenuAberto === musica.id ? "4/5" : "4/6",
              alignItems: "center",
            }}
          >
            {musicaMenuAberto === musica.id && playlists.length > 0 ? (
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <select
                  value={playlistSelecionada}
                  onChange={(e) => setPlaylistSelecionada(e.target.value)}
                  style={{
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #1db954",
                    backgroundColor: "#333",
                    color: "#fff",
                  }}
                >
                  <option value="" disabled>
                    Escolher Playlist
                  </option>
                  {playlists.map((pl) => (
                    <option key={pl.id} value={pl.id}>
                      {pl.nome}
                    </option>
                  ))}
                </select>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    lidarComAdicao(musica.id);
                  }}
                  style={{
                    background: "#1db954",
                    border: "none",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  OK
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (playlists.length === 0) {
                    alert("Crie uma playlist primeiro!");
                    return;
                  }
                  setMusicaMenuAberto(musica.id);
                  setPlaylistSelecionada("");
                }}
                title="Adicionar à Playlist"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#fff",
                }}
              >
                ➕
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                alternarFavorito(musica.id);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              <span
                style={{
                  color: favoritas.includes(musica.id) ? "#1db954" : "#fff",
                }}
              >
                {favoritas.includes(musica.id) ? "❤️" : "🤍"}
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Tocador({
  musicaAtual,
  estaTocando,
  alternarReproducao,
  tempoAtual,
  duracao,
  buscarTempo,
  volume,
  setVolume,
  proximaMusica,
  musicaAnterior,
}) {
  return (
    <div
      style={{
        height: "90px",
        backgroundColor: "#181818",
        borderTop: "1px solid #282828",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <img
          src={musicaAtual.capa}
          alt=""
          style={{ width: "56px", height: "56px" }}
        />
        <div>
          <h4>{musicaAtual.titulo}</h4>
          <p style={{ color: "#b3b3b3", fontSize: "12px", margin: 0 }}>
            {musicaAtual.artista}
          </p>
        </div>
      </div>

      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={musicaAnterior}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ⏮️
          </button>
          <button
            onClick={alternarReproducao}
            style={{
              background: "#fff",
              color: "#000",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              paddingLeft: "2px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {estaTocando ? "⏸️" : "▶️"}
          </button>
          <button
            onClick={proximaMusica}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ⏭️
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "10px",
            fontSize: "12px",
            color: "#b3b3b3",
          }}
        >
          <span>{formatarTempo(tempoAtual)}</span>
          <input
            type="range"
            min="0"
            max={duracao || 0}
            value={tempoAtual}
            onChange={buscarTempo}
            style={{
              width: "100%",
              height: "4px",
              accentColor: "#1db954",
              cursor: "pointer",
            }}
          />
          <span>{formatarTempo(duracao)}</span>
        </div>
      </div>

      <div
        style={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          justifyContent: "flex-end",
        }}
      >
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{
            width: "100px",
            height: "4px",
            accentColor: "#1db954",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}

export default function CloneSpotify() {
  const [musicas] = useState(MUSICAS_MOCK);
  const [musicaAtual, setMusicaAtual] = useState(musicas[0]);
  const [estaTocando, setEstaTocando] = useState(false);
  const [favoritas, setFavoritas] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistAtiva, setPlaylistAtiva] = useState("todas");
  const [busca, setBusca] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const audioRef = useRef(new Audio(musicas[0].url));

  function alternarReproducao(musica) {
    if (musicaAtual.id === musica.id) setEstaTocando(!estaTocando);
    else {
      setMusicaAtual(musica);
      setEstaTocando(true);
    }
  }

  function proximaMusica() {
    const i = musicas.findIndex((m) => m.id === musicaAtual.id);
    setMusicaAtual(musicas[(i + 1) % musicas.length]);
    setEstaTocando(true);
  }

  function musicaAnterior() {
    const i = musicas.findIndex((m) => m.id === musicaAtual.id);
    setMusicaAtual(musicas[i === 0 ? musicas.length - 1 : i - 1]);
    setEstaTocando(true);
  }

  function buscarTempo(e) {
    const t = Number(e.target.value);
    audioRef.current.currentTime = t;
    setTempoAtual(t);
  }

  function criarPlaylist() {
    const nome = prompt("Nome da nova Playlist:");
    if (nome)
      setPlaylists((p) => [...p, { id: Date.now(), nome: nome, songIds: [] }]);
  }

  function alternarFavorito(id) {
    setFavoritas((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );
  }

  function adicionarMusicaAPlaylist(musicaId, playlistIdString) {
    const playlistId = Number(playlistIdString);

    const musica = musicas.find((m) => m.id === musicaId);

    const playlistAlvo = playlists.find((pl) => pl.id === playlistId);

    if (!playlistAlvo) return;

    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, songIds: [...new Set([...pl.songIds, musicaId])] }
          : pl
      )
    );

    setPlaylistAtiva(playlistId);

    alert(`"${musica.titulo}" adicionada à playlist: ${playlistAlvo.nome}!`);
  }

  useEffect(() => {
    audioRef.current.src = musicaAtual.url;
    audioRef.current.load();
    if (estaTocando) audioRef.current.play().catch(() => {});
  }, [musicaAtual]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const atualizarTempo = () => setTempoAtual(audioRef.current.currentTime);
    const definirDuracao = () => setDuracao(audioRef.current.duration);

    const fimMusica = () => {
      proximaMusica();
    };

    audioRef.current.addEventListener("timeupdate", atualizarTempo);
    audioRef.current.addEventListener("loadedmetadata", definirDuracao);
    audioRef.current.addEventListener("ended", fimMusica);

    if (estaTocando) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();

    return () => {
      audioRef.current.removeEventListener("timeupdate", atualizarTempo);
      audioRef.current.removeEventListener("loadedmetadata", definirDuracao);
      audioRef.current.removeEventListener("ended", fimMusica);
    };
  }, [estaTocando, proximaMusica]);

  const musicasFiltradas = musicas.filter((musica) => {
    const buscaEncontrada =
      busca === "" ||
      musica.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      musica.artista.toLowerCase().includes(busca.toLowerCase());

    if (playlistAtiva === "todas") {
      return buscaEncontrada;
    }

    if (playlistAtiva === "favoritas") {
      return buscaEncontrada && favoritas.includes(musica.id);
    }

    const playlistAtual = playlists.find((pl) => pl.id === playlistAtiva);
    if (playlistAtual) {
      return buscaEncontrada && playlistAtual.songIds.includes(musica.id);
    }

    return buscaEncontrada;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <BarraLateral
          playlists={playlists}
          criarPlaylist={criarPlaylist}
          playlistAtiva={playlistAtiva}
          setPlaylistAtiva={setPlaylistAtiva}
          favoritasContagem={favoritas.length}
        />

        <div
          style={{
            flex: 1,
            background: "linear-gradient(#2a2a2a, #121212)",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            borderRadius: "8px 0 0 0",
          }}
        >
          <Cabecalho busca={busca} setBusca={setBusca} />
          <ListaDeMusicas
            musicas={musicasFiltradas}
            musicaAtual={musicaAtual}
            estaTocando={estaTocando}
            alternarReproducao={alternarReproducao}
            favoritas={favoritas}
            alternarFavorito={alternarFavorito}
            playlists={playlists}
            adicionarMusicaAPlaylistGlobal={adicionarMusicaAPlaylist}
          />
        </div>
      </div>

      <Tocador
        musicaAtual={musicaAtual}
        estaTocando={estaTocando}
        alternarReproducao={() => alternarReproducao(musicaAtual)}
        tempoAtual={tempoAtual}
        duracao={duracao}
        buscarTempo={buscarTempo}
        volume={volume}
        setVolume={setVolume}
        proximaMusica={proximaMusica}
        musicaAnterior={musicaAnterior}
      />
    </div>
  );
}
