package com.appventas.backend.repository;

import com.appventas.backend.model.ReporteDTO;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ReporteRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<ReporteDTO> obtenerTopProductos() {
        List<Object[]> resultados = entityManager
            .createNativeQuery("SELECT * FROM obtener_top_3_productos()")
            .getResultList();

        return resultados.stream().map(obj -> {
            ReporteDTO dto = new ReporteDTO();
            dto.setProductoId((Integer) obj[0]);
            dto.setProductoNombre((String) obj[1]);
            dto.setTotalVendido((Integer) obj[2]);
            return dto;
        }).collect(Collectors.toList());
    }

    public ReporteDTO obtenerClienteTop() {
        Object[] resultado = (Object[]) entityManager
            .createNativeQuery("SELECT * FROM cliente_top_ingresos()")
            .getSingleResult();

        ReporteDTO dto = new ReporteDTO();
        dto.setClienteId((Integer) resultado[0]);
        dto.setClienteNombre((String) resultado[1]);
        dto.setTotalIngresos((BigDecimal) resultado[2]);
        return dto;
    }

    public ReporteDTO obtenerIngresoUltimoMes() {
        BigDecimal ingreso = (BigDecimal) entityManager
            .createNativeQuery("SELECT ingreso_total_ultimo_mes()")
            .getSingleResult();

        ReporteDTO dto = new ReporteDTO();
        dto.setIngresoMensual(ingreso);
        return dto;
    }
}