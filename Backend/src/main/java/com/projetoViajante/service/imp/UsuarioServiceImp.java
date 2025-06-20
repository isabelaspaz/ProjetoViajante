package com.projetoViajante.service.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoViajante.dto.UsuarioDTO;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.service.UsuarioService;
import com.projetoViajante.util.HashUtil;

@Service
public class UsuarioServiceImp implements UsuarioService {

    @Autowired
    private com.projetoViajante.repository.UsuarioRepo usuarioRepo;

    @Override
    public Usuario cadastrarUsuario(UsuarioDTO usuarioDTO) {
        if (usuarioRepo.findByEmail(usuarioDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }
        String senhaHash = HashUtil.gerarHashSHA256(usuarioDTO.getSenha());
        Usuario user = new Usuario(usuarioDTO.getNome(), usuarioDTO.getEmail(), senhaHash);
        Usuario savedUser = usuarioRepo.save(user);
        return savedUser;
    }

    @Override
    public Optional<Usuario> buscarUsuario(Long id) {
        return usuarioRepo.findById(id);
    }

    ;

    @Override
    public Usuario atualizarUsuario(Long id, UsuarioDTO usuarioDTO) {
        Usuario user = usuarioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id " + id));

        user.setNome(usuarioDTO.getNome());
        user.setEmail(usuarioDTO.getEmail());

        return usuarioRepo.save(user);
    }

    @Override
    public void deletarUsuario(Long id) {
    };
    
    @Override
    public Optional<Usuario> autenticarUsuario(String email, String senha) {
        Optional<Usuario> userOpt = usuarioRepo.findByEmail(email);
        if (userOpt.isPresent()) {
            Usuario user = userOpt.get();
            String hashSenha = HashUtil.gerarHashSHA256(senha);
            if (user.getSenha().equals(hashSenha)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

}
