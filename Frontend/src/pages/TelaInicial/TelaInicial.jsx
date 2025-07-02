import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Menu/Menu";
import "./TelaInicial.css";

const TelaInicial = () => {
  return (
    <div className="tela-inicial">
      <Navbar />
      <Menu />
    </div>
  );
};

export default TelaInicial;
