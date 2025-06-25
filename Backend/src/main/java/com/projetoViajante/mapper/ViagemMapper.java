package com.projetoViajante.mapper;

import org.springframework.stereotype.Component;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.entity.Viagem;

@Component
public class ViagemMapper {

    public Viagem toEntity(ViagemDTO dto) {
        Viagem viagem = new Viagem();
        viagem.setTitulo(dto.getTitulo());
        viagem.setDataPartida(dto.getDataPartida());
        viagem.setDataChegada(dto.getDataChegada());
        viagem.setCep(dto.getCep());
        viagem.setRua(dto.getRua());
        viagem.setBairro(dto.getBairro());
        viagem.setNumero(dto.getNumero());
        viagem.setCidade(dto.getCidade());
        viagem.setEstado(dto.getEstado());

        if (dto.getUsuarioId() != null) {
            Usuario usuario = new Usuario();
            usuario.setId(dto.getUsuarioId());
            viagem.setUsuario(usuario);
        }

        return viagem;
    }

    public ViagemDTO toDTO(Viagem entity) {

        ViagemDTO dto = new ViagemDTO(entity.getId(), entity.getTitulo(), entity.getDataPartida(),
                entity.getDataChegada(), entity.getCep(), entity.getRua(), entity.getBairro(), entity.getNumero(),
                entity.getCidade(), entity.getEstado(), entity.getUsuario().getId());

        /*
        if (entity.getUsuario() != null) {
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setId(entity.getUsuario().getId());
            dto.setUsuario(usuarioDTO);
        }
        */

        return dto;
    }

}
