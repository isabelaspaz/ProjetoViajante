package com.projetoViajante.dto;

import com.projetoViajante.entity.MochilaItem;

public class MochilaDTO {

    private Long id;
    private String titulo;
    private Long pesoTotalAprox;
    private Long viagemId;
    private Long usuarioId;
    private MochilaItem mochilaItem;

    public MochilaDTO() {
    }

    public MochilaDTO(Long id, String titulo, Long pesoTotalAprox, Long viagemId, Long usuarioId,
            MochilaItem mochilaItem) {
        this.id = id;
        this.titulo = titulo;
        this.pesoTotalAprox = pesoTotalAprox;
        this.viagemId = viagemId;
        this.usuarioId = usuarioId;
        this.mochilaItem = mochilaItem;
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

    public Long getPesoTotalAprox() {
        return pesoTotalAprox;
    }

    public void setPesoTotalAprox(Long pesoTotalAprox) {
        this.pesoTotalAprox = pesoTotalAprox;
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

    public MochilaItem getMochilaItem() {
        return mochilaItem;
    }

    public void setMochilaItem(MochilaItem mochilaItem) {
        this.mochilaItem = mochilaItem;
    }
    
}
