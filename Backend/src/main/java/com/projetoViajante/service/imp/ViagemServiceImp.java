package com.projetoViajante.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.entity.Viagem;
import com.projetoViajante.repository.UsuarioRepo;
import com.projetoViajante.repository.ViagemRepo;
import com.projetoViajante.service.ViagemService;

@Service
public class ViagemServiceImp implements ViagemService {

    @Autowired
    private ViagemRepo viagemRepo;

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Override
    public Viagem salvar(ViagemDTO viagemDTO) {
        Long usuarioId = viagemDTO.getUsuario().getId();
        if (usuarioId == null) {
            throw new RuntimeException("Usuário inválido: ID é obrigatório");
        }
    
        Usuario usuario = usuarioRepo.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id " + usuarioId));
    
        Viagem viagem = new Viagem();
        viagem.setTitulo(viagemDTO.getTitulo());
        viagem.setDataPartida(viagemDTO.getDataPartida());
        viagem.setDataChegada(viagemDTO.getDataChegada());
        viagem.setUsuario(usuario);

        return viagemRepo.save(viagem);
    }

    @Override
    public List<Viagem> listarViagem() {
        return null;
    }

    @Override
    public void deletarViagem(Long id) {
    }

    @Override
    public Viagem AtualizarViagem(Long id, ViagemDTO viagemDTO) {
        return null;

    }
}
