import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Menu/Menu";
import NovaViagem from "../../components/Viagem/NovaViagem";

const TelaInicial = () => {
    const [mostrarNovaViagem, setMostrarNovaViagem] = useState(false);

    return (
        <>
            <Navbar onNovaViagemClick={() => setMostrarNovaViagem(true)} />
            <Menu />
            {mostrarNovaViagem && (
                <NovaViagem onClose={() => setMostrarNovaViagem(false)} />
            )}
        </>
    );
};

export default TelaInicial;
