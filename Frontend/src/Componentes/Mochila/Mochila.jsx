import React, { useState, useEffect } from "react";
import Menu from "../Menu/Menu"; // Importe o componente Menu
import "./Mochila.css";

const Mochila = ({ usuario }) => {
  const [viagens, setViagens] = useState([]);
  const [selectedViagem, setSelectedViagem] = useState(null);
  const [mochilas, setMochilas] = useState([]);
  const [novaMochila, setNovaMochila] = useState({ titulo: "", pesoTotalAprox: 0 });
  const [mochilaEditando, setMochilaEditando] = useState(null); // Estado para edição de mochila
  const [novoItem, setNovoItem] = useState({});
  const [itemEditando, setItemEditando] = useState(null); // Estado para edição de item
  const [mochilaParaItem, setMochilaParaItem] = useState(null);

  // Carrega viagens do usuário
  useEffect(() => {
    async function fetchViagens() {
      const res = await fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`);
      const data = await res.json();
      setViagens(data);
    }
    fetchViagens();
  }, [usuario]);

  // Carrega mochilas de uma viagem
  const carregarMochilas = async (viagemId) => {
    setSelectedViagem(viagemId);
    try {
      const res = await fetch(`http://localhost:8080/mochila/${viagemId}`);
      const data = await res.json();

      // Se for um objeto único, transforma em array
      const mochilasArray = Array.isArray(data) ? data : data ? [data] : [];

      setMochilas(mochilasArray);
    } catch (err) {
      console.error("Erro ao carregar mochilas:", err);
      setMochilas([]);
    }
  };

  // Criar nova mochila
  const handleCriarMochila = async () => {
    if (!novaMochila.titulo) return alert("Título é obrigatório!");
    const res = await fetch("http://localhost:8080/mochila", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...novaMochila, viagemId: selectedViagem }),
    });
    if (res.ok) {
      alert("Mochila criada!");
      setNovaMochila({ titulo: "", pesoTotalAprox: 0 });
      setTimeout(() => carregarMochilas(selectedViagem), 500); // Recarrega mochilas após a criação
    } else {
      alert("Erro ao criar mochila.");
    }
  };

  // Editar mochila
  const handleEditarMochila = async () => {
    if (!mochilaEditando.titulo) return alert("Título é obrigatório!");
    const res = await fetch(`http://localhost:8080/mochila/att/${mochilaEditando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mochilaEditando),
    });
    if (res.ok) {
      alert("Mochila atualizada!");
      setMochilaEditando(null);
      setTimeout(() => carregarMochilas(selectedViagem), 500); // Recarrega mochilas após edição
    } else {
      alert("Erro ao editar mochila.");
    }
  };

  // Criar item na mochila
  const handleCriarItem = async () => {
    if (!novoItem.nome || !mochilaParaItem) return alert("Preencha o nome e selecione a mochila.");
    const res = await fetch("http://localhost:8080/mochilaItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...novoItem, mochila: { id: mochilaParaItem } }),
    });
    if (res.ok) {
      alert("Item adicionado!");
      setNovoItem({});
      setTimeout(() => carregarMochilas(selectedViagem), 500); // Recarrega mochilas após adicionar item
    } else {
      alert("Erro ao adicionar item.");
    }
  };

  // Editar item
  const handleEditarItem = async () => {
    if (!itemEditando.nome || !itemEditando.descricao || itemEditando.quantidade == null) {
      return alert("Nome, descrição e quantidade são obrigatórios!");
    }
    const res = await fetch(`http://localhost:8080/mochilaItem/att/${itemEditando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemEditando),
    });
    if (res.ok) {
      alert("Item atualizado!");
      setItemEditando(null);
      setTimeout(() => carregarMochilas(selectedViagem), 500); // Recarrega mochilas após edição
    } else {
      alert("Erro ao editar item.");
    }
  };

  // Excluir mochila
  const handleExcluirMochila = async (id) => {
    const res = await fetch(`http://localhost:8080/mochila/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Mochila excluída.");
      setTimeout(() => carregarMochilas(selectedViagem), 500); // Recarrega mochilas após excluir
    }
  };

  // Excluir item da mochila
  const handleExcluirItem = async (itemId) => {
    const res = await fetch(`http://localhost:8080/mochilaItem/${itemId}`, { method: "DELETE" });
    if (res.ok) {
      alert("Item removido.");
      setTimeout(() => carregarMochilas(selectedViagem), 500); // Recarrega mochilas após excluir item
    }
  };

  return (
    <div>
      <Menu /> {/* Componente Menu colocado aqui */}
      <h1>Minhas Viagens</h1>
      {viagens.map((viagem) => (
        <div
          key={viagem.id}
          onClick={() => carregarMochilas(viagem.id)}
          style={{ cursor: "pointer", border: "1px solid #000", marginBottom: "10px", padding: "10px" }}
        >
          <h3>{viagem.titulo}</h3>
        </div>
      ))}

      {selectedViagem && (
        <div>
          <h2>Mochilas da Viagem</h2>
          {mochilas.length === 0 && <p>Nenhuma mochila cadastrada ainda.</p>}

          {/* Formulário Nova Mochila */}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Título da Mochila"
              value={novaMochila.titulo}
              onChange={(e) => setNovaMochila({ ...novaMochila, titulo: e.target.value })}
            />
            <input
              type="number"
              placeholder="Peso Total Aproximado"
              value={novaMochila.pesoTotalAprox}
              onChange={(e) => setNovaMochila({ ...novaMochila, pesoTotalAprox: e.target.value })}
            />
            <button onClick={handleCriarMochila}>Criar Mochila</button>
          </div>

          {/* Lista de Mochilas */}
          {mochilas.map((mochila) => (
            <div
              key={mochila.id}
              style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}
            >
              <h3>
                {mochilaEditando?.id === mochila.id ? (
                  <input
                    type="text"
                    value={mochilaEditando.titulo}
                    onChange={(e) => setMochilaEditando({ ...mochilaEditando, titulo: e.target.value })}
                  />
                ) : (
                  mochila.titulo
                )}
              </h3>
              <p>
                Peso Total:{" "}
                {mochilaEditando?.id === mochila.id ? (
                  <input
                    type="number"
                    value={mochilaEditando.pesoTotalAprox}
                    onChange={(e) => setMochilaEditando({ ...mochilaEditando, pesoTotalAprox: e.target.value })}
                  />
                ) : (
                  `${mochila.pesoTotalAprox}kg`
                )}
              </p>
              {mochilaEditando?.id === mochila.id ? (
                <button onClick={handleEditarMochila}>Salvar Edição</button>
              ) : (
                <button onClick={() => setMochilaEditando(mochila)}>Editar Mochila</button>
              )}
              <button onClick={() => handleExcluirMochila(mochila.id)}>Excluir Mochila</button>

              <h4>Itens:</h4>
              {(mochila.mochilaItens || []).map((item) => (
                <div key={item.id} style={{ paddingLeft: "20px" }}>
                  <strong>
                    {itemEditando?.id === item.id ? (
                      <>
                        <label>Nome do Item:</label>
                        <input
                          type="text"
                          value={itemEditando.nome}
                          onChange={(e) => setItemEditando({ ...itemEditando, nome: e.target.value })}
                        />
                      </>
                    ) : (
                      item.nome
                    )}
                  </strong>{" "}
                  -{" "}
                  {itemEditando?.id === item.id ? (
                    <>
                      <label>Descrição:</label>
                      <input
                        type="text"
                        value={itemEditando.descricao}
                        onChange={(e) => setItemEditando({ ...itemEditando, descricao: e.target.value })}
                      />
                    </>
                  ) : (
                    item.descricao
                  )}
                  <label>Quantidade:</label>
                  <input
                    type="number"
                    value={itemEditando?.id === item.id ? itemEditando.quantidade : item.quantidade}
                    onChange={(e) => setItemEditando({ ...itemEditando, quantidade: e.target.value })}
                    placeholder="Quantidade"
                  />
                  <button onClick={() => handleExcluirItem(item.id)} style={{ marginLeft: "10px" }}>
                    Remover
                  </button>
                  {itemEditando?.id === item.id && (
                    <button onClick={handleEditarItem}>Salvar Edição</button>
                  )}
                  {itemEditando?.id !== item.id && (
                    <button onClick={() => setItemEditando(item)}>Editar Item</button>
                  )}
                </div>
              ))}

              {/* Formulário novo item */}
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Nome do Item"
                  value={mochilaParaItem === mochila.id ? novoItem.nome || "" : ""}
                  onChange={(e) =>
                    setNovoItem({ ...novoItem, nome: e.target.value }) || setMochilaParaItem(mochila.id)
                  }
                />
                <input
                  type="text"
                  placeholder="Descrição"
                  value={mochilaParaItem === mochila.id ? novoItem.descricao || "" : ""}
                  onChange={(e) =>
                    setNovoItem({ ...novoItem, descricao: e.target.value }) || setMochilaParaItem(mochila.id)
                  }
                />
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={mochilaParaItem === mochila.id ? novoItem.quantidade || 1 : 1}
                  onChange={(e) =>
                    setNovoItem({ ...novoItem, quantidade: e.target.value }) || setMochilaParaItem(mochila.id)
                  }
                />
                <button onClick={handleCriarItem}>Adicionar Item</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mochila;
