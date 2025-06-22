package com.projetoViajante.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projetoViajante.entity.Viagem;

public interface ViagemRepo extends JpaRepository<Viagem, Long> {

    List<Viagem> findByUsuarioId(Long usuarioId);

}
