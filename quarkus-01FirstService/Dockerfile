# Imagen base con Maven y Java 17 para compilar y correr
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el descriptor de dependencias primero (para cachear)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el código fuente
COPY src ./src

# Compilamos la aplicación (sin tests por ahora)
RUN mvn package -DskipTests

# Imagen final más ligera solo con JRE
FROM eclipse-temurin:17-jre-alpine
WORKDIR /opt/app

# Copiamos el resultado del build
COPY --from=build /app/target/quarkus-app /opt/app/quarkus-app

# Exponemos el puerto de Quarkus
EXPOSE 8080

# Comando de arranque
CMD ["java", "-jar", "/opt/app/quarkus-app/quarkus-run.jar"]