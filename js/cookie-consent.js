// Gestión del banner de consentimiento de cookies
(function () {
  'use strict';

  const STORAGE_KEY = 'qr_cookie_consent';
  const settings = window.CookieConsentSettings || {};

  function getConsent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function setConsent(level) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(level));
    hideBanner();
    applyConsent(level);
  }

  function hideBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner) banner.classList.remove('visible');
  }

  function injectScript(src, attrs) {
    return new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = src;
      if (attrs) {
        Object.keys(attrs).forEach((k) => (s[k] = attrs[k]));
      }
      if (!s.async) s.async = true;
      s.setAttribute('data-script', 'consent-gated');
      s.addEventListener('load', () => resolve(true));
      s.addEventListener('error', () => resolve(false));
      document.head.appendChild(s);
    });
  }

  function applyConsent(level) {
    // Se ejecuta al dar consentimiento o si el usuario ya había aceptado antes.
    if (!level || !level.analytics) return;

    const isPlaceholder = (v) => !v || v.indexOf('XXXX') !== -1;

    // Google AdSense. Solo se carga cuando configures tu Publisher ID real.
    if (settings.adsenseDataAdClient && !isPlaceholder(settings.adsenseDataAdClient) && !document.querySelector('[data-script="adsense"]')) {
      const s = document.createElement('script');
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + settings.adsenseDataAdClient;
      s.async = true;
      s.crossOrigin = 'anonymous';
      s.setAttribute('data-script', 'adsense');
      document.head.appendChild(s);
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }

    // Google Analytics 4. Solo se carga cuando configures tu Measurement ID real.
    if (settings.gaMeasurementId && !isPlaceholder(settings.gaMeasurementId) && !window['ga-gt' + settings.gaMeasurementId]) {
      injectScript('https://www.googletagmanager.com/gtag/js?id=' + settings.gaMeasurementId);
      const s2 = document.createElement('script');
      s2.innerHTML =
        "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" +
        settings.gaMeasurementId + "',{ anonymize_ip:true });";
      document.head.appendChild(s2);
    }
  }

  function showBanner() {
    if (getConsent()) return; // Si ya respondió, no mostrar de nuevo
    const banner = document.getElementById('cookieConsentBanner');
    if (!banner) return;
    // Pequeño retardo para no molestar al cargar
    setTimeout(() => banner.classList.add('visible'), 1500);
  }

  function bind() {
    document.getElementById('cookieAccept')?.addEventListener('click', () =>
      setConsent({ essentials: true, analytics: true })
    );
    document.getElementById('cookieDecline')?.addEventListener('click', () =>
      setConsent({ essentials: true, analytics: false })
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    bind();
    showBanner();
    // Si el usuario ya aceptó antes, cargar los scripts en esta visita
    const consent = getConsent();
    if (consent) applyConsent(consent);
  });
})();