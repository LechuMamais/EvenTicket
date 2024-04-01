Documentación del Backend de la Aplicación
Descripción General

Este proyecto consiste en el desarrollo del backend para una aplicación de gestión de eventos. El backend proporciona una API RESTful que permite a los usuarios crear, actualizar, eliminar y buscar eventos, así como autenticarse en la aplicación.

Tecnologías Utilizadas
    Node.js
    Express.js
    MongoDB
    JWT para autenticación

Arquitectura

El backend sigue una arquitectura de tipo RESTful, donde los endpoints de la API representan diferentes recursos y operaciones sobre ellos.
Componentes Principales:

    Servidor Node.js: Utilizado para ejecutar la aplicación backend.
    Express.js: Marco de desarrollo utilizado para crear la API RESTful y gestionar las rutas y solicitudes HTTP.
    MongoDB: Base de datos NoSQL utilizada para almacenar la información de los eventos y usuarios.
    JWT (JSON Web Tokens): Mecanismo de autenticación utilizado para gestionar la sesión de usuario.

Endpoints de la API

    El backend tiene la particularidad de que, si bien tiene dos modelos y dos controllers (events y users), tiene tres grandes grupos de rutas.
    events y usuarios tienen su CRUD básico, pero además hay rutas que ejecutan controllers en ambos, las cuales están definidas en el archivo
    manageAssistance.js

El backend devuelve en los siguientes endpoints:

    Events:
    GET /api/events: Obtiene una lista de todos los eventos.
    GET /api/events/:id: Obtiene un evento específico por su ID.
    POST /api/events/newEvent: Crea un nuevo evento. Requiere autenticación.
    PUT /api/events/:id: Actualiza un evento existente. Requiere autenticación.
    DELETE /api/events/:id: Elimina un evento existente. Requiere autenticación.

    Users:
    GET /api/users: Obtiene una lista de todos los usuarios.
    GET /api/users/:id: Obtiene un usuario específico por su ID.
    POST /api/users/register: Crea un nuevo usuario.
    PUT /api/users/login: Login
    PUT /api/users/:id: Actualiza un usuario existente. Requiere autenticación.
    DELETE /api/users/:id: Elimina un usuario existente. Requiere autenticación.
    GET /api/users/checkLogged/:id: Ejecuta el mismo controller que GET /api/users/:id, pero sólo si la autenticación es correcta.
        Se utiliza para saber si el usuario está correctamente logueado. Requiere autenticación.

    Manage Assitance:
    PUT /api/addAssistance/:userId/:eventId : Confirma asistencia a un evento. Se agrega el evento a la lista de eventos a los que el usuario asistirá, y 
        se agrega el usuario a la lista de asistentes del evento. Requiere autenticación.
    PUT /api/removeAssistance/:userId/:eventId : Cancela asistencia a un evento. Se quita el evento de la lista de eventos a los que el usuario asistirá, y 
        se quita el usuario de la lista de asistentes del evento. Requiere autenticación.

Autenticación y Autorización

La autenticación en la API se gestiona utilizando tokens JWT. Los usuarios deben autenticarse con sus credenciales (correo electrónico y contraseña) para acceder a ciertos endpoints protegidos. Una vez iniciada la sesión, se almacena userId, userName y bearer Token en localStorage. UserId y accessToken son
necesarios para que la autenticación se realice correctamente, se reciben en req.body

Base de Datos

La base de datos MongoDB se utiliza para almacenar la información de los eventos y usuarios.
Colecciones:

    events: Almacena información sobre los eventos, incluyendo título, fecha, ubicación, descripción, etc.
    users: Almacena información sobre los usuarios registrados, incluyendo correo electrónico y contraseña.

Consideraciones de Seguridad

Se han implementado medidas de seguridad para proteger la API contra ataques comunes, como inyecciones de SQL, XSS y CSRF.

    Se utilizan consultas parametrizadas para prevenir inyecciones de SQL.
    Se aplican encabezados de seguridad HTTP y CORS para prevenir ataques XSS y CSRF.

Instrucciones de Implementación

Para implementar el backend en un entorno de producción, siga estos pasos:

    Clonar el repositorio del proyecto desde GitHub.
    Instalar las dependencias del proyecto utilizando npm install.
    Configurar las variables de entorno necesarias, como la URL de la base de datos y la clave secreta JWT.
    Ejecutar el servidor Node.js utilizando npm start.

Referencias y Recursos

    Documentación de Express.js: https://expressjs.com/
    Documentación de MongoDB: https://docs.mongodb.com/
    Tutorial de JWT: https://jwt.io/introduction/