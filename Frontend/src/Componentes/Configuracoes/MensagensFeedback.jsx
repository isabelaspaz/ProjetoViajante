import React from 'react';

const MensagensFeedback = ({ erro, sucesso }) => (
  <>
    {erro && <p style={{ color: 'red' }}>{erro}</p>}
    {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}
  </>
);

export default MensagensFeedback;
