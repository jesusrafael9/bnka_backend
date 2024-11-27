# BNKA Backend

Este es un backend básico desarrollado con Flask que incluye funcionalidad de registro de usuarios, gestión de transacciones y consulta de balances. También incluye documentación interactiva de API con Swagger.

## Requisitos

Antes de iniciar, asegúrate de tener instalados los siguientes requerimientos:

- **Python 3.8+**
- **Docker** y **Docker Compose**
- Opcional: Un entorno virtual (`venv`) para gestionar dependencias locales

## Instalación y configuración

1. Clona este repositorio:

    ```bash
    git clone https://github.com/tu_usuario/bnka_backend.git
    cd bnka_backend
    ```

2. Crea un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias. Por ejemplo:

    ```
    FLASK_APP=app.py
    FLASK_ENV=development
    ```

3. Si decides trabajar localmente sin Docker, instala las dependencias usando `pip`:

    ```bash
    pip install -r requirements.txt
    ```

4. Si decides trabajar con Docker, sigue directamente al siguiente apartado.

## Levantar el proyecto con Docker

1. Construye el contenedor Docker con el siguiente comando:

    ```bash
    docker build -t bnka_backend .
    ```

2. Ejecuta el contenedor usando Docker Compose:

    ```bash
    docker-compose up --build
    ```

3. El servidor estará corriendo en [http://localhost:5000](http://localhost:5000).

## Endpoints disponibles

- **Registro de usuarios**: `POST /register`
- **Consultar balance**: `GET /balance/<user_id>`
- **Registrar transacción**: `POST /transaction`
- **Consultar transacciones**: `GET /transactions/<user_id>`

### Documentación de la API

La documentación interactiva Swagger está disponible en:

[http://localhost:5000/apidocs](http://localhost:5000/apidocs)

