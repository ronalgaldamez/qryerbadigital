// Inicialización del generador QR
let qrCode;

document.addEventListener('DOMContentLoaded', () => {
    qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        type: "canvas",
        data: "https://qryerbadigital.com",
        image: "",
        dotsOptions: {
            color: "#3b82f6",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#ffffff"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 8
        }
    });

    qrCode.append(document.getElementById("qr-container"));

    // Manejo de la carga de logo
    document.getElementById("logoInput").addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                qrCode.update({
                    image: event.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    });
});

// Función para generar QR
function generarQR() {
    const url = document.getElementById("urlInput").value.trim();
    if (!url) {
        alert("Por favor ingresa una URL o texto válido.");
        return;
    }
    qrCode.update({
        data: url
    });
}

// Función para descargar QR
function descargarQR() {
    qrCode.download({ name: "qr_estilizado", extension: "png" });
}