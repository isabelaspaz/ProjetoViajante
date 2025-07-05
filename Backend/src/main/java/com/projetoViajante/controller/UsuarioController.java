package com.projetoViajante.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    private final UsuarioServiceImp usuarioServiceImp;

    public UsuarioController(UsuarioServiceImp usuarioServiceImp) {
        this.usuarioServiceImp = usuarioServiceImp;
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody UsuarioDTO usuarioDTO) {
        System.out.println("\n\n🔥🔥🔥 ENTROU NO MÉTODO salvar() 🔥🔥🔥\n\n");
        System.out.println("🔵 [DEBUG] Requisição recebida em /usuario (POST)");
        System.out.println("📥 [DEBUG] Dados recebidos: " + usuarioDTO);

        try {
            Usuario user = usuarioServiceImp.cadastrarUsuario(usuarioDTO);
            System.out.println("✅ [DEBUG] Usuário cadastrado com sucesso: " + user);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            System.out.println("⚠️ [DEBUG] Erro de validação: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            System.out.println("❌ [DEBUG] Erro inesperado: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erro interno ao cadastrar usuário.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioServiceImp.buscarUsuario(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> usuario) {
        Optional<Usuario> user = usuarioServiceImp.autenticarUsuario(usuario.get("email"), usuario.get("senha"));

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
            Usuario user = usuarioServiceImp.atualizarUsuario(id, usuarioDTO);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable long id) {
        try {
            usuarioServiceImp.deletarUsuario(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
