package com.projetoViajante.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projetoViajante.entity.Viagem;

public interface ViagemRepo extends JpaRepository<Viagem, Long> {

    List<Viagem> findByUsuarioId(Long usuarioId);

    @Modifying
@Query("DELETE FROM Viagem v WHERE v.id = :id AND v.usuario.id = :usuarioId")
void deletarPorIdEUsuario(@Param("id") Long id, @Param("usuarioId") Long usuarioId);

}
