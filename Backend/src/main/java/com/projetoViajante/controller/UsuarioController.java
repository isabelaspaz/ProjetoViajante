package com.projetoViajante.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoViajante.dto.UsuarioDTO;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.service.imp.UsuarioServiceImp;




@RestController
@RequestMapping("/usuario")
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
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id){
        return usuarioService.buscarUsuario(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/ping")
public ResponseEntity<String> ping() {
    return ResponseEntity.ok("pong");
}


}
