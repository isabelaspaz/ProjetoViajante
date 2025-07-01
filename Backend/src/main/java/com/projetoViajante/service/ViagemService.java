package com.projetoViajante.service;

import java.util.List;
import java.util.Optional;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Viagem;

public interface ViagemService {

    Viagem salvar(ViagemDTO viagemDTO);

    List<Viagem> listarViagem(Long usuario_id);

    Optional<Viagem> buscarPorId(Long id);

    void deletarViagem(Long id);

    Viagem atualizarViagem(Long idViagem, Long idUsuario, ViagemDTO viagemDTO);
}
