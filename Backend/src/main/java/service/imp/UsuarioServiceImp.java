package service.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dto.UsuarioDTO;
import entity.Usuario;
import repository.UsuarioRepo;
import service.UsuarioService;
import util.HashUtil;
@Service
public class UsuarioServiceImp implements UsuarioService {

    @Autowired
    private UsuarioRepo usuarioRepo;
    @Override
    public Usuario cadastrarUsuario(UsuarioDTO usuarioDTO){
    if (usuarioRepo.findByEmail(usuarioDTO.getEmail()).isPresent()) {
        throw new IllegalArgumentException("E-mail já cadastrado.");
    }
    String senhaHash = HashUtil.gerarHashSHA256(usuarioDTO.getSenha());
    Usuario user = new Usuario(usuarioDTO.getNome(),usuarioDTO.getEmail(),senhaHash);
    Usuario savedUser = usuarioRepo.save(user);
    return savedUser;
}

    @Override
    public Optional<Usuario> buscarUsuario(Long id){
        return null;
    };
    @Override
    public Usuario atualizarUsuario(Long id, UsuarioDTO usuarioDTO){
        return null;
    };
    @Override
    public void deletarUsuario(Long id){};


}
