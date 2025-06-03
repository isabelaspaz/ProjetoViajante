package com.projetoViajante.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViagemDTO {

    private Long id;
    private String titulo;
    private String dataPartida;
    private String dataChegada;
    private UsuarioDTO usuario;
}
