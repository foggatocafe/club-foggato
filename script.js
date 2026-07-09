document.addEventListener("DOMContentLoaded", () => {
    const stampsGrid = document.getElementById("stamps-grid");
    const stampCountEl = document.getElementById("stamp-count");
    const rewardMessage = document.getElementById("reward-message");
    const simulateBtn = document.getElementById("simulate-btn");
    const resetBtn = document.getElementById("reset-btn");

    let currentStamps = 0;
    const totalStamps = 10;

    // Renderizar la cuadrícula inicial de los 10 sellos
    function createGrid() {
        stampsGrid.innerHTML = "";
        for (let i = 1; i <= totalStamps; i++) {
            const slot = document.createElement("div");
            slot.classList.add("stamp-slot");
            slot.setAttribute("id", `stamp-${i}`);

            const icon = document.createElement("i");
            const numSpan = document.createElement("span");
            numSpan.classList.add("stamp-number");
            numSpan.innerText = i;

            // Asignar iconos base según la posición (vacíos)
            if (i === 5) {
                slot.classList.add("prize-slot");
                icon.className = "fa-solid fa-donut"; // Icono de dona para el 5
            } else if (i === 10) {
                slot.classList.add("prize-slot");
                icon.className = "fa-solid fa-ice-cream"; // Icono representativo del Affogato
            } else {
                icon.className = "fa-solid fa-mug-hot"; // Taza para los normales
            }

            slot.appendChild(icon);
            slot.appendChild(numSpan);
            stampsGrid.appendChild(slot);
        }
    }

    // Actualizar el estado visual cuando se suma un sello
    function updateStamps() {
        stampCountEl.innerText = currentStamps;

        for (let i = 1; i <= totalStamps; i++) {
            const slot = document.getElementById(`stamp-${i}`);
            
            if (i <= currentStamps) {
                // Sello ganado
                slot.classList.add("active");
                if (i === 5) {
                    slot.classList.add("donut-stamp");
                } else if (i === 10) {
                    slot.classList.add("affogato-stamp");
                } else {
                    slot.classList.add("normal-stamp");
                }
            } else {
                // Sello aún no ganado
                slot.classList.remove("active", "normal-stamp", "donut-stamp", "affogato-stamp");
            }
        }

        // Cambiar mensajes según el progreso
        if (currentStamps === 5) {
            rewardMessage.innerHTML = "<strong>¡Felicidades! 🎉 Te ganaste una DONA gratis en tu compra.</strong>";
            rewardMessage.style.color = "#ff69b4";
        } else if (currentStamps === 10) {
            rewardMessage.innerHTML = "<strong>¡CORONA LOGRADA! 👑 Reclama tu AFFOGATO FOGGATO gratis.</strong>";
            rewardMessage.style.color = "#d4af37";
        } else if (currentStamps > 5 && currentStamps < 10) {
            rewardMessage.innerText = "¡Vas a la mitad del camino para el Affogato!";
            rewardMessage.style.color = "#8e6f54";
        } else {
            rewardMessage.innerText = "Sigue acumulando tazas para ganar premios.";
            rewardMessage.style.color = "#8e6f54";
        }
    }

    // Botón para simular la visita
    simulateBtn.addEventListener("click", () => {
        if (currentStamps < totalStamps) {
            currentStamps++;
            updateStamps();
        } else {
            alert("¡Ya completaste tu tarjeta, compadre! Canjea tu Affogato y reinicia.");
        }
    });

    // Botón para reiniciar la tarjeta
    resetBtn.addEventListener("click", () => {
        if(confirm("¿Quieres reiniciar la tarjeta de sellos?")) {
            currentStamps = 0;
            updateStamps();
        }
    });

    // Inicializar
    createGrid();
    updateStamps();
});