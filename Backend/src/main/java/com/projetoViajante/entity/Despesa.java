package com.projetoViajante.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Despesa")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Long quantidade;
    private Long preco;

    @ManyToOne
    @JoinColumn(name = "viagem_id")
    @JsonBackReference
    private Viagem viagem;

    @ManyToOne
    @JsonIgnore 
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    
}
