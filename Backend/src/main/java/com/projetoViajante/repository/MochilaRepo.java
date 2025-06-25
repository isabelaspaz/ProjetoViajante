package com.projetoViajante.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoViajante.entity.Mochila;

public interface MochilaRepo extends JpaRepository<Mochila, Long> {

    List<Mochila> findAllByViagemId(Long viagemId);
    
}
