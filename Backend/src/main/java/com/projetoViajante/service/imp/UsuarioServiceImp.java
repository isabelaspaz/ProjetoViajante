package com.projetoViajante.service.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoViajante.dto.UsuarioDTO;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.mapper.UsuarioMapper;
import com.projetoViajante.repository.UsuarioRepo;
import com.projetoViajante.service.UsuarioService;
import com.projetoViajante.util.HashUtil;

@Service
public class UsuarioServiceImp implements UsuarioService {

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Autowired
    private UsuarioMapper usuarioMapper;

    @Override

    public Usuario cadastrarUsuario(UsuarioDTO usuarioDTO) {

        System.out.println("🔵 [SERVICE] Iniciando cadastro de usuário...");
        System.out.println("📥 [SERVICE] Dados recebidos: " + usuarioDTO);

        if (usuarioRepo.findByEmail(usuarioDTO.getEmail()).isPresent()) {
            System.out.println("⚠️ [SERVICE] E-mail já cadastrado: " + usuarioDTO.getEmail());
            throw new IllegalArgumentException("E-mail já cadastrado.");
        }

        String senhaHash = HashUtil.gerarHashSHA256(usuarioDTO.getSenha());
        usuarioDTO.setSenha(senhaHash);
        System.out.println("🔐 [SERVICE] Senha criptografada: " + senhaHash);

        Usuario usuario = usuarioMapper.toEntity(usuarioDTO);
        System.out.println("🛠️ [SERVICE] Mapeado para entidade: " + usuario);

        Usuario savedUser = usuarioRepo.save(usuario);
        System.out.println("✅ [SERVICE] Usuário salvo com sucesso: " + savedUser);

        return savedUser;
    }

    @Override
    public Optional<Usuario> buscarUsuario(Long id) {
        return usuarioRepo.findById(id);
    }

    @Override
    public Usuario atualizarUsuario(Long id, UsuarioDTO usuarioDTO) {

        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id " + id));

        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());

        if (usuarioDTO.getNovaSenha() != null && !usuarioDTO.getNovaSenha().isBlank()) {
            String senhaHash = HashUtil.gerarHashSHA256(usuarioDTO.getNovaSenha());
            usuario.setSenha(senhaHash);
        }

        return usuarioRepo.save(usuario);
    }

    @Override
    public void deletarUsuario(Long id) {
        usuarioRepo.deleteById(id);
    }

    @Override
    public Optional<Usuario> autenticarUsuario(String email, String senha) {
        Optional<Usuario> userOpt = usuarioRepo.findByEmail(email);
        if (userOpt.isPresent()) {
            Usuario usuario = userOpt.get();
            String hashSenha = HashUtil.gerarHashSHA256(senha);
            if (usuario.getSenha().equals(hashSenha)) {
                return Optional.of(usuario);
            }
        }
        return Optional.empty();
    }
}
