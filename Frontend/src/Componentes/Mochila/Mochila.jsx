import React, { useState, useEffect } from "react";
import Menu from "../Menu/Menu";
import ViagemLista from "./ViagemLista";
import MochilaLista from "./MochilaLista";
import "./Mochila.css";

const Mochila = ({ usuario }) => {
  const [viagens, setViagens] = useState([]);
  const [selectedViagem, setSelectedViagem] = useState(null);
  const [mochilas, setMochilas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`)
      .then((res) => res.json())
      .then(setViagens);
  }, [usuario]);

  const toggleViagem = async (viagemId) => {
    if (selectedViagem === viagemId) {
      setSelectedViagem(null);
      setMochilas([]);
    } else {
      setSelectedViagem(viagemId);
      const res = await fetch(`http://localhost:8080/mochila/${viagemId}`);
      const data = await res.json();
      setMochilas(Array.isArray(data) ? data : data ? [data] : []);
    }
  };

  return (
    <div>
      <Menu />
      <h1>Mochilas por Viagem</h1>
      <ViagemLista viagens={viagens} selectedViagemId={selectedViagem} onToggle={toggleViagem} />
      {selectedViagem && (
        <MochilaLista
          mochilas={mochilas}
          viagemId={selectedViagem}
          recarregarMochilas={() => toggleViagem(selectedViagem)}
        />
      )}
    </div>
  );
};


export default Mochila;
