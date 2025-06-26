const ViagemLista = ({ viagens, selectedViagemId, onToggle }) => (
  <div>
    {viagens.map((viagem) => (
      <div
        key={viagem.id}
        onClick={() => onToggle(viagem.id)}
        style={{
          cursor: "pointer",
          border: "1px solid #000",
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: selectedViagemId === viagem.id ? "#f0f0f0" : "white",
        }}
      >
        <h3>{viagem.titulo}</h3>
      </div>
    ))}
  </div>
);

export default ViagemLista;