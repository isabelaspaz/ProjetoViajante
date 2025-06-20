package com.projetoViajante.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LugarDTO {

    private Long id;
    private Long cep;
    private String rua;
    private String bairro;
    private Long numero;
    private String complemento;
    private String cidade;
    private String estado;
    private String pais;
    private Long viagemId;  // só o id da viagem para ligar o lugar

    
}
