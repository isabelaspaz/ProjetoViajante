package com.projetoViajante.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.projetoViajante.dto.MochilaItemDTO;
import com.projetoViajante.entity.MochilaItem;

public class MochilaItemMapper {

    // Converte entidade para DTO
    public static MochilaItemDTO toDTO(MochilaItem entity) {
        if (entity == null) return null;

        return new MochilaItemDTO(
            entity.getId(),
            entity.getNome(),
            entity.getQuantidade(),
            entity.getDescricao(),
            entity.getMochila() // cuidado: mochila é um objeto completo
        );
    }

    // Converte DTO para entidade (sem definir viagem/usuario aqui)
    public static MochilaItem toEntity(MochilaItemDTO dto) {
        if (dto == null) return null;

        MochilaItem item = new MochilaItem();
        item.setId(dto.getId());
        item.setNome(dto.getNome());
        item.setQuantidade(dto.getQuantidade());
        item.setDescricao(dto.getDescricao());
        item.setMochila(dto.getMochila()); // cuidado: isso traz o objeto inteiro
        return item;
    }

    // Converte lista de entidades para lista de DTOs
    public static List<MochilaItemDTO> toDTOList(List<MochilaItem> entities) {
        return entities.stream()
            .map(MochilaItemMapper::toDTO)
            .collect(Collectors.toList());
    }

    // Converte lista de DTOs para lista de entidades
    public static List<MochilaItem> toEntityList(List<MochilaItemDTO> dtos) {
        return dtos.stream()
            .map(MochilaItemMapper::toEntity)
            .collect(Collectors.toList());
    }
}
