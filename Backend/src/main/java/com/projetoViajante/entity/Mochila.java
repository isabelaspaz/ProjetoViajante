package com.projetoViajante.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Mochila")
public class Mochila {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private Long pesoTotalAprox;

    @ManyToOne
    @JsonIgnore 
    @JoinColumn(name = "viagem_id")
    private Viagem viagem;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "mochila", cascade = CascadeType.ALL)
    private List<MochilaItem> mochilaItens;

    public Mochila() {
    }

    public Mochila(Long id, String titulo, Long pesoTotalAprox, Viagem viagem, Usuario usuario,
            List<MochilaItem> mochilaItens) {
        this.id = id;
        this.titulo = titulo;
        this.pesoTotalAprox = pesoTotalAprox;
        this.viagem = viagem;
        this.usuario = usuario;
        this.mochilaItens = mochilaItens;
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

    public Viagem getViagem() {
        return viagem;
    }

    public void setViagem(Viagem viagem) {
        this.viagem = viagem;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<MochilaItem> getMochilaItens() {
        return mochilaItens;
    }

    public void setMochilaItens(List<MochilaItem> mochilaItens) {
        this.mochilaItens = mochilaItens;
    }


    
    
}
