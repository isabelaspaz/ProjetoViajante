import React from 'react';

const TelaInicial = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bem-vindo ao Projeto Viajante!</h1>
            <p style={styles.subtitle}>
                Planeje sua próxima aventura com facilidade e descubra novos destinos.
            </p>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#f7f9f9',
        color: '#007a33',
        textAlign: 'center',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '1.5rem',
        maxWidth: '600px',
    },
};

export default TelaInicial;
