package com.projetoViajante.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DespesaDTO {

    private Long id;
    private String nome;
    private Long quantidade;
    private Long preco;
    private Long viagemId;
    private Long usuarioId;
    
}
