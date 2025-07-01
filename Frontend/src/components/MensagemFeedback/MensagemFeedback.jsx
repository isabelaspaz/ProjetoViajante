const MensagemFeedback = ({ mensagem }) => {
  if (!mensagem) return null;
  return <p className="mensagem-feedback">{mensagem}</p>;
};
export default MensagemFeedback;