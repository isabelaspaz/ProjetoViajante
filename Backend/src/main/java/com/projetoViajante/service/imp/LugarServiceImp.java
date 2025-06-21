package com.projetoViajante.service.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoViajante.dto.LugarDTO;
import com.projetoViajante.entity.Lugar;
import com.projetoViajante.entity.Viagem;
import com.projetoViajante.repository.LugarRepo;
import com.projetoViajante.repository.ViagemRepo;
import com.projetoViajante.service.LugarService;

@Service
public class LugarServiceImp implements LugarService {

    @Autowired
    private LugarRepo lugarRepo;

    @Autowired
    private ViagemRepo viagemRepo;

    @Override
    public Lugar salvarLugar(LugarDTO lugarDTO) {

        if (lugarDTO.getViagemId() == null) {
            throw new RuntimeException("Viagem inválida: ID é obrigatório");
        }

        Viagem viagem = viagemRepo.findById(lugarDTO.getViagemId())
                .orElseThrow(() -> new RuntimeException("Viagem não encontrada com id " + lugarDTO.getViagemId()));

        Lugar lugar = new Lugar();
        lugar.setCep(lugarDTO.getCep());
        lugar.setRua(lugarDTO.getRua());
        lugar.setBairro(lugarDTO.getBairro());
        lugar.setNumero(lugarDTO.getNumero());
        lugar.setComplemento(lugarDTO.getComplemento());
        lugar.setCidade(lugarDTO.getCidade());
        lugar.setEstado(lugarDTO.getEstado());
        lugar.setPais(lugarDTO.getPais());
        lugar.setViagem(viagem);
        lugar.setUsuario(viagem.getUsuario());

        return lugarRepo.save(lugar);
    }

    @Override
    public Optional<Lugar> listarLugar(Long viagem_id) {
        return lugarRepo.findByViagemId(viagem_id);
    }

    /*
    @Override
    public Optional<Lugar> buscarLugarPorId(Long id) {
        // TODO Auto-generated method stub
        return Optional.empty();
    }
     */
    
    @Override
    public Lugar atualizarLugar(Long idLugar, LugarDTO lugarDTO) {
        Lugar lugar = lugarRepo.findById(idLugar)
            .orElseThrow(() -> new RuntimeException("Lugar não encontrado com o ID: " + idLugar));
       
        lugar.setCep(lugarDTO.getCep());
        lugar.setRua(lugarDTO.getRua());
        lugar.setBairro(lugarDTO.getBairro());
        lugar.setNumero(lugarDTO.getNumero());
        lugar.setComplemento(lugarDTO.getComplemento());
        lugar.setCidade(lugarDTO.getCidade());
        lugar.setEstado(lugarDTO.getEstado());
        lugar.setPais(lugarDTO.getPais());
        
        return lugarRepo.save(lugar);
    }

    @Override
    public void deletarLugar(Long id, Long viagem_id) {
        // TODO Auto-generated method stub

    }

}
