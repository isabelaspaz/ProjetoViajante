import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardViagem from "../CardViagem/CardViagem";
import MensagemFeedback from "../MensagemFeedback/MensagemFeedback";
import Formulario from "../Formulario/Formulario";
import "./Mochilas.css";
import Navbar from "../Navbar/Navbar";

const Mochilas = () => {
  const navigate = useNavigate();

  const [viagens, setViagens] = useState([]);
  const [mochilasPorViagem, setMochilasPorViagem] = useState({});
  const [itensPorMochila, setItensPorMochila] = useState({});
  const [novoItemPorMochila, setNovoItemPorMochila] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [modalNovaMochilaAberto, setModalNovaMochilaAberto] = useState(false);
  const [novaMochila, setNovaMochila] = useState({ titulo: "", viagemId: "" });
  const [mochilaEditando, setMochilaEditando] = useState(null);
  const [itemEditando, setItemEditando] = useState(null);


  useEffect(() => {
    buscarViagens();
  }, []);

  const buscarViagens = async () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;

    try {
      const resp = await fetch(`http://localhost:8080/viagem/usuario/${usuarioId}`);
      if (resp.ok) {
        const lista = await resp.json();
        setViagens(lista);
        lista.forEach((v) => buscarMochilas(v.id));
      } else {
        setMensagem("Erro ao buscar viagens.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const buscarMochilas = async (viagemId) => {
    try {
      const resp = await fetch(`http://localhost:8080/mochila/${viagemId}`);
      if (resp.ok) {
        const dados = await resp.json();
        setMochilasPorViagem((prev) => ({ ...prev, [viagemId]: dados }));
        dados.forEach((m) => buscarItens(m.id));
      }
    } catch {
      setMensagem("Erro ao buscar mochilas.");
    }
  };

  const buscarItens = async (mochilaId) => {
    try {
      const resp = await fetch(`http://localhost:8080/mochilaItem/${mochilaId}`);
      if (resp.ok) {
        const dados = await resp.json();
        setItensPorMochila((prev) => ({ ...prev, [mochilaId]: dados }));
      }
    } catch {
      setMensagem("Erro ao buscar itens. - Não sei o que isso tá fazendo aqui!");
    }
  };

  const salvarNovaMochila = async () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId || !novaMochila.viagemId) {
      setMensagem("Selecione uma viagem.");
      return;
    }
    if (!novaMochila.titulo) {
      setMensagem("Preencha o título da mochila.");
      return;
    }

    try {
      const resp = await fetch("http://localhost:8080/mochila", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: novaMochila.titulo,
          viagemId: novaMochila.viagemId,
          usuarioId,
        }),
      });

      if (resp.ok) {
        setMensagem("Mochila adicionada.");
        await buscarMochilas(novaMochila.viagemId);
        setNovaMochila({ titulo: "", viagemId: "" });
        setModalNovaMochilaAberto(false);
      } else {
        setMensagem("Erro ao adicionar mochila.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const abrirEdicaoMochila = (mochila, viagemId) => {
    setMochilaEditando({ ...mochila, viagem: { id: viagemId } });
  };

  const salvarEdicaoMochila = async () => {
    if (!mochilaEditando?.id || !mochilaEditando?.titulo) {
      setMensagem("Preencha o título da mochila.");
      return;
    }

    try {
      const resp = await fetch(`http://localhost:8080/mochila/att/${mochilaEditando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: mochilaEditando.titulo }),
      });

      if (resp.ok) {
        setMensagem("Mochila atualizada.");
        setMochilasPorViagem((prev) => {
          const mochilas = prev[mochilaEditando.viagem.id] || [];
          const atualizadas = mochilas.map((m) =>
            m.id === mochilaEditando.id ? { ...m, titulo: mochilaEditando.titulo } : m
          );
          return { ...prev, [mochilaEditando.viagem.id]: atualizadas };
        });
        setMochilaEditando(null);
      } else {
        setMensagem("Erro ao atualizar mochila.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const excluirMochila = async (mochilaId, viagemId) => {
    if (!window.confirm("Deseja realmente excluir essa mochila?")) return;

    try {
      const resp = await fetch(`http://localhost:8080/mochila/${mochilaId}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        setMensagem("Mochila excluída.");
        buscarMochilas(viagemId);
      } else {
        setMensagem("Erro ao excluir mochila.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const atualizarNovoItem = (mochilaId, campo, valor) => {
    setNovoItemPorMochila((prev) => ({
      ...prev,
      [mochilaId]: { ...prev[mochilaId], [campo]: valor },
    }));
  };

  const adicionarItem = async (mochilaId) => {
    const usuarioId = Number(localStorage.getItem("usuarioId"));
    const item = novoItemPorMochila[mochilaId];

    if (!usuarioId || !mochilaId || !item?.nome || !item?.descricao || !item?.quantidade) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const corpo = {
      nome: item.nome,
      descricao: item.descricao,
      quantidade: Number(item.quantidade),
      mochila: { id: mochilaId },
      usuarioId,
    };

    try {
      const resp = await fetch("http://localhost:8080/mochilaItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });

      if (resp.ok) {
        setMensagem("Item adicionado.");
        buscarItens(mochilaId);
        setNovoItemPorMochila((prev) => ({
          ...prev,
          [mochilaId]: { nome: "", descricao: "", quantidade: "" },
        }));
      } else {
        const erro = await resp.text();
        setMensagem(`Erro ao adicionar item: ${erro}`);
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const excluirItem = async (itemId, mochilaId) => {
    try {
      const resp = await fetch(`http://localhost:8080/mochilaItem/${itemId}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        setMensagem("Item excluído.");
        buscarItens(mochilaId);
      } else {
        setMensagem("Erro ao excluir item.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const abrirEdicao = (item, mochilaId) => {
    setItemEditando({ ...item, mochila: { id: mochilaId } });
  };

  const salvarEdicao = async () => {
    if (!itemEditando || !itemEditando.id) {
      setMensagem("Erro: Dados inválidos para edição.");
      return;
    }

    const corpo = {
      nome: itemEditando.nome,
      descricao: itemEditando.descricao,
      quantidade: Number(itemEditando.quantidade),
    };

    try {
      const resp = await fetch(`http://localhost:8080/mochilaItem/att/${itemEditando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });

      if (resp.ok) {
        setMensagem("Item atualizado.");
        setItensPorMochila((prev) => {
          const itens = prev[itemEditando.mochila.id] || [];
          const itensAtualizados = itens.map((i) =>
            i.id === itemEditando.id ? { ...i, ...corpo } : i
          );
          return { ...prev, [itemEditando.mochila.id]: itensAtualizados };
        });
        setItemEditando(null);
      } else {
        const erro = await resp.text();
        setMensagem(`Erro ao atualizar: ${erro}`);
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const voltarTelaInicial = () => {
    navigate("/tela-inicial");
  };

  return (

    <><Navbar />
      <div className="mochilas-container">


        <div className="mochilas-titulo-linha">
          <h2>Controle de Mochilas</h2>
          <button
            type="button"
            onClick={() => setModalNovaMochilaAberto(true)}
            className="mochilas-botao"
            title="Adicionar nova mochila"
          >
            +
          </button>
        </div>

        <MensagemFeedback mensagem={mensagem} />

        {viagens.map((viagem) => (
          <div key={viagem.id} className="mochilas-card-viagem">



            <div className="mochilas-viagem-e-mochilas">




              {/* Cards lado a lado */}
              <div className="mochilas-cards-container">
                {(mochilasPorViagem[viagem.id] || []).map((m) => (
                  <div key={m.id} className="mochilas-card-mochila">

                    <h4>{viagem.titulo}</h4>
                    <div className="mochilas-card-mochila-header">

                      <h5>{m.titulo}</h5>
                      <div className="mochilas-card-mochila-botoes">
                        <button
                          type="button"
                          onClick={() => abrirEdicaoMochila(m, viagem.id)}
                          className="btn-editar"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => excluirMochila(m.id, viagem.id)}
                          className="btn-excluir"
                        >
                          Excluir
                        </button>

                      </div>
                    </div>


                    <Formulario
                      onSubmit={(e) => {
                        e.preventDefault();
                        adicionarItem(m.id);
                      }}
                      className="mochilas-formulario-adicionar-item"
                    >
                      <input
                        placeholder="Item"
                        value={novoItemPorMochila[m.id]?.nome || ""}
                        onChange={(e) => atualizarNovoItem(m.id, "nome", e.target.value)}
                        className="mochilas-input"
                        required />
                      <input
                        placeholder="Descrição"
                        value={novoItemPorMochila[m.id]?.descricao || ""}
                        onChange={(e) => atualizarNovoItem(m.id, "descricao", e.target.value)}
                        className="mochilas-input"
                        required />
                      <input
                        placeholder="Quantidade"
                        type="number"
                        min="1"
                        value={novoItemPorMochila[m.id]?.quantidade || ""}
                        onChange={(e) => atualizarNovoItem(m.id, "quantidade", e.target.value)}
                        className="mochilas-input"
                        required />
                      <button type="submit" className="mochilas-botao">
                        Adicionar
                      </button>
                    </Formulario>

                    <table>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Descrição</th>
                          <th>Quantidade</th>

                        </tr>
                      </thead>
                      <tbody>
                        {(itensPorMochila[m.id] || []).map((item) => (
                          <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td>{item.descricao || "-"}</td>
                            <td>{item.quantidade}</td>
                            <button
                              type="button"
                              onClick={() => abrirEdicao(item, m.id)}
                              className="btn-editar"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => excluirItem(item.id, m.id)}
                              className="btn-excluir"
                            >
                              Excluir
                            </button>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}


        {/* Modal para nova mochila */}
        {modalNovaMochilaAberto && (
          <div className="nova-viagem-overlay">
            <div className="nova-viagem-container">
              <button
                type="button"
                className="btn-fechar"
                aria-label="Fechar"
                onClick={() => {
                  setModalNovaMochilaAberto(false);
                  setNovaMochila({ titulo: "", viagemId: "" });
                }}
              >
                &times;
              </button>
              <h2>Nova Mochila</h2>
              <Formulario
                onSubmit={(e) => {
                  e.preventDefault();
                  salvarNovaMochila();
                }}
              >
                <select
                  value={novaMochila.viagemId || ""}
                  onChange={(e) =>
                    setNovaMochila({ ...novaMochila, viagemId: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>
                    Selecione a viagem
                  </option>
                  {viagens.map((viagem) => (
                    <option key={viagem.id} value={viagem.id}>
                      {viagem.titulo}
                    </option>
                  ))}
                </select>

                <input
                  placeholder="Nome da mochila"
                  value={novaMochila.titulo}
                  onChange={(e) =>
                    setNovaMochila({ ...novaMochila, titulo: e.target.value })
                  }
                  required
                />

                <button className="btn-cadastrar" type="submit">
                  Salvar
                </button>
              </Formulario>
            </div>
          </div>
        )}



        {/* Modal para editar mochila */}
        {mochilaEditando && (
          <div className="mochilas-modal">
            <div className="mochilas-modal-content">
              <button
                type="button"
                className="btn-fechar-modal"
                aria-label="Fechar"
                onClick={() => setMochilaEditando(null)}
              >
                &times;
              </button>
              <h3>Editar Mochila</h3>
              <Formulario
                onSubmit={(e) => {
                  e.preventDefault();
                  salvarEdicaoMochila();
                }}
                className="mochilas-formulario-modal"
              >
                <input
                  placeholder="Nome"
                  value={mochilaEditando.titulo}
                  onChange={(e) => setMochilaEditando({ ...mochilaEditando, titulo: e.target.value })}
                  className="mochilas-input"
                  required />
                <button type="submit" className="mochilas-botao">
                  Salvar
                </button>
              </Formulario>
            </div>
          </div>
        )}

        {/* Modal para editar item */}
        {itemEditando && (
          <div className="mochilas-modal">
            <div className="mochilas-modal-content">
              <button
                type="button"
                className="btn-fechar-modal"
                aria-label="Fechar"
                onClick={() => setItemEditando(null)}
              >
                &times;
              </button>
              <h3>Editar Item</h3>
              <Formulario
                onSubmit={(e) => {
                  e.preventDefault();
                  salvarEdicao();
                }}
                className="mochilas-formulario-modal"
              >
                <input
                  placeholder="Item"
                  value={itemEditando.nome}
                  onChange={(e) => setItemEditando({ ...itemEditando, nome: e.target.value })}
                  className="mochilas-input"
                  required />
                <input
                  placeholder="Descrição"
                  value={itemEditando.descricao}
                  onChange={(e) => setItemEditando({ ...itemEditando, descricao: e.target.value })}
                  className="mochilas-input"
                  required />
                <input
                  placeholder="Quantidade"
                  type="number"
                  min="1"
                  value={itemEditando.quantidade}
                  onChange={(e) => setItemEditando({ ...itemEditando, quantidade: e.target.value })}
                  className="mochilas-input"
                  required />
                <button type="submit" className="mochilas-botao">
                  Salvar
                </button>
              </Formulario>
            </div>
          </div>
        )}
      </div></>
  );
};

export default Mochilas;
