document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector("button.btn-primary");
    const formInputs = document.querySelectorAll("form input");
    let isEditing = false;
    let originalValues = {};

    // Deshabilitar todos los campos al cargar la página
    formInputs.forEach(input => {
        input.disabled = true; // Deshabilitar campos al inicio
        originalValues[input.id] = input.value; // Guardar valores originales
    });

    // Función para alternar el modo de edición
    function toggleEditMode() {
        isEditing = !isEditing;

        formInputs.forEach(input => {
            input.disabled = !isEditing; // Habilitar o deshabilitar según el modo
        });

        // Cambiar el texto del botón
        editButton.textContent = isEditing ? "Actualizar Información" : "Editar Información";
    }

    // Confirmar actualización
    function confirmUpdate() {
        if (confirm("¿Estás seguro de que deseas actualizar la información?")) {
            console.log("Información actualizada:");
            formInputs.forEach(input => {
                console.log(`${input.id}: ${input.value}`);
            });

            // Cambiar a modo no edición
            toggleEditMode();
        } else {
            // Restaurar valores originales si se cancela
            formInputs.forEach(input => {
                input.value = originalValues[input.id];
            });
            toggleEditMode();
        }
    }

    // Evento para el botón de editar/actualizar
    editButton.addEventListener("click", () => {
        if (isEditing) {
            confirmUpdate();
        } else {
            toggleEditMode();
        }
    });
});
