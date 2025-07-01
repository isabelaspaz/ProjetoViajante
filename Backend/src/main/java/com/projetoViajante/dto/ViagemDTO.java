package com.projetoViajante.dto;

public class ViagemDTO {

    private Long id;
    private String titulo;
    private String dataPartida;
    private String dataChegada;
    private Long cep;
    private String rua;
    private String bairro;
    private Long numero;
    private String cidade;
    private String estado;
    private Long usuarioId; 

    public ViagemDTO(String titulo, String dataPartida, String dataChegada) {
        this.titulo = titulo;
        this.dataPartida = dataPartida;
        this.dataChegada = dataChegada;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDataPartida() {
        return dataPartida;
    }

    public void setDataPartida(String dataPartida) {
        this.dataPartida = dataPartida;
    }

    public String getDataChegada() {
        return dataChegada;
    }

    public void setDataChegada(String dataChegada) {
        this.dataChegada = dataChegada;
    }

    public Long getCep() {
        return cep;
    }

    public void setCep(Long cep) {
        this.cep = cep;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public Long getNumero() {
        return numero;
    }

    public void setNumero(Long numero) {
        this.numero = numero;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public ViagemDTO() {
    }

    public ViagemDTO(Long id, String titulo, String dataPartida, String dataChegada, Long cep, String rua,
            String bairro, Long numero, String cidade, String estado, Long usuarioId) {
        this.id = id;
        this.titulo = titulo;
        this.dataPartida = dataPartida;
        this.dataChegada = dataChegada;
        this.cep = cep;
        this.rua = rua;
        this.bairro = bairro;
        this.numero = numero;
        this.cidade = cidade;
        this.estado = estado;
        this.usuarioId = usuarioId;
    }

    
}
