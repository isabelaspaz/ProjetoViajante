package com.projetoViajante.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetoViajante.dto.DespesaDTO;
import com.projetoViajante.entity.Despesa;
import com.projetoViajante.service.imp.DespesaServiceImp;

@RestController
@RequestMapping("/despesa")
public class DespesaController {

    private final DespesaServiceImp despesaServiceImp;

    public DespesaController(DespesaServiceImp despesaServiceImp) {
        this.despesaServiceImp = despesaServiceImp;
    }

    @PostMapping
    public ResponseEntity<?> salvarDespesa(@RequestBody DespesaDTO despesaDTO) {
        try {
            Despesa despesa = despesaServiceImp.salvarDespesa(despesaDTO);
            return ResponseEntity.ok(despesa);
        } catch (Exception error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }

    // buscar pelo ID da Viagem
    @GetMapping("/{idViagem}")
    public ResponseEntity<List<Despesa>> buscarDespesa(@PathVariable Long idViagem) {

        List<Despesa> despesasList = despesaServiceImp.listarDespesa(idViagem);

        if (despesasList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(despesasList);
    }

    @PutMapping("/att/{idDespesa}")
    public ResponseEntity<?> attDespesa(
            @PathVariable("idDespesa") Long idDespesa,
            @RequestBody DespesaDTO despesaDTO) {

        try {
            Despesa despesaAtualizada = despesaServiceImp.atualizarDespesa(idDespesa, despesaDTO);
            return ResponseEntity.ok(despesaAtualizada);
        } catch (Exception error) {
            return ResponseEntity.status(403).body(error.getMessage());
        }
    }

    @DeleteMapping("/{idDespesa}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Long idDespesa){
        try {
            despesaServiceImp.deletarDespesa(idDespesa);
            return ResponseEntity.noContent().build();
        }  catch (RuntimeException error) {
            return ResponseEntity.badRequest().body(error.getMessage());
        }
    }

    /*
    @DeleteMapping("/{idDespesa}/usuario/{idUsuario}")
    public ResponseEntity<?> deletarDespesa(
            @PathVariable("idDespesa") Long idDespesa,
            @PathVariable("idUsuario") Long idUsuario) {
        try {
            despesaServiceImp.deletarDespesa(idDespesa, idUsuario);
            return ResponseEntity.noContent().build();
        } catch (Exception error) {
            return ResponseEntity.status(403).body(error.getMessage());
        }
    }
    */
}
