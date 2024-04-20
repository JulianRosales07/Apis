
// Obtener referencias a los elementos del DOM
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("myModal");
const closeModalBtn = document.querySelector(".close");

// Agregar event listener para abrir el modal
openModalBtn.addEventListener("click", function() {
  modal.style.display = "block";
});

// Agregar event listener para cerrar el modal al hacer clic en la 'x'
closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Cerrar el modal si el usuario hace clic fuera de él
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});


// Función para mostrar u ocultar el contenido sobre las APIs
