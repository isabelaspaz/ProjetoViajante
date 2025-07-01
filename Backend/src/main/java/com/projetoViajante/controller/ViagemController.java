package com.projetoViajante.controller;

import java.util.List;

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

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Viagem;
import com.projetoViajante.service.imp.ViagemServiceImp;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/viagem")
public class ViagemController {

    private final ViagemServiceImp viagemServiceImp;

    public ViagemController(ViagemServiceImp viagemServiceImp) {
        this.viagemServiceImp = viagemServiceImp;
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody ViagemDTO viagemDTO) {
        try {
            Viagem viagem = viagemServiceImp.salvar(viagemDTO);
            return ResponseEntity.ok(viagem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Viagem> buscarViagem(@PathVariable Long id) {
        return viagemServiceImp.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Viagem>> listarViagensPorUsuario(@PathVariable Long usuarioId) {
        List<Viagem> viagens = viagemServiceImp.listarViagem(usuarioId);
        if (viagens.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(viagens);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarViagem(@PathVariable Long id) {
        try {
            viagemServiceImp.deletarViagem(id);
            return ResponseEntity.ok("Viagem deletada com sucesso.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{idViagem}/usuario/{idUsuario}")
    public ResponseEntity<?> atualizarViagem(
            @PathVariable Long idViagem,
            @PathVariable Long idUsuario,
            @RequestBody ViagemDTO viagemDTO) {

        try {
            Viagem viagemAtualizada = viagemServiceImp.atualizarViagem(idViagem, idUsuario, viagemDTO);
            return ResponseEntity.ok(viagemAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
}
