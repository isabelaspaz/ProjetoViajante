package com.projetoViajante.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoViajante.dto.UsuarioDTO;
import com.projetoViajante.entity.Usuario;
import com.projetoViajante.service.imp.UsuarioServiceImp;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioServiceImp usuarioService;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody UsuarioDTO usuarioDTO) {

        try {
            Usuario user = usuarioService.cadastrarUsuario(usuarioDTO);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarUsuario(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> usuario) {
        Optional<Usuario> user = usuarioService.autenticarUsuario(usuario.get("email"), usuario.get("senha"));

        if (user.isPresent()) {
            Usuario u = user.get();
            Map<String, Object> resposta = new HashMap<>();
            resposta.put("id", u.getId());
            resposta.put("nome", u.getNome());
            return ResponseEntity.ok(resposta);
        }

        return ResponseEntity.status(401).body("Credenciais inválidas");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario user = usuarioService.atualizarUsuario(id, usuarioDTO);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
