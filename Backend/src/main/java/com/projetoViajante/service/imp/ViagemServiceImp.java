package com.projetoViajante.service.imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Viagem;
import com.projetoViajante.mapper.ViagemMapper;
import com.projetoViajante.repository.UsuarioRepo;
import com.projetoViajante.repository.ViagemRepo;
import com.projetoViajante.service.ViagemService;

import jakarta.transaction.Transactional;

@Service
public class ViagemServiceImp implements ViagemService {

    @Autowired
    private ViagemRepo viagemRepo;

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Autowired
    private ViagemMapper viagemMapper;

    @Override
    public Viagem salvar(ViagemDTO viagemDTO) {
        Long usuarioId = viagemDTO.getUsuarioId();
        if (usuarioId == null) {
            throw new RuntimeException("Usuário inválido: ID é obrigatório");
        }

        var usuario = usuarioRepo.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id " + usuarioId));

        Viagem viagem = viagemMapper.toEntity(viagemDTO);
        viagem.setUsuario(usuario);

        return viagemRepo.save(viagem);
    }

    @Override
    public List<Viagem> listarViagem(Long usuario_id) {
        return viagemRepo.findByUsuarioId(usuario_id);
    }

    @Override
    public Optional<Viagem> buscarPorId(Long id) {
        return viagemRepo.findById(id);
    }

    @Override
    @Transactional
    public void deletarViagem(Long id) {
        Viagem viagem = viagemRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Viagem não encontrada"));

        // Remove da lista do usuário para o orphanRemoval funcionar
        var usuario = viagem.getUsuario();
        if (usuario != null) {
            usuario.getViagens().remove(viagem);
            usuarioRepo.save(usuario);
        }

        viagemRepo.deleteById(id);
    }

    @Override
    public Viagem atualizarViagem(Long idViagem, Long idUsuario, ViagemDTO viagemDTO) {
        Viagem viagem = viagemRepo.findById(idViagem)
                .orElseThrow(() -> new RuntimeException("Viagem não encontrada com id " + idViagem));

        if (!viagem.getUsuario().getId().equals(idUsuario)) {
            throw new RuntimeException("Usuário não tem permissão para atualizar esta viagem.");
        }

        viagem.setTitulo(viagemDTO.getTitulo());
        viagem.setDataPartida(viagemDTO.getDataPartida());
        viagem.setDataChegada(viagemDTO.getDataChegada());

        return viagemRepo.save(viagem);
    }
}
