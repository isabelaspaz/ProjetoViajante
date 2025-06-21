package com.projetoViajante.service;

import java.util.List;

import com.projetoViajante.dto.DespesaDTO;
import com.projetoViajante.entity.Despesa;

public interface DespesaService {

    Despesa salvarDespesa (DespesaDTO despesaDTO);

    List<Despesa> listarDespesa (Long viagem_id);

    Despesa atualizarDespesa (Long idDespesa, DespesaDTO despesaDTO);

    void deletarDespesa (Long id, Long despesa_id);
    
}
