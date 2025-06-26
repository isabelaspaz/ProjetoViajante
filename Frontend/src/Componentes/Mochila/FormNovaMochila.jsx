const FormNovaMochila = ({ novaMochila, setNovaMochila, viagemId, recarregar }) => {
  const handleCriarMochila = async () => {
    if (!novaMochila.titulo) return alert("Título é obrigatório!");
    const res = await fetch("http://localhost:8080/mochila", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...novaMochila, viagemId }),
    });
    if (res.ok) {
      alert("Mochila criada!");
      setNovaMochila({ titulo: "", pesoTotalAprox: 0 });
      recarregar();
    } else {
      alert("Erro ao criar mochila.");
    }
  };

  return (
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
  );
};

export default FormNovaMochila;
