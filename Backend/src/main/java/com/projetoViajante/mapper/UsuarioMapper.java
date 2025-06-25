package com.projetoViajante.mapper;

import org.springframework.stereotype.Component;

import com.projetoViajante.dto.UsuarioDTO;
import com.projetoViajante.entity.Usuario;

@Component
public class UsuarioMapper {

    public Usuario toEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(dto.getSenha());

        return usuario;
    }

    public UsuarioDTO toDTO(Usuario entity) {

        UsuarioDTO dto = new UsuarioDTO(entity.getId(), entity.getNome(), entity.getEmail(), entity.getSenha());

        return dto;
    }
    
}
