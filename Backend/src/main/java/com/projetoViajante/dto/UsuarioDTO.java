package com.projetoViajante.dto;

import java.util.List;

import com.projetoViajante.entity.Viagem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {

    private String nome;
    private String email;
    private String senha;
    
}
