package com.projetoViajante.service;

import java.util.Optional;

import com.projetoViajante.dto.LugarDTO;
import com.projetoViajante.entity.Lugar;

public interface LugarService {

    Lugar salvarLugar (LugarDTO lugarDTO);

    Optional<Lugar> listarLugar (Long viagem_id);

   // Optional<Lugar> buscarLugarPorId (Long id);

    Lugar atualizarLugar (Long id, LugarDTO lugarDTO);

    void deletarLugar (Long id, Long viagem_id);
    
}
