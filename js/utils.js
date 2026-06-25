// Utilidades generales para la aplicación

// Formatear nombres de archivo
const formatFileName = (name) => {
    return name
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
};

// Validar URL (corregido para devolver false cuando no es válida)
const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

// Mostrar notificaciones con estilo glassmorphism moderno
const showNotification = (message, type = 'info') => {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    
    // Colores según tipo
    const bgColors = {
        error: 'rgba(220, 38, 38, 0.9)',
        success: 'rgba(16, 185, 129, 0.9)',
        info: 'rgba(108, 92, 231, 0.9)'
    };
    
    // Estilos glass inline (no dependen de Tailwind)
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 14px 24px;
        border-radius: 16px;
        background: ${bgColors[type] || bgColors.info};
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        color: white;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 0.95rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        z-index: 9999;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remover después de 3 segundos (con desvanecimiento)
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// Detectar dispositivo móvil
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Copiar texto al portapapeles
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('¡Copiado al portapapeles!', 'success');
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