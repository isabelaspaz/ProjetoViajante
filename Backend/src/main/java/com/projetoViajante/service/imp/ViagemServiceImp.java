package com.projetoViajante.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetoViajante.dto.ViagemDTO;
import com.projetoViajante.entity.Viagem;
import com.projetoViajante.repository.ViagemRepo;
import com.projetoViajante.service.ViagemService;

@Service
public class ViagemServiceImp implements ViagemService {

    @Autowired
    private ViagemRepo viagemRepo;

    Viagem salvar(ViagemDTO viagemDTO){
            return null; 
};
}
