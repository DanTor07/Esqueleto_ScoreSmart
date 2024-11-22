document.addEventListener("DOMContentLoaded", function() {
    const editButton = document.querySelector("button.btn-primary");
    const formInputs = document.querySelectorAll("form input");
    let isEditing = false;
    let originalValues = {};
            const ingresoNetoInput = document.getElementById("ingresoNeto");


    // Deshabilitar todos los campos al cargar la página
    formInputs.forEach(input => {
        input.disabled = true; // Deshabilitar todos los campos al inicio
        originalValues[input.id] = input.value; // Guardar los valores originales
    });

    document.addEventListener("DOMContentLoaded", function() {
        const ingresoNetoInput = document.getElementById("ingresoNeto");
    
        // Función para formatear el valor como moneda
        function formatCurrency(value) {
            return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
        }
    
        // Formatear el valor al cargar la página
        ingresoNetoInput.value = formatCurrency(ingresoNetoInput.value);
    
        // Asegurarse de restaurar el valor numérico cuando el campo se edite
        ingresoNetoInput.addEventListener('input', function() {
            const numericValue = ingresoNetoInput.value.replace(/[^\d]/g, ''); // Eliminar caracteres no numéricos
            ingresoNetoInput.value = formatCurrency(numericValue);
        });
    });

    
    // Función para habilitar/deshabilitar los campos de formulario
    function toggleEditMode() {
        isEditing = !isEditing;

        formInputs.forEach(input => {
            input.disabled = !isEditing; // Habilitar o deshabilitar según el modo de edición
        });

        // Cambiar el texto del botón
        if (isEditing) {
            editButton.textContent = "Actualizar Información";
        } else {
            editButton.textContent = "Editar Información";
        }
    }

    // Confirmar actualización
    function confirmUpdate() {
        // Abrir un modal para confirmar si el usuario desea actualizar la información
        if (confirm("¿Estás seguro de que deseas actualizar la información?")) {
            // Aquí puedes agregar el código para guardar los datos en el backend o en el almacenamiento
            // En este ejemplo, solo se muestran los nuevos valores en la consola.
            console.log("Información actualizada:");
            formInputs.forEach(input => {
                console.log(`${input.id}: ${input.value}`);
            });

            // Desactivar los campos y restaurar el texto del botón
            toggleEditMode();
        } else {
            // Si se cancela, restauramos los valores originales
            formInputs.forEach(input => {
                input.value = originalValues[input.id];
            });
            toggleEditMode();
        }
    }

    // Event Listener para el botón de editar
    editButton.addEventListener("click", () => {
        if (isEditing) {
            // Si estamos en modo edición, confirmamos antes de actualizar
            confirmUpdate();
        } else {
            // Si no estamos en modo edición, habilitamos los campos para editar
            toggleEditMode();
        }
    });
});
