package com.projetoViajante.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoViajante.entity.Mochila;

public interface MochilaRepo extends JpaRepository<Mochila, Long> {

    Optional<Mochila> findByViagemId (Long viagemID);
    
}
