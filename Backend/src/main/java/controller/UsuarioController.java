package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.UsuarioDTO;
import entity.Usuario;
import service.imp.UsuarioServiceImp;


@RestController
@RequestMapping("/teste")
public class UsuarioController {

    @Autowired
    private UsuarioServiceImp usuarioService;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody UsuarioDTO usuarioDTO){

        try {
            Usuario user = usuarioService.cadastrarUsuario(usuarioDTO);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    
    @GetMapping("/ping")
public ResponseEntity<String> ping() {
    return ResponseEntity.ok("pong");
}


}
