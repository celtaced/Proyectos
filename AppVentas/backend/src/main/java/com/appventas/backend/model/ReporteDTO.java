package com.appventas.backend.model;

import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonInclude;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReporteDTO {

    // Para productos
    private Integer productoId;
    private String productoNombre;
    private Integer totalVendido;

    // Para clientes
    private Integer clienteId;
    private String clienteNombre;
    private BigDecimal totalIngresos;

    // Para ingreso mensual
    private BigDecimal ingresoMensual;

    // Getters y setters

    public Integer getProductoId() {
        return productoId;
    }

    public void setProductoId(Integer productoId) {
        this.productoId = productoId;
    }

    public String getProductoNombre() {
        return productoNombre;
    }

    public void setProductoNombre(String productoNombre) {
        this.productoNombre = productoNombre;
    }

    public Integer getTotalVendido() {
        return totalVendido;
    }

    public void setTotalVendido(Integer totalVendido) {
        this.totalVendido = totalVendido;
    }

    public Integer getClienteId() {
        return clienteId;
    }

    public void setClienteId(Integer clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNombre() {
        return clienteNombre;
    }

    public void setClienteNombre(String clienteNombre) {
        this.clienteNombre = clienteNombre;
    }

    public BigDecimal getTotalIngresos() {
        return totalIngresos;
    }

    public void setTotalIngresos(BigDecimal totalIngresos) {
        this.totalIngresos = totalIngresos;
    }

    public BigDecimal getIngresoMensual() {
        return ingresoMensual;
    }

    public void setIngresoMensual(BigDecimal ingresoMensual) {
        this.ingresoMensual = ingresoMensual;
    }
}