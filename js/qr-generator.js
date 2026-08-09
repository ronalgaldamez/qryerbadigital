(function() {
    'use strict';

    let qrCode, qrWifi, qrEmail, qrPhone, qrWhatsApp, qrVcard, qrSms, qrLocation, qrEvent;

    document.addEventListener('DOMContentLoaded', () => {
        // Inicializar QR General
        qrCode = new QRCodeStyling({
            width: 250, height: 250, type: "canvas",
            data: "https://qrgratis.net",
            dotsOptions: { color: "#6c5ce7", type: "rounded" },
            backgroundOptions: { color: "#ffffff" },
            imageOptions: { crossOrigin: "anonymous", margin: 8 }
        });
        qrCode.append(document.getElementById("qr-container"));

        // Eventos de personalización general
        document.getElementById("colorQR")?.addEventListener("input", actualizarEstilo);
        document.getElementById("colorBg")?.addEventListener("input", actualizarEstilo);
        document.getElementById("sizeSlider")?.addEventListener("input", e => {
            const size = parseInt(e.target.value);
            document.getElementById("sizeValue").textContent = size;
            qrCode.update({ width: size, height: size });
        });
        document.getElementById("errorLevel")?.addEventListener("change", e => {
            qrCode.update({ qrOptions: { errorCorrectionLevel: e.target.value } });
        });
        document.getElementById("dotShape")?.addEventListener("change", actualizarEstilo);
        document.getElementById("eyeShape")?.addEventListener("change", actualizarEstilo);
        document.getElementById("eyeFrameShape")?.addEventListener("change", actualizarEstilo);

        construirPickers();
        document.getElementById("logoInput")?.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = ev => qrCode.update({ image: ev.target.result });
                reader.readAsDataURL(file);
            }
        });

        // Botones generales
        document.getElementById("generateBtn")?.addEventListener("click", generarQR);
        document.getElementById("downloadBtn")?.addEventListener("click", () => {
            qrCode.download({ name: "qr_general", extension: "png" });
        });

        // Historial
        renderizarHistorial();
        document.getElementById("clearHistory")?.addEventListener("click", () => {
            localStorage.removeItem('qrHistory');
            renderizarHistorial();
        });

        // Inicializar QR secundarios
        qrWifi = new QRCodeStyling({ width:250, height:250, data:"" });
        qrWifi.append(document.getElementById("qr-wifi-container"));
        qrEmail = new QRCodeStyling({ width:250, height:250, data:"", dotsOptions:{color:"#00b894"} });
        qrEmail.append(document.getElementById("qr-email-container"));
        qrPhone = new QRCodeStyling({ width:250, height:250, data:"", dotsOptions:{color:"#e84393"} });
        qrPhone.append(document.getElementById("qr-phone-container"));
        qrWhatsApp = new QRCodeStyling({ width:250, height:250, data:"", dotsOptions:{color:"#25d366"} });
        qrWhatsApp.append(document.getElementById("qr-whatsapp-container"));
        qrVcard = new QRCodeStyling({ width:250, height:250, data:"", dotsOptions:{color:"#0984e3"} });
        qrVcard.append(document.getElementById("qr-vcard-container"));
        qrSms = new QRCodeStyling({ width:250, height:250, data:"", dotsOptions:{color:"#e17055"} });
        qrSms.append(document.getElementById("qr-sms-container"));
        qrLocation = new QRCodeStyling({ width:250, height:250, data:"", dotsOptions:{color:"#00cec9"} });
        qrLocation.append(document.getElementById("qr-location-container"));
        qrEvent = new QRCodeStyling({ width:250, height:250, data:"", dotsOptions:{color:"#d63031"} });
        qrEvent.append(document.getElementById("qr-event-container"));

        // Pestañas
        document.querySelectorAll('.pro-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.pro-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.pro-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const panelId = `panel-${tab.dataset.tab}`;
                document.getElementById(panelId)?.classList.add('active');
            });
        });

        // Botones de descarga Pro
        document.getElementById("downloadWifiBtn")?.addEventListener("click", () => qrWifi.download({ name: "qr_wifi", extension: "png" }));
        document.getElementById("downloadEmailBtn")?.addEventListener("click", () => qrEmail.download({ name: "qr_email", extension: "png" }));
        document.getElementById("downloadPhoneBtn")?.addEventListener("click", () => qrPhone.download({ name: "qr_phone", extension: "png" }));
        document.getElementById("downloadWhatsAppBtn")?.addEventListener("click", () => qrWhatsApp.download({ name: "qr_whatsapp", extension: "png" }));
        document.getElementById("downloadVcardBtn")?.addEventListener("click", () => qrVcard.download({ name: "qr_vcard", extension: "png" }));
        document.getElementById("downloadSmsBtn")?.addEventListener("click", () => qrSms.download({ name: "qr_sms", extension: "png" }));
        document.getElementById("downloadLocationBtn")?.addEventListener("click", () => qrLocation.download({ name: "qr_ubicacion", extension: "png" }));
        document.getElementById("downloadEventBtn")?.addEventListener("click", () => qrEvent.download({ name: "qr_evento", extension: "png" }));

        // Envío de formularios a Formspree (registro y Plan Pro)
        const bindFormspree = (formId, msgId) => {
            const form = document.getElementById(formId);
            if (!form) return;
            form.addEventListener("submit", async function(e) {
                e.preventDefault();
                const msg = document.getElementById(msgId);
                const btn = this.querySelector('button[type="submit"]');
                const original = btn ? btn.textContent : "";
                if (msg) msg.textContent = "Enviando...";
                if (btn) btn.disabled = true;
                try {
                    const res = await fetch(this.action, {
                        method: "POST",
                        body: new FormData(this),
                        headers: { "Accept": "application/json" }
                    });
                    if (res.ok) {
                        if (msg) { msg.textContent = "¡Gracias! Te avisaremos cuando esté listo."; msg.style.color = "#059669"; }
                        this.reset();
                    } else {
                        if (msg) { msg.textContent = "Ocurrió un error, inténtalo de nuevo."; msg.style.color = "#dc2626"; }
                    }
                } catch (err) {
                    if (msg) { msg.textContent = "Error de conexión, inténtalo de nuevo."; msg.style.color = "#dc2626"; }
                }
                if (btn) { btn.disabled = false; btn.textContent = original; }
            });
        };
        bindFormspree("registerForm", "registerMsg");
        bindFormspree("proForm", "proMsg");
    });

    function construirPickers() {
        const definiciones = [
            { pickerId: "dotShapePicker", selectId: "dotShape", opciones: ["square", "dots", "rounded", "classy", "classy-rounded", "extra-rounded"] },
            { pickerId: "eyeShapePicker", selectId: "eyeShape", opciones: ["square", "dot"] },
            { pickerId: "eyeFrameShapePicker", selectId: "eyeFrameShape", opciones: ["square", "dot", "extra-rounded"] }
        ];

        const nombres = {
            square: "Cuadrado", dots: "Puntos", rounded: "Redondeado",
            classy: "Elegante", "classy-rounded": "Eleg. redon.", "extra-rounded": "Extra redon.",
            dot: "Punto"
        };

        definiciones.forEach(({ pickerId, selectId, opciones }) => {
            const picker = document.getElementById(pickerId);
            const select = document.getElementById(selectId);
            if (!picker || !select) return;

            picker.innerHTML = "";
            const seleccionado = select.value || "rounded";

            opciones.forEach(tipo => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "style-option" + (tipo === seleccionado ? " active" : "");
                btn.dataset.tipo = tipo;

                const preview = document.createElement("div");
                preview.className = "style-option-preview";
                btn.appendChild(preview);

                const label = document.createElement("span");
                label.className = "style-option-label";
                label.textContent = nombres[tipo] || tipo;
                btn.appendChild(label);

                const mini = new QRCodeStyling({
                    width: 60, height: 60, type: "svg",
                    data: "https://qrgratis.net",
                    qrOptions: { errorCorrectionLevel: "M" },
                    dotsOptions: { color: "#6c5ce7", type: pickerId === "dotShapePicker" ? tipo : "rounded" },
                    cornersDotOptions: { color: "#6c5ce7", type: pickerId === "eyeShapePicker" ? tipo : "dot" },
                    cornersSquareOptions: { color: "#6c5ce7", type: pickerId === "eyeFrameShapePicker" ? tipo : "square" }
                });
                mini.append(preview);

                btn.addEventListener("click", () => {
                    select.value = tipo;
                    picker.querySelectorAll(".style-option").forEach(o => o.classList.remove("active"));
                    btn.classList.add("active");
                    actualizarEstilo();
                });

                picker.appendChild(btn);
            });
        });
    }

    function actualizarEstilo() {
        if (!qrCode) return;
        qrCode.update({
            dotsOptions: {
                color: document.getElementById("colorQR")?.value || "#6c5ce7",
                type: document.getElementById("dotShape")?.value || "rounded"
            },
            cornersDotOptions: {
                color: document.getElementById("colorQR")?.value || "#6c5ce7",
                type: document.getElementById("eyeShape")?.value || "dot"
            },
            cornersSquareOptions: {
                color: document.getElementById("colorQR")?.value || "#6c5ce7",
                type: document.getElementById("eyeFrameShape")?.value || "square"
            },
            backgroundOptions: { color: document.getElementById("colorBg")?.value || "#ffffff" }
        });
    }

    function mostrarQR(bodyId, btnId) {
        const body = document.getElementById(bodyId);
        if (body) body.classList.add('has-qr');
        const btn = document.getElementById(btnId);
        if (btn) btn.style.display = 'inline-flex';
    }

    function generarQR() {
        const url = document.getElementById("urlInput")?.value.trim();
        if (!url) return alert("Ingresa una URL o texto.");
        qrCode.update({ data: url });
        mostrarQR("body-general", "downloadBtn");

        const entry = {
            url,
            color: document.getElementById("colorQR")?.value,
            bg: document.getElementById("colorBg")?.value,
            size: document.getElementById("sizeSlider")?.value,
            ec: document.getElementById("errorLevel")?.value,
            dots: document.getElementById("dotShape")?.value,
            eye: document.getElementById("eyeShape")?.value,
            frame: document.getElementById("eyeFrameShape")?.value,
            date: new Date().toLocaleString()
        };
        let hist = JSON.parse(localStorage.getItem('qrHistory')) || [];
        hist.unshift(entry);
        if (hist.length > 5) hist.pop();
        localStorage.setItem('qrHistory', JSON.stringify(hist));
        renderizarHistorial();
    }

    function renderizarHistorial() {
        const hist = JSON.parse(localStorage.getItem('qrHistory')) || [];
        const list = document.getElementById("historyList");
        const section = document.getElementById("historySection");
        if (!list || !section) return;
        if (hist.length === 0) { section.style.display = 'none'; return; }
        section.style.display = 'block';
        list.innerHTML = hist.map((item, i) => `<li data-index="${i}">${item.url?.substring(0,30)}... (${item.date})</li>`).join('');
        list.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', function() {
                const item = hist[this.dataset.index];
                if (!item) return;
                document.getElementById("urlInput").value = item.url || '';
                document.getElementById("colorQR").value = item.color || '#6c5ce7';
                document.getElementById("colorBg").value = item.bg || '#ffffff';
                document.getElementById("sizeSlider").value = item.size || 250;
                document.getElementById("sizeValue").textContent = item.size || 250;
                document.getElementById("errorLevel").value = item.ec || 'M';
                document.getElementById("dotShape").value = item.dots || 'rounded';
                document.getElementById("eyeShape").value = item.eye || 'dot';
                document.getElementById("eyeFrameShape").value = item.frame || 'square';
                sincronizarPickers();
                actualizarEstilo();
                qrCode.update({ data: item.url, width: parseInt(item.size)||250, height: parseInt(item.size)||250, qrOptions: { errorCorrectionLevel: item.ec || 'M' } });
                mostrarQR("body-general", "downloadBtn");
            });
        });
    }

    function sincronizarPickers() {
        const mapeo = { dotShapePicker: "dotShape", eyeShapePicker: "eyeShape", eyeFrameShapePicker: "eyeFrameShape" };
        Object.keys(mapeo).forEach(pickerId => {
            const picker = document.getElementById(pickerId);
            const select = document.getElementById(mapeo[pickerId]);
            if (!picker || !select) return;
            picker.querySelectorAll(".style-option").forEach(o => {
                o.classList.toggle("active", o.dataset.tipo === select.value);
            });
        });
    }

    // Funciones Pro públicas
    window.generarQRWifi = function() {
        const ssid = document.getElementById("wifiSSID")?.value.trim();
        const pass = document.getElementById("wifiPassword")?.value.trim();
        const sec = document.getElementById("wifiSecurity")?.value;
        if (!ssid) return alert("Ingresa el SSID.");
        qrWifi.update({ data: `WIFI:T:${sec};S:${ssid};P:${pass};;` });
        mostrarQR("body-wifi", "downloadWifiBtn");
    };

    window.generarQREmail = function() {
        const to = document.getElementById("emailTo")?.value.trim();
        const subj = document.getElementById("emailSubject")?.value.trim();
        const body = document.getElementById("emailBody")?.value.trim();
        if (!to) return alert("Ingresa el destinatario.");
        let mailto = `mailto:${to}`;
        const params = [];
        if (subj) params.push(`subject=${encodeURIComponent(subj)}`);
        if (body) params.push(`body=${encodeURIComponent(body)}`);
        if (params.length) mailto += '?' + params.join('&');
        qrEmail.update({ data: mailto });
        mostrarQR("body-email", "downloadEmailBtn");
    };

    window.generarQRPhone = function() {
        const phone = document.getElementById("phoneNumber")?.value.trim();
        if (!phone) return alert("Ingresa el número.");
        qrPhone.update({ data: `tel:${phone}` });
        mostrarQR("body-phone", "downloadPhoneBtn");
    };

    window.generarQRWhatsApp = function() {
        let phone = document.getElementById("waNumber")?.value.trim();
        const msg = document.getElementById("waMessage")?.value.trim();
        if (!phone) return alert("Ingresa el número de WhatsApp.");
        phone = phone.replace(/\D/g, "");
        if (phone.startsWith("0")) phone = phone.slice(1);
        let data = `https://wa.me/${phone}`;
        if (msg) data += `?text=${encodeURIComponent(msg)}`;
        qrWhatsApp.update({ data });
        mostrarQR("body-whatsapp", "downloadWhatsAppBtn");
    };

    window.generarQRVcard = function() {
        const name = document.getElementById("vcName")?.value.trim();
        const ph = document.getElementById("vcPhone")?.value.trim();
        const em = document.getElementById("vcEmail")?.value.trim();
        const org = document.getElementById("vcOrg")?.value.trim();
        const url = document.getElementById("vcUrl")?.value.trim();
        if (!name) return alert("Ingresa el nombre.");
        if (!ph && !em) return alert("Ingresa al menos un teléfono o correo.");
        let vcf = "BEGIN:VCARD\nVERSION:3.0\n";
        vcf += `FN:${name}\n`;
        if (org) vcf += `ORG:${org}\n`;
        if (ph) vcf += `TEL:${ph}\n`;
        if (em) vcf += `EMAIL:${em}\n`;
        if (url) vcf += `URL:${url}\n`;
        vcf += "END:VCARD";
        qrVcard.update({ data: vcf });
        mostrarQR("body-vcard", "downloadVcardBtn");
    };

    window.generarQRSms = function() {
        const phone = document.getElementById("smsNumber")?.value.trim();
        const msg = document.getElementById("smsMessage")?.value.trim();
        if (!phone) return alert("Ingresa el número.");
        let data = `SMSTO:${phone}`;
        if (msg) data += `:${msg}`;
        qrSms.update({ data });
        mostrarQR("body-sms", "downloadSmsBtn");
    };

    window.generarQRLocation = function() {
        const address = document.getElementById("locAddress")?.value.trim();
        if (!address) return alert("Ingresa una dirección.");
        qrLocation.update({ data: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` });
        mostrarQR("body-location", "downloadLocationBtn");
    };

    window.generarQREvent = function() {
        const title = document.getElementById("evTitle")?.value.trim();
        const desc = document.getElementById("evDesc")?.value.trim();
        const loc = document.getElementById("evLocation")?.value.trim();
        const start = document.getElementById("evStart")?.value;
        if (!title) return alert("Ingresa el título del evento.");
        if (!start) return alert("Selecciona la fecha de inicio.");
        const toIcsDate = (v) => v.replace(/[-:]/g, "").replace("T", "");
        let vevent = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n";
        vevent += `SUMMARY:${title}\n`;
        if (desc) vevent += `DESCRIPTION:${desc}\n`;
        if (loc) vevent += `LOCATION:${loc}\n`;
        vevent += `DTSTART:${toIcsDate(start)}\n`;
        const end = document.getElementById("evEnd")?.value;
        if (end) vevent += `DTEND:${toIcsDate(end)}\n`;
        vevent += "END:VEVENT\nEND:VCALENDAR";
        qrEvent.update({ data: vevent });
        mostrarQR("body-event", "downloadEventBtn");
    };
})();