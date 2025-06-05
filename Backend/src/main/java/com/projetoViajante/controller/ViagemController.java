package com.projetoViajante.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Viagem;
import com.projetoViajante.service.imp.ViagemServiceImp;
@RestController
@RequestMapping("/viagem")
public class ViagemController {

    private final ViagemServiceImp viagemServiceImp;

    public ViagemController(ViagemServiceImp viagemServiceImp) {
        this.viagemServiceImp = viagemServiceImp;
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody ViagemDTO viagemDTO){
        try {
            Viagem viagem = viagemServiceImp.salvar(viagemDTO);
            return ResponseEntity.ok(viagem);
        } catch (RuntimeException e) {
            // Captura RuntimeException e subclasses, pode ajustar se quiser
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

