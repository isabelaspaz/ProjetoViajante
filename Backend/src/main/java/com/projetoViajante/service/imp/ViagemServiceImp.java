package com.projetoViajante.service.imp;

import java.util.List;
import java.util.Optional;

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
    Long usuarioId = viagemDTO.getUsuarioID();
    if (usuarioId == null) {
        throw new RuntimeException("Usuário inválido: ID é obrigatório");
    }

    Usuario usuario = usuarioRepo.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id " + usuarioId));


    Viagem viagem = new Viagem();
    viagem.setTitulo(viagemDTO.getTitulo());
    viagem.setDataPartida(viagemDTO.getDataPartida());
    viagem.setDataChegada(viagemDTO.getDataChegada());
    viagem.setBairro(viagemDTO.getBairro());
    viagem.setCep(viagemDTO.getCep());
    viagem.setRua(viagemDTO.getRua());
    viagem.setNumero(viagemDTO.getNumero());
    viagem.setCidade(viagemDTO.getCidade());
    viagem.setEstado(viagemDTO.getEstado());
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
    public void deletarViagem(Long id, Long usuario_id) {
        Optional<Viagem> optionalViagem = viagemRepo.findById(id);

        if (optionalViagem.isEmpty()) {
            throw new RuntimeException("Viagem não encontrada com id " + id);
        }

        Viagem viagem = optionalViagem.get();

        if (!viagem.getUsuario().getId().equals(usuario_id)) {
            throw new RuntimeException("Usuário não tem permissão para deletar esta viagem.");
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
