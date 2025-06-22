package com.projetoViajante.service;

import java.util.Optional;

import com.projetoViajante.dto.MochilaDTO;
import com.projetoViajante.entity.Mochila;

public interface MochilaService {

    Mochila salvarMochila (MochilaDTO mochilaDTO);

    Optional<Mochila> listarMochila (Long mochila_id);

    Mochila atualizarMochila (Long id, MochilaDTO mochilaDTO);

    void deletarMochila (Long idMochila);
    //void deletarMochila (Long id, Long mochila_id);
    
}
