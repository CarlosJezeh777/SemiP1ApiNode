# Express API Documentation

## Descripción del Proyecto
Este proyecto es una API RESTful construida con Express.js que permite gestionar usuarios y libros. Proporciona funcionalidades como registro de usuarios, inicio de sesión, actualización de perfil y gestión de libros.

## Estructura del Proyecto
```
express-api
├── src
│   ├── app.js                # Punto de entrada de la aplicación
│   ├── controllers           # Controladores para manejar la lógica de negocio
│   │   └── userController.js  # Controlador para operaciones de usuario
│   ├── routes                # Rutas de la API
│   │   └── userRoutes.js      # Rutas relacionadas con usuarios
│   └── config                # Configuración de la aplicación
│       └── dbConfig.js        # Configuración de la base de datos
├── package.json              # Configuración de npm y dependencias
├── .env                      # Variables de entorno
└── README.md                 # Documentación del proyecto
```

## Requisitos
- Node.js
- npm

## Instalación
1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd express-api
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno en el archivo `.env`:
   ```
   DB_HOST=tu_host
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=tu_base_de_datos
   AWS_ACCESS_KEY_ID=tu_access_key
   AWS_SECRET_ACCESS_KEY=tu_secret_key
   AWS_REGION=tu_region
   S3_BUCKET=tu_bucket
   ```

## Ejecución
Para iniciar la API, ejecuta el siguiente comando:
```
npm start
```

La API estará disponible en `http://localhost:5000`.

## Endpoints
- `POST /registrar`: Registra un nuevo usuario.
- `POST /login`: Inicia sesión de un usuario.
- `POST /update_profile`: Actualiza el perfil del usuario.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.