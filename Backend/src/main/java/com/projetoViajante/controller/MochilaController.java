package com.projetoViajante.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projetoViajante.dto.MochilaDTO;
import com.projetoViajante.entity.Mochila;
import com.projetoViajante.service.imp.MochilaServiceImp;
import com.projetoViajante.service.imp.ViagemServiceImp;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/mochila")
public class MochilaController {

    private final ViagemServiceImp viagemServiceImp;
    private final MochilaServiceImp mochilaServiceImp;

    public MochilaController(MochilaServiceImp mochilaServiceImp, ViagemServiceImp viagemServiceImp) {
        this.mochilaServiceImp = mochilaServiceImp;
        this.viagemServiceImp = viagemServiceImp;
    }

    @PostMapping
    public ResponseEntity<?> salvarMochila(@RequestBody MochilaDTO mochilaDTO) {
        try {
            Mochila mochila = mochilaServiceImp.salvarMochila(mochilaDTO);
            return ResponseEntity.ok(mochila);
        } catch (Exception error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }

    @GetMapping("/{idViagem}")
    public ResponseEntity<List<Mochila>> buscarMochilas(@PathVariable Long idViagem) {
        List<Mochila> mochilas = mochilaServiceImp.listarMochila(idViagem);
        return ResponseEntity.ok(mochilas);
    }

    @PutMapping("/att/{idMochila}")
    public ResponseEntity<?> attMochila(
            @PathVariable("idMochila") Long idMochila,
            @RequestBody MochilaDTO mochilaDTO) {
        try {
            Mochila mochilaAtualizada = mochilaServiceImp.atualizarMochila(idMochila, mochilaDTO);
            return ResponseEntity.ok(mochilaAtualizada);
        } catch (Exception error) {
            return ResponseEntity.status(403).body(error.getMessage());
        }
    }

    @DeleteMapping("/{idMochila}")
    public ResponseEntity<?> deletarMochila(@PathVariable Long idMochila) {
        try {
            mochilaServiceImp.deletarMochila(idMochila);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }
}
