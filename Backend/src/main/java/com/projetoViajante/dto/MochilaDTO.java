package com.projetoViajante.dto;

import com.projetoViajante.entity.MochilaItem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MochilaDTO {

    private Long id;
    private String titulo;
    private Long pesoTotalAprox;
    private Long viagemId;
    private Long usuarioId;
    private MochilaItem mochilaItem;
    
}
