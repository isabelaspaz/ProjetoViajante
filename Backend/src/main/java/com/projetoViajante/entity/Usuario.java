package com.projetoViajante.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name= "Usuario")
@Data
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @Column(nullable = false, length =50, unique = true)
    private String email;
    private String senha;
    
    @OneToMany(mappedBy = "usuario", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Viagem> viagens;

    public Usuario(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public Usuario(String nome, String email, String senha, List<Viagem> viagens) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.viagens = viagens;
    }

   

}
