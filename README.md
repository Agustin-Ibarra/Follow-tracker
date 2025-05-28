# Follow Tracker
Esta aplicación tiene como objetivo brindar mayor transparencia en las relaciones sociales dentro de Instagram, facilitando la gestión y análisis de las cuentas que sigues y las que te siguen. Su funcionalidad principal es permitir al usuario visualizar dos listas clave:
Usuarios que sigues (Following)
Usuarios que te siguen (Followers)
## Tabla de contenido
1. [Características](#características)
3. [BackEnd](#backEnd)
7. [Monitoreo de rutas](#monitoreo-de-rutas)
2. [FrontEnd](#frontend)
## Características
- Análisis de usuario de la plataforma de Instagram
- Reporte de la información obtenida
- Guía de usuario para poder usar correctamente la aplicación
- Sección sobre información y propósito de la aplicación
## BackEnd
- Tecnologias utilizadas: TypeScript Node.js con Express
```
backend/
│
├── src/               # carpeta donde se encuentra el código fuente
│   ├── controllers/   # procesan las peticiones y lógica de las respuestas
|   ├── routes/        # define las rutas y se especifica qué controlador debe manejar la petición
|   └── index/         # punto de entrada de la aplicación (configuración del servidor)
```
## Monitoreo de rutas
- Monitoreo: se realiza con la librería Morgan para crear logs de la actividad de la aplicación.
## FrontEnd
- Tecnologias utilizadas: HTML5 CSS3 JavaScript
```
frontend/
|── app/
|   ├── public/    #archivos estaticos (estilos, scripts, imagenes)
|   ├── src/
|   └── views/ # archivos de vistas
```