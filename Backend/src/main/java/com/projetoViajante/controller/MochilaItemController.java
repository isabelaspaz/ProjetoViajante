package com.projetoViajante.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoViajante.dto.MochilaItemDTO;
import com.projetoViajante.entity.MochilaItem;
import com.projetoViajante.service.imp.MochilaItemServiceImp;
import com.projetoViajante.service.imp.MochilaServiceImp;

@RestController
@RequestMapping("/mochilaItem")
public class MochilaItemController {

    private final MochilaServiceImp mochilaServiceImp;

    private final MochilaItemServiceImp mochilaItemServiceImp;

    public MochilaItemController(MochilaItemServiceImp mochilaItemServiceImp, MochilaServiceImp mochilaServiceImp) {
        this.mochilaItemServiceImp = mochilaItemServiceImp;
        this.mochilaServiceImp = mochilaServiceImp;
    }

    @PostMapping
    public ResponseEntity<?> salvarMochilaItem(@RequestBody MochilaItemDTO mochilaItemDTO) {
        try {
            MochilaItem mochilaItem = mochilaItemServiceImp.salvarMochilaItem(mochilaItemDTO);
            return ResponseEntity.ok(mochilaItem);
        } catch (Exception error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }

    // buscar pelo ID da Mochila
    @GetMapping("/{idMochila}")
    public ResponseEntity<List<MochilaItem>> buscarMochilaItem(@PathVariable Long idMochila) {
        
        List<MochilaItem> mochilaItens = mochilaItemServiceImp.listarMochilaItem(idMochila);

        if (mochilaItens.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(mochilaItens);
    }

    @PutMapping("/att/{idMochilaItem}")
    public ResponseEntity<?> attMochilaItem(
            @PathVariable("idMochilaItem") Long idMochilaItem,
            @RequestBody MochilaItemDTO mochilaItemDTO) {

        try {
            MochilaItem mochilaItemAtt = mochilaItemServiceImp.atualizarMochilaItem(idMochilaItem, mochilaItemDTO);
            return ResponseEntity.ok(mochilaItemAtt);
        } catch (Exception error) {
            return ResponseEntity.status(403).body(error.getMessage());
        }
    }

}
