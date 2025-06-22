import { useEffect, useState } from "react";
import Menu from "../Menu/Menu"; // Importa o componente Menu
import ItemViagem from "./ItemViagem"; // Importa o ItemViagem para listar as viagens
// import "./ListaViagens.css"; // Estilo da lista de viagens

const ListaViagens = ({ usuario }) => {
  const [viagens, setViagens] = useState([]);
  const [erro, setErro] = useState(null);

  // Função para buscar as viagens do usuário
  const buscarViagens = async () => {
    try {
      const resposta = await fetch(`http://localhost:8080/viagem/usuario/${usuario.id}`);
      if (!resposta.ok) throw new Error("Erro ao buscar viagens");

      const dados = await resposta.json();
      console.log("Viagens recebidas:", dados); // Verificação no console

      // Garante que sempre seja um array
      setViagens(Array.isArray(dados) ? dados : [dados]);
    } catch (err) {
      setErro(`Erro ao carregar viagens: ${err.message}`);
    }
  };

  // UseEffect para buscar as viagens assim que o componente for montado
  useEffect(() => {
    if (usuario?.id) {
      buscarViagens();
    }
  }, [usuario]);

  return (
    <div>
      <Menu />
      <div className="container" style={{ padding: "2rem" }}>
        <h2>Minhas Viagens</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>} {/* Exibe erros, caso haja */}

        {viagens.length === 0 ? (
          <p>Nenhuma viagem encontrada.</p> // Mensagem se não houver viagens
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {viagens.map((viagem) => (
              <ItemViagem
                key={viagem.id}
                viagem={viagem}
                formatarData={(data) => new Date(data).toLocaleDateString("pt-BR")}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListaViagens;
