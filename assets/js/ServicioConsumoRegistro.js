const formularioRegistro = document.getElementById('formularioRegistro'); // Cambia el ID a tu formulario de registro
const pantallaCarga = document.getElementById('pantallaCarga'); // ID de tu pantalla de carga
const respuestaContainer = document.getElementById('respuestaRegistro'); // ID del contenedor de respuesta para el registro

formularioRegistro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const NombreCompleto = document.getElementById('NombreCompleto').value; // Cambia esto a tu campo de nombre completo
    const CorreoRegistro = document.getElementById('CorreoRegistro').value; // Cambia esto a tu campo de correo
    const ClaveRegistro = document.getElementById('ClaveRegistro').value; // Cambia esto a tu campo de contraseña
    const ValidacionClaveRegistro = document.getElementById('ValidacionClaveRegistro').value;

    // Validar que ambas contraseñas coincidan
    if (ClaveRegistro !== ValidacionClaveRegistro) {
        // Mostrar un mensaje de error si las contraseñas no coinciden
        respuestaContainer.textContent = "Las contraseñas no coinciden.";
        respuestaContainer.style.color = 'red';
        return; // Evitar que el formulario se envíe si las contraseñas no coinciden
    }

    // Validar que la contraseña cumple con los requisitos
    if (!validarRequisitosContraseña(ClaveRegistro)) {
        respuestaContainer.textContent = "La contraseña no cumple con los requisitos, esta debe contener al menos un carácter especial, un número y una letra mayúscula.";
        respuestaContainer.style.color = 'red';
        return;
    }

    // Si todas las condiciones se cumplen, agregar la clase "valido"
    document.getElementById('ClaveRegistro').classList.add('valido');
    document.getElementById('ValidacionClaveRegistro').classList.add('valido');

    // Continuar con el envío del formulario


    const datosRegistro = {
        "NombreCompleto": NombreCompleto,
        "CorreoRegistro": CorreoRegistro,
        "ClaveRegistro": ClaveRegistro,
        "origenSolicitud": "Pagina Web"
    };

    // Mostrar la pantalla de carga
    pantallaCarga.style.display = 'block';

    // Limpiar cualquier mensaje de error anterior
    respuestaContainer.textContent = '';

    try {
        const response = await fetch('https://prod-61.westus.logic.azure.com:443/workflows/c6924e067cad45198621d60f88a0d673/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nQI3azj4DMzygZWDC4newlfXGrTQHzx7pY-FmAGM-44', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosRegistro)
        });

        // Ocultar la pantalla de carga
        pantallaCarga.style.display = 'none';

        if (response.status === 200) {
            // Registro exitoso, puedes redirigir a la página de inicio de sesión o mostrar un mensaje de éxito
            window.location.href = "https://apps.powerapps.com/play/e/2fa36fac-371d-4dcf-8ae6-279f09e7bc87/a/cd185e3e-4849-4bc6-918f-e4a477edb69c?tenantId=3c0bd4fe-1111-4d13-8e0c-7c33b9eb7581&source=portal&screenColor=rgba%28255%2C+255%2C+255%2C+1%29&skipAppMetadata=true"; // Reemplaza con la URL adecuada
        } else if (response.status === 402) {

            // Resaltar los campos de "Nombre", "Correo" y "Contraseña"
            //document.getElementById('NombreCompleto').classList.add('campo-invalido');
            document.getElementById('CorreoRegistro').classList.add('campo-invalido');
            //document.getElementById('ClaveRegistro').classList.add('campo-invalido');

            respuestaContainer.textContent = "El correo proporcionado ya existe.";
            respuestaContainer.style.color = 'red';
        }
    } catch (error) {
        console.error(error);
    }
});


function validarRequisitosContraseña(contraseña) {
    // La contraseña debe tener al menos 8 caracteres
    if (contraseña.length < 8) {
        return false;
    }

    // La contraseña debe contener al menos un carácter especial, un número y una letra mayúscula
    const requisitos = /^(?=.*[\w\d!@#$%^&*])(?=.*\d)(?=.*[A-Z])/;
    return requisitos.test(contraseña);
}