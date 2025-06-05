package com.projetoViajante.service;

import java.util.List;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Viagem;

public interface ViagemService {
    Viagem salvar(ViagemDTO viagemDTO); 

    List<Viagem> listarViagem();

    void deletarViagem(Long id);

    Viagem AtualizarViagem(Long id, ViagemDTO viagemDTO);

}

