package com.projetoViajante.mapper;

import org.springframework.stereotype.Component;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.entity.Viagem;

@Component
public class ViagemMapper {

    // Método para converter de ViagemDTO para Viagem (entidade)
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

        // Verificando se o usuário foi passado no DTO e atribuindo à entidade
        if (dto.getUsuarioId() != null) {
            Usuario usuario = new Usuario();
            usuario.setId(dto.getUsuarioId());
            viagem.setUsuario(usuario);
        }

        return viagem;
    }

    // Método para converter de Viagem (entidade) para ViagemDTO
    public ViagemDTO toDTO(Viagem entity) {
        // Criando o DTO e preenchendo com os dados da entidade
        ViagemDTO dto = new ViagemDTO(
            entity.getId(),
            entity.getTitulo(),
            entity.getDataPartida(),
            entity.getDataChegada(),
            entity.getCep(),
            entity.getRua(),
            entity.getBairro(),
            entity.getNumero(),
            entity.getCidade(),
            entity.getEstado(),
            entity.getUsuario() != null ? entity.getUsuario().getId() : null
        );

        return dto;
    }
}
