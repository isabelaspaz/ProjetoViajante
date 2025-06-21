package com.projetoViajante.service;

import java.util.List;

import com.projetoViajante.dto.MochilaItemDTO;
import com.projetoViajante.entity.MochilaItem;

public interface MochilaItemService {

    MochilaItem salvarMochilaItem (MochilaItemDTO mochilaItemDTO);

    List<MochilaItem> listarMochilaItem (Long mochila_id);

    MochilaItem atualizarMochilaItem (Long id, MochilaItemDTO mochilaItemDTO);

    void deletarMochilaItem (Long id, Long mochilaItem_id);
}
