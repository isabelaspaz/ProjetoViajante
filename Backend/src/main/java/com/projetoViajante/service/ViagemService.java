package com.projetoViajante.service;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Viagem;

public interface ViagemService {
    Viagem salvar(ViagemDTO viagemDTO); 
}

