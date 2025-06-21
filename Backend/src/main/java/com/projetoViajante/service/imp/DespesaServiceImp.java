package com.projetoViajante.service.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoViajante.dto.DespesaDTO;
import com.projetoViajante.entity.Despesa;
import com.projetoViajante.entity.Viagem;
import com.projetoViajante.repository.DespesaRepo;
import com.projetoViajante.repository.ViagemRepo;
import com.projetoViajante.service.DespesaService;

@Service
public class DespesaServiceImp implements DespesaService {

    @Autowired
    private DespesaRepo despesaRepo;

    @Autowired
    private ViagemRepo viagemRepo;

    @Override
    public Despesa salvarDespesa(DespesaDTO despesaDTO) {

        if (despesaDTO.getViagemId() == null) {
            throw new RuntimeException("Viagem inválida: ID é obrigatório");
        }

        Viagem viagem = viagemRepo.findById(despesaDTO.getViagemId())
                .orElseThrow(() -> new RuntimeException("Viagem não encontrada com id " + despesaDTO.getViagemId()));

        Despesa despesa = new Despesa();
        despesa.setNome(despesaDTO.getNome());
        despesa.setQuantidade(despesaDTO.getQuantidade());
        despesa.setPreco(despesaDTO.getPreco());
        despesa.setViagem(viagem);
        despesa.setUsuario(viagem.getUsuario());

        return despesaRepo.save(despesa);
    }

    @Override
    public List<Despesa> listarDespesa(Long viagem_id) {
        return despesaRepo.findByViagemId(viagem_id);
    }

    @Override
    public Despesa atualizarDespesa(Long idDespesa, DespesaDTO despesaDTO) {

        Despesa despesa = despesaRepo.findById(idDespesa)
                .orElseThrow(() -> new RuntimeException("Despesa não encontrada com o ID: " + idDespesa));

        despesa.setNome(despesaDTO.getNome());
        despesa.setQuantidade(despesaDTO.getQuantidade());
        despesa.setPreco(despesaDTO.getPreco());

        return despesaRepo.save(despesa);
    }

    @Override
    public void deletarDespesa(Long id, Long despesa_id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}
