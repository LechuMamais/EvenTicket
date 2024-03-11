Hecho:
- Funcionalidad: quitar asistencia a evento
- Ocultar Login y Register una vez iniciada la sesion
- Agregar Funcionalidad: UpdateEvent:
    - Boton
    - Component
    - Formulario 

- Agregar Funcionalidad: UpdateProfile:
    - Boton
    - Component
    - Formulario

- Organizar las urls en un fichero separado

- Componente showEventCard(eventData)
    Crear un componente para mostrar una card de un evento, que utilizaremos en 
    showEvents y en el perfil del usuario. Este componente recibirá los datos del
    evento, y los mostrará en la card.

- Backend: Mejorar la interaccion entre usuarios y eventos. Cada usuario tendrá
    sus array de eventos, y cada evento tendrá sus array de usuarios
    organizadores y otro de asistentes,
    Para eso, hay que actualizar los 
        - modelos: done
        - controladores: done
        - rutas: done
        - peticiones: asistir y cancelar asistencia: done
        - utils de urls: done

- Header: ocultar el link a profile, que se muestra con texto null
    

--------------------------------------------------------------------------------

Próximas mejoras:

- Manejo de fechas:
    - 0rdenar eventos por fechas
    - Poder tener un calendario de eventos a los que va como asistente.

- Componente profile: mostrar un span "No hay eventos en tu lista" si la lista
    está vacía, tanto en la lista de as organizer como en la de as attendee


- UI: Organizar mejor la vista de las cosas en las páginas:
    - Eventos
    - EventDetail
    - Profile

- Profile: no funcionan los links a eventDetails


--------------------------------------------------------------------------------

Mejoras Futuras:

- Cloudinary: subida de ficheros de imagenes a la nube.

- Organizadores: que puedan ser varios.