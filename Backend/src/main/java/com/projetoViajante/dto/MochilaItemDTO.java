package com.projetoViajante.dto;

import com.projetoViajante.entity.Mochila;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MochilaItemDTO {

    private Long id;
    private String nome;
    private Long quantidade;
    private String descricao;
    private Mochila mochila;
    
}
