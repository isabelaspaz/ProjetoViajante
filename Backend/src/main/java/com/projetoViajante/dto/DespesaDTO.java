package com.projetoViajante.dto;

public class DespesaDTO {

    private Long id;
    private String nome;
    private Long preco;
    private Long viagemId;
    private Long usuarioId;

    public DespesaDTO() {
    }

    public DespesaDTO(Long id, String nome, Long quantidade, Long preco, Long viagemId, Long usuarioId) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.viagemId = viagemId;
        this.usuarioId = usuarioId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getPreco() {
        return preco;
    }

    public void setPreco(Long preco) {
        this.preco = preco;
    }

    public Long getViagemId() {
        return viagemId;
    }

    public void setViagemId(Long viagemId) {
        this.viagemId = viagemId;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

}
