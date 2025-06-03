package com.projetoViajante.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoViajante.entity.Viagem;

public interface ViagemRepo extends JpaRepository<Viagem, Long> {

   // @Autowired
  //  public ViagemRepo viagemRepository;
    
    
}
