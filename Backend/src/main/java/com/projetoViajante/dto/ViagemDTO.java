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
    private Long cep;
    private String rua;
    private String bairro;
    private Long numero;
    private String cidade;
    private String estado;
    private Long usuarioId; 

    public ViagemDTO(String titulo, String dataPartida, String dataChegada) {
        this.titulo = titulo;
        this.dataPartida = dataPartida;
        this.dataChegada = dataChegada;
    }
}
