import { useEffect, useState } from "react";
import CardViagem from "../CardViagem/CardViagem";
import CampoInput from "../CampoInput/CampoInput";
import Botao from "../Botao/Botao";
import MensagemFeedback from "../MensagemFeedback/MensagemFeedback";
import Modal from "../Modal/Modal";
import Formulario from "../Formulario/Formulario";

const Mochilas = () => {
  const [viagens, setViagens] = useState([]);
  const [mochilasPorViagem, setMochilasPorViagem] = useState({});
  const [itensPorMochila, setItensPorMochila] = useState({});
  const [novoItemPorMochila, setNovoItemPorMochila] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [viagemSelecionada, setViagemSelecionada] = useState(null);
  const [novaMochila, setNovaMochila] = useState({ titulo: "" });
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
        setMochilasPorViagem((prev) => ({
          ...prev,
          [viagemId]: dados,
        }));
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
        setItensPorMochila((prev) => ({
          ...prev,
          [mochilaId]: [...dados],
        }));
      }
    } catch {
      setMensagem("Erro ao buscar itens.");
    }
  };

  const abrirModalNovaMochila = (viagem) => {
    setViagemSelecionada(viagem);
    setNovaMochila({ titulo: "" });
  };

  const salvarNovaMochila = async () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId || !viagemSelecionada) return;

    try {
      const resp = await fetch("http://localhost:8080/mochila", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: novaMochila.titulo,
          viagemId: viagemSelecionada.id,
          usuarioId,
        }),
      });

      if (resp.ok) {
        setMensagem("Mochila adicionada.");
        await buscarMochilas(viagemSelecionada.id);
        setViagemSelecionada(null);
      } else {
        setMensagem("Erro ao adicionar mochila.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  const abrirEdicaoMochila = (mochila, viagemId) => {
    setMochilaEditando({
      ...mochila,
      viagem: { id: viagemId },
    });
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

          return {
            ...prev,
            [mochilaEditando.viagem.id]: atualizadas,
          };
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
      [mochilaId]: {
        ...prev[mochilaId],
        [campo]: valor,
      },
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
    setItemEditando({
      ...item,
      mochila: { id: mochilaId },
    });
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

          return {
            ...prev,
            [itemEditando.mochila.id]: itensAtualizados,
          };
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

  return (
    <div className="mochilas-container">
      <h2>Controle de Mochilas</h2>
      <MensagemFeedback mensagem={mensagem} />

      {viagens.map((viagem) => (
        <div key={viagem.id} className="mochilas-card-viagem">
          <CardViagem viagem={viagem} />

          <h4>Mochilas:</h4>

          {(mochilasPorViagem[viagem.id] || []).map((m) => (
            <div key={m.id} className="mochilas-card-mochila">
              <h5>{m.titulo}</h5>
              <Botao texto="Editar Mochila" onClick={() => abrirEdicaoMochila(m, viagem.id)} />
              <Botao texto="Excluir Mochila" onClick={() => excluirMochila(m.id, viagem.id)} />

              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {(itensPorMochila[m.id] || []).map((item) => (
                    <tr key={item.id}>
                      <td>{item.nome}</td>
                      <td>{item.descricao || "-"}</td>
                      <td>{item.quantidade}</td>
                      <td>
                        <Botao texto="Editar" onClick={() => abrirEdicao(item, m.id)} />
                        <Botao texto="Excluir" onClick={() => excluirItem(item.id, m.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Formulario onSubmit={(e) => { e.preventDefault(); adicionarItem(m.id); }} className="mochilas-formulario-adicionar-item">
                <CampoInput
                  label="Nome"
                  value={novoItemPorMochila[m.id]?.nome || ""}
                  onChange={(e) => atualizarNovoItem(m.id, "nome", e.target.value)}
                  className="mochilas-input"
                />
                <CampoInput
                  label="Descrição"
                  value={novoItemPorMochila[m.id]?.descricao || ""}
                  onChange={(e) => atualizarNovoItem(m.id, "descricao", e.target.value)}
                  className="mochilas-input"
                />
                <CampoInput
                  label="Quantidade"
                  type="number"
                  value={novoItemPorMochila[m.id]?.quantidade || ""}
                  onChange={(e) => atualizarNovoItem(m.id, "quantidade", e.target.value)}
                  className="mochilas-input"
                />
                <Botao texto="Adicionar Item" tipo="submit" className="mochilas-botao" />
              </Formulario>
            </div>
          ))}

          <Botao texto="Adicionar Mochila" onClick={() => abrirModalNovaMochila(viagem)} className="mochilas-botao" />
        </div>
      ))}

      {viagemSelecionada && (
        <Modal titulo="Nova Mochila" onFechar={() => setViagemSelecionada(null)} className="mochilas-modal">
          <Formulario onSubmit={(e) => { e.preventDefault(); salvarNovaMochila(); }} className="mochilas-formulario-modal">
            <CampoInput
              label="Título"
              value={novaMochila.titulo}
              onChange={(e) => setNovaMochila({ ...novaMochila, titulo: e.target.value })}
              className="mochilas-input"
            />
            <Botao texto="Salvar" tipo="submit" className="mochilas-botao" />
          </Formulario>
        </Modal>
      )}

      {mochilaEditando && (
        <Modal titulo="Editar Mochila" onFechar={() => setMochilaEditando(null)} className="mochilas-modal">
          <Formulario onSubmit={(e) => { e.preventDefault(); salvarEdicaoMochila(); }} className="mochilas-formulario-modal">
            <CampoInput
              label="Título"
              value={mochilaEditando.titulo}
              onChange={(e) => setMochilaEditando({ ...mochilaEditando, titulo: e.target.value })}
              className="mochilas-input"
            />
            <Botao texto="Salvar" tipo="submit" className="mochilas-botao" />
          </Formulario>
        </Modal>
      )}

      {itemEditando && (
        <Modal titulo="Editar Item" onFechar={() => setItemEditando(null)} className="mochilas-modal">
          <Formulario onSubmit={(e) => { e.preventDefault(); salvarEdicao(); }} className="mochilas-formulario-modal">
            <CampoInput
              label="Nome"
              value={itemEditando.nome}
              onChange={(e) => setItemEditando({ ...itemEditando, nome: e.target.value })}
              className="mochilas-input"
            />
            <CampoInput
              label="Descrição"
              value={itemEditando.descricao}
              onChange={(e) => setItemEditando({ ...itemEditando, descricao: e.target.value })}
              className="mochilas-input"
            />
            <CampoInput
              label="Quantidade"
              type="number"
              value={itemEditando.quantidade}
              onChange={(e) => setItemEditando({ ...itemEditando, quantidade: e.target.value })}
              className="mochilas-input"
            />
            <Botao texto="Salvar" tipo="submit" className="mochilas-botao" />
          </Formulario>
        </Modal>
      )}
    </div>
  );
};

export default Mochilas;
