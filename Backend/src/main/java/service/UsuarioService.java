package service;

import dto.UsuarioDTO;
import entity.Usuario;

import java.util.Optional;

public interface UsuarioService {

    Usuario cadastrarUsuario(UsuarioDTO usuarioDTO);

    Optional<Usuario> buscarUsuario(Long id);

    Usuario atualizarUsuario(Long id, UsuarioDTO usuarioDTO);

    void deletarUsuario(Long id);
}
