package com.appventas.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


// Indica a Spring que esta clase contiene la configuración de la aplicación
@Configuration
// Habilita la integración de seguridad web de Spring
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Deshabilitar CSRF (Common para APIs REST)
            .csrf(csrf -> csrf.disable()) 
            
            // 2. Definir las reglas de autorización para las peticiones HTTP
            .authorizeHttpRequests(auth -> auth
                
                // --- PERMISOS TEMPORALES PARA PRUEBAS ---
                
                // Permitir todas las solicitudes a /api/clientes/** (GET, POST, etc.)
                .requestMatchers("/api/clientes/**").permitAll() 
                
                // Permitir todas las solicitudes a /api/productos/** (GET, POST, etc.)
                .requestMatchers("/api/productos/**").permitAll() 
                
                // Cualquier otra solicitud (si la hubiera) debe ser autenticada
                .anyRequest().authenticated()
            )

            .httpBasic(Customizer.withDefaults());
        // 3. Construir la cadena de filtros de seguridad
        return http.build();
    }
    
    // NOTA: Para un entorno de producción, DEBES cambiar permitAll()
    // por reglas más estrictas como .authenticated() o .hasRole("ADMIN").
}