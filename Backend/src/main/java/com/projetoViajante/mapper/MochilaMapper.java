package com.projetoViajante.mapper;

import org.springframework.stereotype.Component;

import com.projetoViajante.dto.MochilaDTO;
import com.projetoViajante.entity.Mochila;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.entity.Viagem;

@Component
public class MochilaMapper {

    public Mochila toEntity(MochilaDTO dto) {
        Mochila mochila = new Mochila();
        mochila.setTitulo(dto.getTitulo());
        mochila.setPesoTotalAprox(dto.getPesoTotalAprox());

        if (dto.getViagemId() != null) {
            Viagem viagem = new Viagem();
            viagem.setId(dto.getViagemId());
            mochila.setViagem(viagem);
        }

        if (dto.getUsuarioId() != null) {
            Usuario usuario = new Usuario();
            usuario.setId(dto.getUsuarioId());
            mochila.setUsuario(usuario);
        }

        return mochila;
    }

    public MochilaDTO toDTO(Mochila entity) {
        MochilaDTO dto = new MochilaDTO();
        dto.setId(entity.getId());
        dto.setTitulo(entity.getTitulo());
        dto.setPesoTotalAprox(entity.getPesoTotalAprox());

        if (entity.getViagem() != null) {
            dto.setViagemId(entity.getViagem().getId());
        }

        if (entity.getUsuario() != null) {
            dto.setUsuarioId(entity.getUsuario().getId());
        }

        if (entity.getMochilaItens() != null && !entity.getMochilaItens().isEmpty()) {
            dto.setMochilaItem(entity.getMochilaItens().get(0)); 
        }

        return dto;
    }
}