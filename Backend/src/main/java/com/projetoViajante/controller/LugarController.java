package com.projetoViajante.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoViajante.dto.LugarDTO;
import com.projetoViajante.entity.Lugar;
import com.projetoViajante.service.imp.LugarServiceImp;



@RestController
@RequestMapping("/lugar")
public class LugarController {

    private final LugarServiceImp lugarServiceImp;
    public LugarController(LugarServiceImp lugarServiceImp) {
        this.lugarServiceImp = lugarServiceImp;
    }

    @PostMapping
    public ResponseEntity<?> salvarLugar(@RequestBody LugarDTO lugarDTO) {
        try {
            Lugar lugar = lugarServiceImp.salvarLugar(lugarDTO);
            return ResponseEntity.ok(lugar);
        } catch (Exception error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }

    // buscar pelo ID do User
    @GetMapping("/{id}")
    public ResponseEntity<Lugar> buscarLugar(@PathVariable Long id) {
        return lugarServiceImp.listarLugar(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/att/{idLugar}")
    public ResponseEntity<?> attLugar(
        @PathVariable("idLugar") Long idLugar, 
        @RequestBody LugarDTO lugarDTO) {

            try {
                Lugar lugarAtualizado = lugarServiceImp.atualizarLugar(idLugar, lugarDTO);
                return ResponseEntity.ok(lugarAtualizado);
            } catch (Exception error) {
                return ResponseEntity.status(403).body(error.getMessage());
            }
    }
    
}
