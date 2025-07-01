package com.projetoViajante.dto;

import com.projetoViajante.entity.Mochila;

public class MochilaItemDTO {

    private Long id;
    private String nome;
    private Long quantidade;
    private String descricao;
    private Mochila mochila;
    private Long usuarioId;
    
    public MochilaItemDTO() {
    }


    public MochilaItemDTO(Long id, String nome, Long quantidade, String descricao, Mochila mochila) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.descricao = descricao;
        this.mochila = mochila;
    }

    public MochilaItemDTO(String descricao, Long id, Mochila mochila, String nome, Long quantidade, Long usuarioId) {
        this.descricao = descricao;
        this.id = id;
        this.mochila = mochila;
        this.nome = nome;
        this.quantidade = quantidade;
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

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Mochila getMochila() {
        return mochila;
    }

    public void setMochila(Mochila mochila) {
        this.mochila = mochila;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    
    
}
