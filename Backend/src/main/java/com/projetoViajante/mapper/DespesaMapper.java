package com.projetoViajante.mapper;

import org.springframework.stereotype.Component;

import com.projetoViajante.dto.DespesaDTO;
import com.projetoViajante.entity.Despesa;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.entity.Viagem;

@Component
public class DespesaMapper {

    public Despesa toEntity(DespesaDTO dto) {
        
        Despesa despesa = new Despesa();
        despesa.setNome(dto.getNome());
        despesa.setPreco(dto.getPreco());

        if (dto.getViagemId() != null) {
            Viagem viagem = new Viagem();
            viagem.setId(dto.getViagemId());
            despesa.setViagem(viagem);
        }

        if (dto.getUsuarioId() != null) {
            Usuario usuario = new Usuario();
            usuario.setId(dto.getUsuarioId());
            despesa.setUsuario(usuario);
        }

        return despesa;
    }

    public DespesaDTO toDTO(Despesa entity) {

        DespesaDTO dto = new DespesaDTO(entity.getId(), entity.getNome(), entity.getPreco(),
                entity.getViagem().getId(), entity.getUsuario().getId(), null);

        return dto;
    }
}
