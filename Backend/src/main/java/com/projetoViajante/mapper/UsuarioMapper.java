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
        usuario.setSenha(dto.getSenha()); // usado no cadastro
        return usuario;
    }

    public UsuarioDTO toDTO(Usuario entity) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setEmail(entity.getEmail());
        dto.setSenha(entity.getSenha()); // usado para autenticação ou exibição, depende da necessidade
        // dto.setNovaSenha(null); -> opcional, geralmente não preenche novaSenha no retorno
        return dto;
    }
}
