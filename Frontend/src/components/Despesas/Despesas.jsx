import { useEffect, useState } from "react";
import CardViagem from "../CardViagem/CardViagem";
import MensagemFeedback from "../MensagemFeedback/MensagemFeedback";
import Formulario from "../Formulario/Formulario";
import "./Despesas.css";

const Despesas = () => {
  const [viagens, setViagens] = useState([]);
  const [despesasPorViagem, setDespesasPorViagem] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [viagemSelecionada, setViagemSelecionada] = useState(null);
  const [novaDespesa, setNovaDespesa] = useState({ nome: "", preco: "" });
  const [despesaEditando, setDespesaEditando] = useState(null);
  const [viagemIdDaEdicao, setViagemIdDaEdicao] = useState(null);

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
        lista.forEach((v) => buscarDespesas(v.id));
      } else {
        setMensagem("Erro ao buscar viagens.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const buscarDespesas = async (viagemId) => {
    try {
      const resp = await fetch(`http://localhost:8080/despesa/${viagemId}`);
      if (resp.ok) {
        const dados = await resp.json();
        setDespesasPorViagem((prev) => ({
          ...prev,
          [viagemId]: dados,
        }));
      } else {
        setMensagem("Erro ao buscar despesas.");
      }
    } catch {
      setMensagem("Erro ao buscar despesas.");
    }
  };

  const abrirModalNovaDespesa = (viagem) => {
    setViagemSelecionada(viagem);
    setNovaDespesa({ nome: "", preco: "" });
  };

  const salvarNovaDespesa = async () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId || !viagemSelecionada) return;

    try {
      const resp = await fetch("http://localhost:8080/despesa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: novaDespesa.nome,
          preco: novaDespesa.preco,
          viagemId: viagemSelecionada.id,
          usuarioId,
        }),
      });

      if (resp.ok) {
        setMensagem("Despesa adicionada.");
        buscarDespesas(viagemSelecionada.id);
        setViagemSelecionada(null);
      } else {
        setMensagem("Erro ao adicionar despesa.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const excluirDespesa = async (despesaId, viagemId) => {
    try {
      const resp = await fetch(`http://localhost:8080/despesa/${despesaId}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        setMensagem("Despesa excluída.");
        setDespesasPorViagem((prev) => {
          const novasDespesas = (prev[viagemId] || []).filter((d) => d.id !== despesaId);
          return {
            ...prev,
            [viagemId]: novasDespesas,
          };
        });
      } else {
        setMensagem("Erro ao excluir despesa.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const abrirEdicao = (despesa, viagemId) => {
    setDespesaEditando(despesa);
    setViagemIdDaEdicao(viagemId);
  };

  const salvarEdicao = async () => {
    try {
      const resp = await fetch(`http://localhost:8080/despesa/att/${despesaEditando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(despesaEditando),
      });

      if (resp.ok) {
        setMensagem("Despesa atualizada.");
        buscarDespesas(viagemIdDaEdicao);
        setDespesaEditando(null);
        setViagemIdDaEdicao(null);
      } else {
        setMensagem("Erro ao atualizar.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="despesas-container">
      <h2>Controle de Despesas</h2>
      <MensagemFeedback mensagem={mensagem} />

      {viagens.map((viagem) => (
        <div key={viagem.id} className="card-viagem-completo">
          <div className="cabecalho-viagem">
            <h3>Viagem {viagem.titulo}</h3>
            <p><strong>Cidade:</strong> {viagem.cidade}</p>
            <p><strong>Estado:</strong> {viagem.estado}</p>
          </div>

          <div className="despesas-bloco">
            <h4>Despesas:</h4>

            {(despesasPorViagem[viagem.id] || []).length === 0 ? (
              <p className="nenhuma-despesa">Nenhuma despesa cadastrada.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {(despesasPorViagem[viagem.id] || []).map((d) => (
                    <tr key={d.id}>
                      <td>{d.nome}</td>
                      <td>{d.preco}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-editar"
                          onClick={() => abrirEdicao(d, viagem.id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn-excluir"
                          onClick={() => excluirDespesa(d.id, viagem.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="adicionar-despesa">
              <button
                type="button"
                className="btn-adicionar"
                onClick={() => abrirModalNovaDespesa(viagem)}
              >
                Adicionar Despesa
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal embutido para Nova Despesa */}
      {viagemSelecionada && (
        <section className="modal-embutido nova-despesa">
          <h3>Nova Despesa</h3>
          <button
            type="button"
            className="btn-fechar"
            onClick={() => setViagemSelecionada(null)}
            aria-label="Fechar"
          >
            &times;
          </button>
          <Formulario onSubmit={(e) => { e.preventDefault(); salvarNovaDespesa(); }}>
            <label>
              Nome
              <input
                type="text"
                value={novaDespesa.nome}
                onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })}
                required
              />
            </label>
            <label>
              Preço
              <input
                type="number"
                step="0.01"
                value={novaDespesa.preco}
                onChange={(e) => setNovaDespesa({ ...novaDespesa, preco: e.target.value })}
                required
              />
            </label>
            <button className="btn-salvar" type="submit">Salvar</button>
          </Formulario>
        </section>
      )}

      {/* Modal embutido para Editar Despesa */}
      {despesaEditando && (
        <section className="modal-embutido editar-despesa">
          <h3>Editar Despesa</h3>
          <button
            type="button"
            className="btn-fechar"
            onClick={() => setDespesaEditando(null)}
            aria-label="Fechar"
          >
            &times;
          </button>
          <Formulario onSubmit={(e) => { e.preventDefault(); salvarEdicao(); }}>
            <label>
              Nome
              <input
                type="text"
                value={despesaEditando.nome}
                onChange={(e) => setDespesaEditando({ ...despesaEditando, nome: e.target.value })}
                required
              />
            </label>
            <label>
              Preço
              <input
                type="number"
                step="0.01"
                value={despesaEditando.preco}
                onChange={(e) => setDespesaEditando({ ...despesaEditando, preco: e.target.value })}
                required
              />
            </label>
            <button className="btn-salvar" type="submit">Salvar</button>
          </Formulario>
        </section>
      )}
    </div>
  );
};

export default Despesas;
