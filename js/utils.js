// Utilidades generales para la aplicación

// Formatear nombres de archivo
const formatFileName = (name) => {
    return name
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
};

// Validar URL
const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

// Mostrar notificaciones
const showNotification = (message, type = 'info') => {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${type === 'error' ? 'bg-red-500 text-white' :
            type === 'success' ? 'bg-green-500 text-white' :
                'bg-blue-500 text-white'
        }`;
    notification.textContent = message;

    // Añadir al DOM
    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
};

// Detectar dispositivo móvil
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Copiar texto al portapapeles
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Texto copiado al portapapeles', 'success');
    }).catch(err => {
        console.error('Error al copiar: ', err);
        showNotification('Error al copiar texto', 'error');
    });
};

// Exportar funciones para uso global
window.utils = {
    formatFileName,
    isValidUrl,
    showNotification,
    isMobile,
    copyToClipboard
};