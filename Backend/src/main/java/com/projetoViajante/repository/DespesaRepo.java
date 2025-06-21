package com.projetoViajante.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoViajante.entity.Despesa;

public interface DespesaRepo extends JpaRepository<Despesa, Long> {
    
    List<Despesa> findByViagemId (Long viagemID);
}
