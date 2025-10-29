package com.appventas.backend.controller;

import com.appventas.backend.model.Producto;
import com.appventas.backend.repository.ProductoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos") // Ruta base: /api/productos
@CrossOrigin(origins = "*") 
public class ProductoController {

    private final ProductoRepository productoRepository;

    // Inyección por constructor
    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // -----------------------------------------------------
    // 1. READ ALL (Leer Todos) - GET /api/productos
    // -----------------------------------------------------
    @GetMapping
    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }
    
    // -----------------------------------------------------
    // 2. READ ONE (Leer Uno por ID) - GET /api/productos/{id}
    // -----------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Integer id) {
        return productoRepository.findById(id)
                .map(producto -> new ResponseEntity<>(producto, HttpStatus.OK)) // Si existe, devuelve 200 OK y el producto
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Si no existe, devuelve 404 NOT FOUND
    }

    // -----------------------------------------------------
    // 3. CREATE (Crear) - POST /api/productos
    // -----------------------------------------------------
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // Devuelve 201 Created
    public Producto crearProducto(@RequestBody Producto nuevoProducto) {
        // Guarda el producto, Spring/JPA se encarga del INSERT
        return productoRepository.save(nuevoProducto);
    }

    // -----------------------------------------------------
    // 4. UPDATE (Actualizar) - PUT /api/productos/{id}
    // -----------------------------------------------------
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Integer id, @RequestBody Producto productoDetails) {
        // 1. Busca el producto existente por ID
        return productoRepository.findById(id)
                .map(productoExistente -> {
                    // 2. Actualiza los campos con los nuevos detalles
                    productoExistente.setNombre(productoDetails.getNombre());
                    productoExistente.setDescripcion(productoDetails.getDescripcion());
                    productoExistente.setPrecio(productoDetails.getPrecio());
                    productoExistente.setStock(productoDetails.getStock());
                    
                    // 3. Guarda el producto actualizado (Spring/JPA hace un UPDATE)
                    Producto productoActualizado = productoRepository.save(productoExistente);
                    return new ResponseEntity<>(productoActualizado, HttpStatus.OK); // Devuelve 200 OK
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND)); // Devuelve 404 NOT FOUND si el ID no existe
    }

    // -----------------------------------------------------
    // 5. DELETE (Eliminar) - DELETE /api/productos/{id}
    // -----------------------------------------------------
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Devuelve 204 No Content
    public void eliminarProducto(@PathVariable Integer id) {
        // El método deleteById se encarga de buscar y eliminar.
        // Si el ID no existe, JpaRepository podría lanzar una excepción,
        // pero para un simple DELETE, este enfoque es el más limpio.
        productoRepository.deleteById(id);
    }
}