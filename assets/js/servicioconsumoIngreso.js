document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');

    if (formulario) {
        formulario.addEventListener('submit', async(event) => {
            event.preventDefault();



            const Correo = document.getElementById('Correo').value;
            const Clave = document.getElementById('Clave').value;

            const datos = {
                "Correo": Correo,
                "Clave": Clave,
                "origenSolicitud": "Pagina Web"
            };

            const pantallaCarga = document.getElementById('pantallaCarga');
            const respuestaContainer = document.getElementById('respuesta');
            const correoInput = document.getElementById('Correo');
            const claveInput = document.getElementById('Clave');

            // Mostrar la pantalla de carga
            pantallaCarga.style.display = 'block';

            // Limpiar cualquier mensaje de error anterior
            respuestaContainer.textContent = '';
            correoInput.style.borderColor = '';
            claveInput.style.borderColor = '';

            try {
                const response = await fetch('https://prod2-22.brazilsouth.logic.azure.com:443/workflows/c697c05f83bf497bab7751a8a0efbe45/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SC-YOk3i6nm_7ZAFj8W5NGToiWwuC3ggcZ6El4o_HdQ', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datos)
                });

                // Ocultar la pantalla de carga
                pantallaCarga.style.display = 'none';

                if (response.status === 200) {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse.token);

                    // Almacena el token en localStorage
                    localStorage.setItem('token', jsonResponse.token);
                    //window.location.href = "https://segurossuraautonomia.com/CotizadorPES/";
                    window.location.href = "https://www.youtube.com/watch?v=cVw3UiLVbSw";

                } else if (response.status === 402) {
                    // Resaltar los campos de "Correo Electrónico" y "Contraseña"
                    document.getElementById('Correo').classList.add('campo-invalido');
                    document.getElementById('Clave').classList.add('campo-invalido');

                    respuestaContainer.textContent = "The username or password is not valid. Please try again.";
                    respuestaContainer.style.color = 'red';
                }
            } catch (error) {
                console.error(error);
            }
        });
    }
    /*

    else {
        console.error('Elemento con id "formulario" no encontrado en el DOM.');
    }

    */
});