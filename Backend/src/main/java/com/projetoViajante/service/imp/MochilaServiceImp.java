package com.projetoViajante.service.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoViajante.dto.MochilaDTO;
import com.projetoViajante.entity.Mochila;
import com.projetoViajante.entity.Viagem;
import com.projetoViajante.repository.MochilaRepo;
import com.projetoViajante.repository.ViagemRepo;
import com.projetoViajante.service.MochilaService;

@Service
public class MochilaServiceImp implements MochilaService {

    @Autowired
    private MochilaRepo mochilaRepo;

    @Autowired
    private ViagemRepo viagemRepo;

    @Override
    public Mochila salvarMochila(MochilaDTO mochilaDTO) {

        if (mochilaDTO.getViagemId() == null) {
            throw new RuntimeException("Viagem inválida: ID é obrigatório");
        }

        Viagem viagem = viagemRepo.findById(mochilaDTO.getViagemId())
                .orElseThrow(() -> new RuntimeException("Viagem não encontrada com id " + mochilaDTO.getViagemId()));

        Mochila mochila = new Mochila();
        mochila.setTitulo(mochilaDTO.getTitulo());
        mochila.setPesoTotalAprox(mochilaDTO.getPesoTotalAprox());
        mochila.setViagem(viagem);
        mochila.setUsuario(viagem.getUsuario());

        return mochilaRepo.save(mochila);
    }

    @Override
    public Optional<Mochila> listarMochila(Long viagem_id) {
        return mochilaRepo.findByViagemId(viagem_id);
    }

    @Override
    public Mochila atualizarMochila(Long idMochila, MochilaDTO mochilaDTO) {

        Mochila mochila = mochilaRepo.findById(idMochila)
                .orElseThrow(() -> new RuntimeException("Mochila não encontrada com o ID: " + idMochila));

        mochila.setTitulo(mochilaDTO.getTitulo());
        mochila.setPesoTotalAprox(mochilaDTO.getPesoTotalAprox());

        return mochilaRepo.save(mochila);
    }

    @Override
    public void deletarMochila(Long id, Long mochila_id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deletarMochila'");
    }

}
