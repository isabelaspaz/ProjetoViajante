import { useEffect, useState } from "react";
import CardViagem from "../CardViagem/CardViagem"; // Verifique se está correto
import MensagemFeedback from "../MensagemFeedback/MensagemFeedback";
import Formulario from "../Formulario/Formulario";
import "./Menu.css";

const Menu = () => {
  const [viagens, setViagens] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [viagemEditando, setViagemEditando] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [dadosExtras, setDadosExtras] = useState({});

  useEffect(() => {
    buscarViagens();
  }, []);

  useEffect(() => {
    viagens.forEach((v) => {
      buscarQtdMochilas(v.id);
      buscarTotalDespesas(v.id);
    });
  }, [viagens]);

  const buscarViagens = async () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;

    try {
      const resp = await fetch(`http://localhost:8080/viagem/usuario/${usuarioId}`);

      if (resp.status === 204) {
        setViagens([]);
        setMensagem("Você ainda não possui viagens cadastradas.");
      } else if (resp.ok) {
        const dados = await resp.json();
        setViagens(dados);
        setMensagem("");
      } else {
        setMensagem("Erro ao buscar viagens.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const buscarQtdMochilas = async (viagemId) => {
    try {
      const resp = await fetch(`http://localhost:8080/mochila/${viagemId}`);
      if (resp.ok) {
        const mochilas = await resp.json();
        setDadosExtras((prev) => ({
          ...prev,
          [viagemId]: {
            ...prev[viagemId],
            qtdMochilas: mochilas.length,
          },
        }));
      }
    } catch {
      setMensagem("Erro ao buscar mochilas.");
    }
  };

  const buscarTotalDespesas = async (viagemId) => {
    try {
      const resp = await fetch(`http://localhost:8080/despesa/${viagemId}`);

      if (resp.status === 204) {
        setDadosExtras((prev) => ({
          ...prev,
          [viagemId]: {
            ...prev[viagemId],
            totalDespesas: 0,
          },
        }));
      } else if (resp.ok) {
        const despesas = await resp.json();
        const total = despesas.reduce(
          (soma, d) => soma + (Number(d.preco || 0) * Number(d.quantidade || 0)),
          0
        );

        setDadosExtras((prev) => ({
          ...prev,
          [viagemId]: {
            ...prev[viagemId],
            totalDespesas: total,
          },
        }));
      } else {
        setMensagem("Erro ao buscar despesas.");
      }
    } catch {
      setMensagem("Erro ao buscar despesas.");
    }
  };

  const excluirViagem = async (id) => {
    const confirmar = window.confirm("Deseja realmente excluir esta viagem?");
    if (!confirmar) return;

    try {
      const resposta = await fetch(`http://localhost:8080/viagem/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        setMensagem("Viagem excluída com sucesso.");
        setViagens(viagens.filter((v) => v.id !== id));
      } else {
        setMensagem("Erro ao excluir viagem.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const abrirEdicao = (viagem) => {
    setViagemEditando(viagem);
    setTitulo(viagem.titulo);
    setCidade(viagem.cidade);
    setEstado(viagem.estado);
  };

  const salvarEdicao = async () => {
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await fetch(`http://localhost:8080/viagem/${viagemEditando.id}/usuario/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...viagemEditando, titulo, cidade, estado, usuarioId }),
      });
      setViagemEditando(null);
      buscarViagens();
      setMensagem("Viagem atualizada com sucesso.");
    } catch {
      setMensagem("Erro ao atualizar viagem.");
    }
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">Minhas Viagens</h2> {/* Título fora dos cards */}
      <MensagemFeedback className="menu-feedback" mensagem={mensagem} />
      <div className="menu-container-viagens">
        {viagens.map((v) => (
          <CardViagem
            key={v.id}
            viagem={v}
            onEditar={abrirEdicao}
            onExcluir={excluirViagem}
            qtdMochilas={dadosExtras[v.id]?.qtdMochilas || 0}
            totalDespesas={dadosExtras[v.id]?.totalDespesas ?? 0}
            className="menu-card-viagem"
          />
        ))}
      </div>

      {/* Modal embutido para edição */}
      {viagemEditando && (
        <section className="modal-embutido menu-modal">
          <h3>Editar Viagem</h3>
          <button
            type="button"
            className="btn-fechar"
            onClick={() => setViagemEditando(null)}
            aria-label="Fechar"
          >
            &times;
          </button>
          <Formulario
            onSubmit={(e) => {
              e.preventDefault();
              salvarEdicao();
            }}
            className="menu-formulario"
          >
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="menu-campo-input"
              placeholder="Título"
              required
            />
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="menu-campo-input"
              placeholder="Cidade"
              required
            />
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="menu-campo-input"
              placeholder="Estado"
              required
            />
            <button type="submit" className="menu-botao">
              Salvar
            </button>
          </Formulario>
        </section>
      )}
    </div>
  );
};

export default Menu;
