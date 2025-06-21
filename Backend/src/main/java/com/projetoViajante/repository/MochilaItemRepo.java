package com.projetoViajante.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoViajante.entity.MochilaItem;

public interface MochilaItemRepo extends JpaRepository<MochilaItem, Long> {

    List<MochilaItem> findByMochilaId (Long mochilaID);
    
}
