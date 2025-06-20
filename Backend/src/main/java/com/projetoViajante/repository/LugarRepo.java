package com.projetoViajante.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoViajante.entity.Lugar;


public interface LugarRepo extends JpaRepository<Lugar, Long> {

    Optional<Lugar> findByViagemId (Long viagemID);
    
}
