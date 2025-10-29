package com.appventas.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appventas.backend.model.ReporteDTO;
import com.appventas.backend.model.ResumenReportesDTO;
import com.appventas.backend.repository.ReporteRepository;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    private final ReporteRepository reporteRepository;

    public ReporteController(ReporteRepository reporteRepository) {
        this.reporteRepository = reporteRepository;
    }

    // Endpoint para obtener los 3 productos más vendidos
    @GetMapping("/top-productos")
    public List<ReporteDTO> topProductos() {
        return reporteRepository.obtenerTopProductos();
    }

    // Endpoint para obtener el cliente que más ingresos ha generado
    @GetMapping("/cliente-top")
    public ReporteDTO clienteTop() {
        return reporteRepository.obtenerClienteTop();
    }

    // Endpoint para obtener el ingreso total de los últimos 30 días
    @GetMapping("/ingreso-ultimo-mes")
    public ReporteDTO ingresoUltimoMes() {
        return reporteRepository.obtenerIngresoUltimoMes();
    }

    @GetMapping("/resumen")
    public ResumenReportesDTO resumenReportes() {
    ResumenReportesDTO resumen = new ResumenReportesDTO();
    resumen.setTopProductos(reporteRepository.obtenerTopProductos());
    resumen.setClienteTop(reporteRepository.obtenerClienteTop());
    resumen.setIngresoUltimoMes(reporteRepository.obtenerIngresoUltimoMes().getIngresoMensual());
    return resumen;
}
}