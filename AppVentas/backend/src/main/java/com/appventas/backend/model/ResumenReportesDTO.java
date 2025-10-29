package com.appventas.backend.model;

import java.math.BigDecimal;
import java.util.List;

public class ResumenReportesDTO {

    private List<ReporteDTO> topProductos;
    private ReporteDTO clienteTop;
    private BigDecimal ingresoUltimoMes;

    // Getter y Setter para topProductos
    public List<ReporteDTO> getTopProductos() {
        return topProductos;
    }

    public void setTopProductos(List<ReporteDTO> topProductos) {
        this.topProductos = topProductos;
    }

    // Getter y Setter para clienteTop
    public ReporteDTO getClienteTop() {
        return clienteTop;
    }

    public void setClienteTop(ReporteDTO clienteTop) {
        this.clienteTop = clienteTop;
    }

    // Getter y Setter para ingresoUltimoMes
    public BigDecimal getIngresoUltimoMes() {
        return ingresoUltimoMes;
    }

    public void setIngresoUltimoMes(BigDecimal ingresoUltimoMes) {
        this.ingresoUltimoMes = ingresoUltimoMes;
    }
}