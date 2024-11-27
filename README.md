# BNKA Backend

Este es un backend básico desarrollado con Flask que incluye funcionalidad de registro de usuarios, gestión de transacciones y consulta de balances. También incluye documentación interactiva de API con Swagger.

## Requisitos

Antes de iniciar, asegúrate de tener instalados los siguientes requerimientos:

- **Docker** y **Docker Compose**
- Opcional: Un entorno virtual (`venv`) para gestionar dependencias locales

## Instalación y configuración

1. Clona este repositorio:

    ```bash
    git clone https://github.com/jesusrafael9/bnka_backend.git
    cd bnka_backend
    ```

2. Con Docker, sigue directamente al siguiente apartado.

Ejecuta el contenedor usando Docker Compose:

    ```bash
    docker-compose up --build
    ```

3. El backend estará corriendo en [http://localhost:5001](http://localhost:5001).

4. El frontend [http://localhost:3000] (http://localhost:3000)

5. Para detener el servidor, presiona `Ctrl + C` y luego ejecuta:

    ```bash
    docker-compose down
    ```
   

## Endpoints disponibles

- **Registro de usuarios**: `POST /register`
- **Consultar balance**: `GET /balance/<user_id>`
- **Registrar transacción**: `POST /transaction`
- **Consultar transacciones**: `GET /transactions/<user_id>`

### Documentación de la API

La documentación interactiva Swagger está disponible en:

[http://localhost:5000/apidocs](http://localhost:5001/apidocs)

