# EbookVault API

EbookVault es una plataforma de libros electrónicos completamente en la nube inspirada en Kindle, diseñada para promover el hábito de lectura entre los guatemaltecos. Esta API proporciona las funcionalidades necesarias para gestionar usuarios y libros en la plataforma.

## Estructura del Proyecto

El proyecto está organizado en varias capas para mantener una arquitectura limpia y escalable:

- **src**: Contiene el código fuente de la aplicación.
  - **controllers**: Maneja la lógica de las rutas y las interacciones con los servicios.
    - `authController.js`: Funciones para la autenticación de usuarios.
    - `bookController.js`: Funciones para manejar operaciones relacionadas con los libros.
    - `userController.js`: Funciones para manejar operaciones relacionadas con los usuarios.
  - **services**: Contiene la lógica de negocio.
    - `authService.js`: Lógica para la autenticación de usuarios.
    - `bookService.js`: Lógica para la gestión de libros.
    - `userService.js`: Lógica para la gestión de usuarios.
  - **repositories**: Maneja el acceso a datos.
    - `bookRepository.js`: Operaciones de acceso a datos relacionadas con los libros.
    - `userRepository.js`: Operaciones de acceso a datos relacionadas con los usuarios.
  - **models**: Define los modelos de datos.
    - `bookModel.js`: Modelo de datos para los libros.
    - `userModel.js`: Modelo de datos para los usuarios.
  - **routes**: Define las rutas de la API.
    - `authRoutes.js`: Rutas relacionadas con la autenticación de usuarios.
    - `bookRoutes.js`: Rutas relacionadas con la gestión de libros.
    - `userRoutes.js`: Rutas relacionadas con la gestión de usuarios.
  - **config**: Contiene la configuración de la aplicación.
    - `dbConfig.js`: Configuración de la conexión a la base de datos MySQL.
  - `app.js`: Punto de entrada de la aplicación.
  - `server.js`: Inicia el servidor y escucha en un puerto específico.

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd ebookvault-api
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura las variables de entorno en el archivo `.env`.

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:
```
npm start
```

La API estará disponible en `http://localhost:PUERTO`, donde `PUERTO` es el puerto configurado en el archivo `server.js`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.