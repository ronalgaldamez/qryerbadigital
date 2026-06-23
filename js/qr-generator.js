// Inicialización del generador QR
let qrCode;
let currentLogo = "";

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

    document.getElementById("logoInput").addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                currentLogo = event.target.result;
                qrCode.update({ image: currentLogo });
            };
            reader.readAsDataURL(file);
        }
    });
});

function generarQR() {
    const url = document.getElementById("urlInput").value.trim();
    if (!url) {
        alert("Por favor ingresa una URL o texto válido.");
        return;
    }
    qrCode.update({ data: url });
}

function descargarQR() {
    const url = document.getElementById("urlInput").value.trim();
    if (!url) {
        alert("Primero genera un código QR antes de descargar.");
        return;
    }

    const resolution = parseInt(document.getElementById("resolutionSelect").value, 10);
    const format = document.getElementById("formatSelect").value;

    // Para SVG la instancia usa "svg" como type; para PNG/JPEG usa "canvas"
    const type = format === "svg" ? "svg" : "canvas";

    const qrHighRes = new QRCodeStyling({
        width: resolution,
        height: resolution,
        type: type,
        data: url,
        image: currentLogo,
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

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    document.body.appendChild(tempContainer);

    qrHighRes.append(tempContainer);

    setTimeout(() => {
        qrHighRes.download({ name: "qr_qryerbadigital", extension: format });
        setTimeout(() => tempContainer.remove(), 100);
    }, 300);
}