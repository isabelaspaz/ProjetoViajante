package com.projetoViajante.service;



import java.util.Optional;

import com.projetoViajante.dto.UsuarioDTO;
import com.projetoViajante.entity.Usuario;

public interface UsuarioService {

    Usuario cadastrarUsuario(UsuarioDTO usuarioDTO);

    Optional<Usuario> buscarUsuario(Long id);

    Usuario atualizarUsuario(Long id, UsuarioDTO usuarioDTO);

    void deletarUsuario(Long id);
}
