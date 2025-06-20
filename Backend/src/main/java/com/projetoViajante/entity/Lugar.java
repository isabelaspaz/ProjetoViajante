package com.projetoViajante.entity;

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
@Table(name = "Lugar")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lugar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long cep;
    private String rua;
    private String bairro;
    private Long numero;
    private String complemento;
    private String cidade;
    private String estado;
    private String pais;

    @ManyToOne
    @JoinColumn(name = "viagem_id")
    private Viagem viagem;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
