/**
 * ===================================
 * PRELOADER ULTRA MINIMALISTA ENTERPRISE 2025
 * ===================================
 */


'use strict';

// ===================================
// CONFIGURACIÓN GLOBAL ENTERPRISE
// ===================================

/**
 * Configuración principal del sistema ultra minimalista
 * con arquitectura enterprise robusta pero interfaz limpia
 */
const MINIMAL_PRELOADER_CONFIG = Object.freeze({
  // Core Configuration
  SYSTEM_NAME: 'MinimalPreloaderEnterprise',
  VERSION: '3.0.0',
  BUILD_TIMESTAMP: Date.now(),
  
  // Redirection Configuration - CRITICAL
  REDIRECT_URL: 'Servicios-main/servicio.html',
  AUTO_REDIRECT: true,
  REDIRECT_DELAY: 50, // Inmediato después de fade-out
  FADE_OUT_DURATION: 300,
  
  // Loading Phases Configuration
  BASE_DURATION: 5500, // 5.5 segundos base
  PHASE_COUNT: 8,
  
  // Network Optimization Thresholds
  NETWORK_OPTIMIZATION: Object.freeze({
    FAST_CONNECTION: 4500,    // < 4.5s para conexiones rápidas
    NORMAL_CONNECTION: 5500,  // 5.5s para conexiones normales  
    SLOW_CONNECTION: 7000,    // 7s para conexiones lentas
    OFFLINE_FALLBACK: 3000    // 3s si no hay conexión
  }),
  
  // Progress Phase Definitions
  LOADING_PHASES: Object.freeze([
    {
      id: 1,
      progress: 0,
      targetProgress: 12,
      duration: 700,
      message: "Inicializando servicios...",
      weight: 1.0,
      priority: 'high'
    },
    {
      id: 2, 
      progress: 12,
      targetProgress: 25,
      duration: 800,
      message: "Cargando recursos...",
      weight: 1.2,
      priority: 'high'
    },
    {
      id: 3,
      progress: 25, 
      targetProgress: 40,
      duration: 900,
      message: "Preparando interfaz...",
      weight: 1.1,
      priority: 'medium'
    },
    {
      id: 4,
      progress: 40,
      targetProgress: 55, 
      duration: 800,
      message: "Conectando servicios...",
      weight: 1.0,
      priority: 'high'
    },
    {
      id: 5,
      progress: 55,
      targetProgress: 72,
      duration: 700,
      message: "Verificando datos...",
      weight: 0.9,
      priority: 'medium'
    },
    {
      id: 6,
      progress: 72,
      targetProgress: 88,
      duration: 600,
      message: "Finalizando carga...",
      weight: 0.8,
      priority: 'low'
    },
    {
      id: 7,
      progress: 88,
      targetProgress: 100,
      duration: 400,
      message: "Redirigiendo...",
      weight: 0.7,
      priority: 'critical'
    },
    {
      id: 8,
      progress: 100,
      targetProgress: 100,
      duration: 200,
      message: "Completando...",
      weight: 0.5,
      priority: 'critical'
    }
  ]),
  
  // Animation Configuration
  ANIMATIONS: Object.freeze({
    LOGO_FADE_DURATION: 1200,
    LOGO_BREATHING_CYCLE: 8000,
    PROGRESS_SMOOTH_DURATION: 100,
    TEXT_UPDATE_DURATION: 200,
    SHIMMER_CYCLE: 2000,
    ENTRANCE_STAGGER: 300,
    EXIT_TRANSITION: 300
  }),
  
  // Performance Configuration 
  PERFORMANCE: Object.freeze({
    FPS_TARGET: 60,
    MEMORY_THRESHOLD_MB: 50,
    CPU_THRESHOLD_PERCENT: 30,
    ANIMATION_QUALITY: 'high', // high, medium, low, auto
    ENABLE_GPU_ACCELERATION: true,
    ENABLE_HARDWARE_ACCELERATION: true,
    PREFETCH_ENABLED: true,
    PRELOAD_ENABLED: true,
    RESOURCE_HINTS_ENABLED: true
  }),
  
  // Error Handling Configuration
  ERROR_HANDLING: Object.freeze({
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 1000,
    FALLBACK_REDIRECT_DELAY: 2000,
    ENABLE_ERROR_REPORTING: true,
    ENABLE_GRACEFUL_DEGRADATION: true,
    ENABLE_OFFLINE_SUPPORT: true
  }),
  
  // Debug Configuration
  DEBUG: Object.freeze({
    ENABLED: typeof window !== 'undefined' && 
             (window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1' ||
              window.location.search.includes('debug=true')),
    CONSOLE_LOGGING: true,
    PERFORMANCE_MONITORING: true,
    MEMORY_MONITORING: true,
    NETWORK_MONITORING: true,
    ERROR_TRACKING: true,
    ANALYTICS_SIMULATION: false,
    VERBOSE_LOGGING: false
  }),
  
  // Accessibility Configuration
  ACCESSIBILITY: Object.freeze({
    ENABLE_SCREEN_READER: true,
    ENABLE_KEYBOARD_NAVIGATION: true,
    ENABLE_HIGH_CONTRAST: true,
    ENABLE_REDUCED_MOTION: true,
    ENABLE_FOCUS_MANAGEMENT: true,
    ENABLE_ARIA_LIVE_REGIONS: true,
    ENABLE_SEMANTIC_MARKUP: true
  }),
  
  // Feature Flags
  FEATURES: Object.freeze({
    ENABLE_NETWORK_DETECTION: true,
    ENABLE_DEVICE_DETECTION: true,
    ENABLE_PERFORMANCE_MONITORING: true,
    ENABLE_ERROR_BOUNDARY: true,
    ENABLE_RESOURCE_OPTIMIZATION: true,
    ENABLE_PROGRESSIVE_ENHANCEMENT: true,
    ENABLE_GRACEFUL_DEGRADATION: true,
    ENABLE_OFFLINE_SUPPORT: false,
    ENABLE_SERVICE_WORKER: false,
    ENABLE_ANALYTICS: false
  })
});

// ===================================
// SISTEMA DE UTILIDADES ENTERPRISE
// ===================================

/**
 * Clase de utilidades enterprise con métodos optimizados
 * y soporte para múltiples patrones de diseño
 */
class EnterpriseUtilities {
  
  /**
   * Sistema de logging avanzado con múltiples niveles
   * @param {string} level - Nivel de log (debug, info, warn, error, fatal)
   * @param {string} message - Mensaje a loggear
   * @param {...any} data - Datos adicionales
   * @param {Object} context - Contexto adicional
   */
  static log(level, message, ...data) {
    if (!MINIMAL_PRELOADER_CONFIG.DEBUG.CONSOLE_LOGGING) return;
    
    const timestamp = new Date().toISOString();
    const performance = Math.round(window.performance.now());
    const memory = this.getMemoryUsage();
    
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      performance: `${performance}ms`,
      memory: `${memory}MB`,
      data: data.length > 0 ? data : undefined,
      stack: level === 'error' ? new Error().stack : undefined
    };
    
    const prefix = `[${timestamp}] [MINIMAL-ENTERPRISE] [${level.toUpperCase()}] [${performance}ms] [${memory}MB]`;
    
    const logMethods = {
      debug: console.debug,
      info: console.info,
      warn: console.warn, 
      error: console.error,
      fatal: console.error
    };
    
    const logMethod = logMethods[level] || console.log;
    
    if (MINIMAL_PRELOADER_CONFIG.DEBUG.VERBOSE_LOGGING) {
      logMethod(prefix, message, logEntry);
    } else {
      logMethod(`${prefix} ${message}`, ...data);
    }
    
    // Store log entry for potential error reporting
    if (!window.__MINIMAL_LOGS__) window.__MINIMAL_LOGS__ = [];
    window.__MINIMAL_LOGS__.push(logEntry);
    
    // Keep only last 100 log entries to prevent memory leaks
    if (window.__MINIMAL_LOGS__.length > 100) {
      window.__MINIMAL_LOGS__ = window.__MINIMAL_LOGS__.slice(-50);
    }
  }
  
  /**
   * Obtiene uso de memoria actual
   * @returns {number} Memoria en MB
   */
  static getMemoryUsage() {
    if (performance.memory) {
      return Math.round(performance.memory.usedJSHeapSize / 1048576);
    }
    return 0;
  }
  
  /**
   * Detecta información del dispositivo con análisis profundo
   * @returns {Object} Información completa del dispositivo
   */
  static detectDevice() {
    const screen = window.screen || {};
    const nav = navigator;
    
    const deviceInfo = {
      // Screen Information
      screenWidth: screen.width || window.innerWidth,
      screenHeight: screen.height || window.innerHeight,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      pixelRatio: window.devicePixelRatio || 1,
      colorDepth: screen.colorDepth || 24,
      
      // Device Classification
      deviceType: this.classifyDeviceType(window.innerWidth),
      deviceCategory: this.getDeviceCategory(),
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
      isRetina: window.devicePixelRatio > 1,
      isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      
      // Browser Information  
      userAgent: nav.userAgent,
      platform: nav.platform,
      language: nav.language || nav.userLanguage,
      cookieEnabled: nav.cookieEnabled,
      doNotTrack: nav.doNotTrack,
      
      // Performance Capabilities
      hardwareConcurrency: nav.hardwareConcurrency || 4,
      maxTouchPoints: nav.maxTouchPoints || 0,
      webgl: this.detectWebGLSupport(),
      
      // Feature Detection
      features: {
        webGL: this.detectWebGLSupport(),
        webGL2: this.detectWebGL2Support(),
        canvas: !!document.createElement('canvas').getContext,
        localStorage: this.testLocalStorage(),
        sessionStorage: this.testSessionStorage(),
        indexedDB: !!window.indexedDB,
        serviceWorker: 'serviceWorker' in nav,
        webAssembly: typeof WebAssembly !== 'undefined',
        intersection: 'IntersectionObserver' in window,
        mutation: 'MutationObserver' in window,
        resize: 'ResizeObserver' in window,
        performance: 'performance' in window,
        requestAnimationFrame: 'requestAnimationFrame' in window,
        requestIdleCallback: 'requestIdleCallback' in window
      }
    };
    
    this.log('info', 'Device detected', deviceInfo);
    return deviceInfo;
  }
  
  /**
   * Clasifica el tipo de dispositivo basado en el ancho
   * @param {number} width - Ancho del viewport
   * @returns {string} Tipo de dispositivo
   */
  static classifyDeviceType(width) {
    if (width <= 480) return 'mobile';
    if (width <= 768) return 'tablet';
    if (width <= 1024) return 'laptop';
    if (width <= 1440) return 'desktop';
    return 'large-desktop';
  }
  
  /**
   * Obtiene categoría específica del dispositivo
   * @returns {string} Categoría del dispositivo
   */
  static getDeviceCategory() {
    const ua = navigator.userAgent.toLowerCase();
    
    if (/iphone|ipod/.test(ua)) return 'iphone';
    if (/ipad/.test(ua)) return 'ipad'; 
    if (/android.*mobile/.test(ua)) return 'android-phone';
    if (/android/.test(ua)) return 'android-tablet';
    if (/windows phone/.test(ua)) return 'windows-phone';
    if (/mac os x/.test(ua)) return 'mac';
    if (/windows/.test(ua)) return 'windows';
    if (/linux/.test(ua)) return 'linux';
    
    return 'unknown';
  }
  
  /**
   * Detecta soporte para WebGL
   * @returns {boolean} True si WebGL está soportado
   */
  static detectWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!context;
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Detecta soporte para WebGL 2
   * @returns {boolean} True si WebGL 2 está soportado
   */
  static detectWebGL2Support() {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2');
      return !!context;
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Prueba disponibilidad de localStorage
   * @returns {boolean} True si localStorage está disponible
   */
  static testLocalStorage() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Prueba disponibilidad de sessionStorage
   * @returns {boolean} True si sessionStorage está disponible
   */
  static testSessionStorage() {
    try {
      const test = '__test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Detecta velocidad y tipo de conexión de red
   * @returns {Promise<Object>} Información de la conexión
   */
  static async detectNetworkSpeed() {
    return new Promise((resolve) => {
      const connection = navigator.connection || 
                        navigator.mozConnection || 
                        navigator.webkitConnection;
      
      let networkInfo = {
        type: 'unknown',
        effectiveType: '4g',
        downlink: 10,
        downlinkMax: Infinity,
        rtt: 100,
        saveData: false,
        speed: 'normal',
        quality: 'high'
      };
      
      if (connection) {
        networkInfo = {
          type: connection.type || 'unknown',
          effectiveType: connection.effectiveType || '4g',
          downlink: connection.downlink || 10,
          downlinkMax: connection.downlinkMax || Infinity,
          rtt: connection.rtt || 100,
          saveData: connection.saveData || false,
          speed: this.categorizeNetworkSpeed(connection.downlink || 10),
          quality: this.categorizeNetworkQuality(connection.effectiveType || '4g')
        };
      }
      
      // Realizar test de velocidad opcional
      if (MINIMAL_PRELOADER_CONFIG.FEATURES.ENABLE_NETWORK_DETECTION) {
        this.performNetworkSpeedTest()
          .then(testResult => {
            networkInfo.measuredLatency = testResult.latency;
            networkInfo.measuredSpeed = testResult.speed;
            networkInfo.testScore = testResult.score;
            resolve(networkInfo);
          })
          .catch(() => {
            resolve(networkInfo);
          });
      } else {
        resolve(networkInfo);
      }
    });
  }
  
  /**
   * Categoriza la velocidad de red
   * @param {number} downlink - Velocidad de descarga en Mbps
   * @returns {string} Categoría de velocidad
   */
  static categorizeNetworkSpeed(downlink) {
    if (downlink >= 2) return 'fast';
    if (downlink >= 0.5) return 'normal';
    return 'slow';
  }
  
  /**
   * Categoriza la calidad de red
   * @param {string} effectiveType - Tipo efectivo de conexión
   * @returns {string} Categoría de calidad
   */
  static categorizeNetworkQuality(effectiveType) {
    const qualityMap = {
      '4g': 'high',
      '3g': 'medium',
      '2g': 'low',
      'slow-2g': 'very-low'
    };
    
    return qualityMap[effectiveType] || 'medium';
  }
  
  /**
   * Realiza un test de velocidad de red básico
   * @returns {Promise<Object>} Resultados del test
   */
  static performNetworkSpeedTest() {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      const timeout = setTimeout(() => {
        reject(new Error('Network speed test timeout'));
      }, 3000);
      
      // Usar una imagen pequeña para el test de velocidad
      const testImage = new Image();
      
      testImage.onload = () => {
        clearTimeout(timeout);
        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);
        
        let speed = 'slow';
        let score = 1;
        
        if (latency < 300) {
          speed = 'fast';
          score = 3;
        } else if (latency < 1000) {
          speed = 'normal';
          score = 2;
        }
        
        resolve({
          latency,
          speed,
          score,
          timestamp: Date.now()
        });
      };
      
      testImage.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Network speed test failed'));
      };
      
      // Usar una imagen de data: para evitar requests externos
      testImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    });
  }
  
  /**
   * Genera un ID único enterprise con metadatos
   * @param {string} prefix - Prefijo opcional
   * @returns {string} ID único con información adicional
   */
  static generateEnterpriseId(prefix = 'min') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    const performance = Math.round(window.performance.now()).toString(36);
    const counter = (this._idCounter = (this._idCounter || 0) + 1).toString(36);
    
    return `${prefix}_${timestamp}_${random}_${performance}_${counter}`;
  }
  
  /**
   * Función de interpolación avanzada con múltiples curvas de easing
   * @param {number} start - Valor inicial
   * @param {number} end - Valor final  
   * @param {number} progress - Progreso (0-1)
   * @param {string} easing - Tipo de easing
   * @returns {number} Valor interpolado
   */
  static advancedLerp(start, end, progress, easing = 'easeOutCubic') {
    // Clamping del progreso
    progress = Math.max(0, Math.min(1, progress));
    
    const easingFunctions = {
      linear: t => t,
      
      // Cubic functions
      easeInCubic: t => t * t * t,
      easeOutCubic: t => 1 - Math.pow(1 - t, 3),
      easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      
      // Quad functions  
      easeInQuad: t => t * t,
      easeOutQuad: t => 1 - (1 - t) * (1 - t),
      easeInOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      
      // Quart functions
      easeInQuart: t => t * t * t * t,
      easeOutQuart: t => 1 - Math.pow(1 - t, 4),
      easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
      
      // Elastic functions
      easeInElastic: t => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
      },
      easeOutElastic: t => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      },
      
      // Back functions
      easeInBack: t => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * t * t * t - c1 * t * t;
      },
      easeOutBack: t => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      },
      
      // Bounce functions
      easeOutBounce: t => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
          return n1 * t * t;
        } else if (t < 2 / d1) {
          return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
          return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
          return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
      }
    };
    
    const easingFunction = easingFunctions[easing] || easingFunctions.easeOutCubic;
    const easedProgress = easingFunction(progress);
    
    return start + (end - start) * easedProgress;
  }
  
  /**
   * Debounce avanzado con cancelación y flush
   * @param {Function} func - Función a ejecutar
   * @param {number} wait - Tiempo de espera en ms
   * @param {Object} options - Opciones adicionales
   * @returns {Function} Función debounced con métodos adicionales
   */
  static advancedDebounce(func, wait, options = {}) {
    let timeout;
    let lastCallTime;
    let lastInvokeTime = 0;
    let leadingValue;
    let maxWait = options.maxWait;
    let result;
    let timerId;
    let lastArgs;
    let lastThis;
    
    const useRAF = options.requestAnimationFrame && typeof requestAnimationFrame === 'function';
    
    function invokeFunc(time) {
      const args = lastArgs;
      const thisArg = lastThis;
      
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = useRAF ? requestAnimationFrame(timerExpired) : setTimeout(timerExpired, wait);
      return options.leading ? invokeFunc(time) : result;
    }
    
    function remainingWait(time) {
      const timeSinceLastCall = time - lastCallTime;
      const timeSinceLastInvoke = time - lastInvokeTime;
      const timeWaiting = wait - timeSinceLastCall;
      
      return maxWait !== undefined ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    
    function shouldInvoke(time) {
      const timeSinceLastCall = time - lastCallTime;
      const timeSinceLastInvoke = time - lastInvokeTime;
      
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
              (timeSinceLastCall < 0) || (maxWait !== undefined && timeSinceLastInvoke >= maxWait));
    }
    
    function timerExpired() {
      const time = Date.now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = useRAF ? requestAnimationFrame(timerExpired) : setTimeout(timerExpired, remainingWait(time));
    }
    
    function trailingEdge(time) {
      timerId = undefined;
      
      if (options.trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }
    
    function debounced(...args) {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);
      
      lastArgs = args;
      lastThis = this;
      lastCallTime = time;
      
      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxWait !== undefined) {
          timerId = useRAF ? requestAnimationFrame(timerExpired) : setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = useRAF ? requestAnimationFrame(timerExpired) : setTimeout(timerExpired, wait);
      }
      return result;
    }
    
    debounced.cancel = () => {
      if (timerId !== undefined) {
        if (useRAF) {
          cancelAnimationFrame(timerId);
        } else {
          clearTimeout(timerId);
        }
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    };
    
    debounced.flush = () => {
      return timerId === undefined ? result : trailingEdge(Date.now());
    };
    
    debounced.pending = () => {
      return timerId !== undefined;
    };
    
    return debounced;
  }
  
  /**
   * Validación robusta de elementos DOM con retry
   * @param {Element|string} element - Elemento DOM o selector
   * @param {Object} options - Opciones de validación
   * @returns {Promise<Element>} Elemento validado
   */
  static async validateElement(element, options = {}) {
    const {
      timeout = 5000,
      retryInterval = 100,
      required = true
    } = options;
    
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const checkElement = () => {
        let el = element;
        
        if (typeof element === 'string') {
          el = document.querySelector(element);
        }
        
        if (el && el instanceof Element && el.isConnected) {
          resolve(el);
          return;
        }
        
        const elapsed = Date.now() - startTime;
        
        if (elapsed >= timeout) {
          if (required) {
            reject(new Error(`Element not found: ${element}`));
          } else {
            resolve(null);
          }
          return;
        }
        
        setTimeout(checkElement, retryInterval);
      };
      
      checkElement();
    });
  }
  
  /**
   * Throttle avanzado con opciones
   * @param {Function} func - Función a throttlear
   * @param {number} limit - Límite en ms
   * @param {Object} options - Opciones adicionales
   * @returns {Function} Función throttled
   */
  static advancedThrottle(func, limit, options = {}) {
    let inThrottle;
    let lastFunc;
    let lastRan;
    
    const { leading = true, trailing = true } = options;
    
    return function throttled(...args) {
      if (!inThrottle) {
        if (leading) {
          func.apply(this, args);
          lastRan = Date.now();
        }
        inThrottle = true;
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            if (trailing) {
              func.apply(this, args);
            }
            lastRan = Date.now();
            inThrottle = false;
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
  
  /**
   * Gestión de memoria avanzada con cleanup automático
   * @returns {Object} Información de memoria y cleanup
   */
  static memoryManager() {
    const cleanup = [];
    
    const addCleanup = (cleanupFn) => {
      cleanup.push(cleanupFn);
    };
    
    const executeCleanup = () => {
      cleanup.forEach(fn => {
        try {
          fn();
        } catch (error) {
          this.log('error', 'Cleanup function failed:', error);
        }
      });
      cleanup.length = 0;
    };
    
    const getMemoryInfo = () => {
      if (performance.memory) {
        return {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576),
          total: Math.round(performance.memory.totalJSHeapSize / 1048576),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
        };
      }
      return null;
    };
    
    return {
      addCleanup,
      executeCleanup,
      getMemoryInfo,
      cleanup: cleanup.length
    };
  }
}

// ===================================
// GESTOR DE PROGRESO ULTRA ROBUSTO
// ===================================

/**
 * Gestor de progreso enterprise con arquitectura avanzada
 * Implementa múltiples patrones de diseño y optimizaciones
 */
class EnterpriseProgressManager {
  
  constructor(config = {}) {
    // Core Properties
    this.id = EnterpriseUtilities.generateEnterpriseId('progress');
    this.config = { ...MINIMAL_PRELOADER_CONFIG, ...config };
    
    // State Management
    this.state = {
      isActive: false,
      isCompleted: false,
      isPaused: false,
      currentPhase: 0,
      currentProgress: 0,
      startTime: null,
      endTime: null,
      duration: null,
      error: null
    };
    
    // Event System
    this.eventListeners = new Map();
    this.eventQueue = [];
    
    // Performance Monitoring
    this.performanceMetrics = {
      startTimestamp: null,
      phaseTimestamps: [],
      frameRateHistory: [],
      memoryHistory: [],
      networkLatency: null
    };
    
    // Resource Management
    this.resources = {
      timeouts: new Set(),
      intervals: new Set(),
      animationFrames: new Set(),
      eventListeners: new Map()
    };
    
    // Error Handling
    this.errorHandler = new EnterpriseErrorHandler(this.id);
    
    // Memory Management
    this.memoryManager = EnterpriseUtilities.memoryManager();
    
    // Initialize
    this.initialize();
    
    EnterpriseUtilities.log('info', `ProgressManager ${this.id} initialized`);
  }
  
  /**
   * Inicializa el gestor de progreso
   */
  initialize() {
    try {
      // Setup error boundary
      this.setupErrorBoundary();
      
      // Setup performance monitoring
      this.setupPerformanceMonitoring();
      
      // Setup cleanup handlers
      this.setupCleanupHandlers();
      
      // Validate configuration
      this.validateConfiguration();
      
      EnterpriseUtilities.log('info', 'ProgressManager initialized successfully');
      
    } catch (error) {
      this.handleError('initialization', error);
    }
  }
  
  /**
   * Configura boundary de errores
   */
  setupErrorBoundary() {
    window.addEventListener('error', (event) => {
      this.handleError('global', event.error);
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError('promise', event.reason);
    });
  }
  
  /**
   * Configura monitoreo de performance
   */
  setupPerformanceMonitoring() {
    if (!MINIMAL_PRELOADER_CONFIG.DEBUG.PERFORMANCE_MONITORING) return;
    
    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    
    const monitorFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.performanceMetrics.frameRateHistory.push(fps);
        
        if (this.performanceMetrics.frameRateHistory.length > 10) {
          this.performanceMetrics.frameRateHistory.shift();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      if (this.state.isActive) {
        this.scheduleAnimationFrame(monitorFrameRate);
      }
    };
    
    this.scheduleAnimationFrame(monitorFrameRate);
    
    // Monitor memory usage
    const monitorMemory = () => {
      const memoryInfo = this.memoryManager.getMemoryInfo();
      if (memoryInfo) {
        this.performanceMetrics.memoryHistory.push(memoryInfo.used);
        
        if (this.performanceMetrics.memoryHistory.length > 20) {
          this.performanceMetrics.memoryHistory.shift();
        }
        
        // Check memory threshold
        if (memoryInfo.used > MINIMAL_PRELOADER_CONFIG.PERFORMANCE.MEMORY_THRESHOLD_MB) {
          EnterpriseUtilities.log('warn', `Memory usage high: ${memoryInfo.used}MB`);
          this.optimizeMemoryUsage();
        }
      }
      
      if (this.state.isActive) {
        this.scheduleTimeout(monitorMemory, 2000);
      }
    };
    
    this.scheduleTimeout(monitorMemory, 1000);
  }
  
  /**
   * Configura handlers de cleanup
   */
  setupCleanupHandlers() {
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
    
    // Cleanup on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
  }
  
  /**
   * Valida la configuración
   */
  validateConfiguration() {
    const phases = this.config.LOADING_PHASES;
    
    if (!Array.isArray(phases) || phases.length === 0) {
      throw new Error('Invalid loading phases configuration');
    }
    
    // Validate phase progression
    let lastProgress = 0;
    for (const phase of phases) {
      if (phase.targetProgress < lastProgress) {
        throw new Error(`Invalid phase progression at phase ${phase.id}`);
      }
      lastProgress = phase.targetProgress;
    }
    
    if (lastProgress !== 100) {
      throw new Error('Final phase must reach 100% progress');
    }
    
    EnterpriseUtilities.log('info', 'Configuration validated successfully');
  }
  
  /**
   * Inicia el progreso
   * @param {Object} callbacks - Callbacks del sistema
   * @returns {Promise} Promise que se resuelve cuando inicia
   */
  async start(callbacks = {}) {
    if (this.state.isActive) {
      EnterpriseUtilities.log('warn', 'Progress already active');
      return;
    }
    
    try {
      EnterpriseUtilities.log('info', 'Starting progress sequence...');
      
      // Reset state
      this.resetState();
      
      // Set callbacks
      this.setCallbacks(callbacks);
      
      // Detect network conditions
      await this.detectNetworkConditions();
      
      // Calculate optimized duration
      this.calculateOptimizedDuration();
      
      // Mark as active
      this.state.isActive = true;
      this.state.startTime = Date.now();
      this.performanceMetrics.startTimestamp = performance.now();
      
      // Emit start event
      this.emit('start', { state: this.state });
      
      // Execute phases
      await this.executeProgressPhases();
      
      EnterpriseUtilities.log('info', 'Progress sequence started successfully');
      
    } catch (error) {
      this.handleError('start', error);
      throw error;
    }
  }
  
  /**
   * Resetea el estado
   */
  resetState() {
    this.state = {
      isActive: false,
      isCompleted: false,
      isPaused: false,
      currentPhase: 0,
      currentProgress: 0,
      startTime: null,
      endTime: null,
      duration: null,
      error: null
    };
    
    this.performanceMetrics.phaseTimestamps = [];
    this.performanceMetrics.frameRateHistory = [];
    this.performanceMetrics.memoryHistory = [];
  }
  
  /**
   * Configura callbacks
   * @param {Object} callbacks - Objeto con callbacks
   */
  setCallbacks(callbacks) {
    const defaultCallbacks = {
      onProgressUpdate: () => {},
      onPhaseChange: () => {},
      onComplete: () => {},
      onError: () => {}
    };
    
    this.callbacks = { ...defaultCallbacks, ...callbacks };
  }
  
  /**
   * Detecta condiciones de red
   * @returns {Promise} Promise que se resuelve con info de red
   */
  async detectNetworkConditions() {
    try {
      if (MINIMAL_PRELOADER_CONFIG.FEATURES.ENABLE_NETWORK_DETECTION) {
        const networkInfo = await EnterpriseUtilities.detectNetworkSpeed();
        this.networkInfo = networkInfo;
        
        EnterpriseUtilities.log('info', 'Network conditions detected:', networkInfo);
      }
    } catch (error) {
      EnterpriseUtilities.log('warn', 'Network detection failed:', error);
      this.networkInfo = { speed: 'normal' };
    }
  }
  
  /**
   * Calcula duración optimizada basada en condiciones de red
   */
  calculateOptimizedDuration() {
    const networkSpeed = this.networkInfo?.speed || 'normal';
    const optimization = this.config.NETWORK_OPTIMIZATION;
    
    let baseDuration = optimization.NORMAL_CONNECTION;
    
    switch (networkSpeed) {
      case 'fast':
        baseDuration = optimization.FAST_CONNECTION;
        break;
      case 'slow':
        baseDuration = optimization.SLOW_CONNECTION;
        break;
      default:
        baseDuration = optimization.NORMAL_CONNECTION;
    }
    
    this.optimizedDuration = baseDuration;
    
    EnterpriseUtilities.log('info', `Optimized duration: ${baseDuration}ms for ${networkSpeed} network`);
  }
  
  /**
   * Ejecuta las fases de progreso
   * @returns {Promise} Promise que se resuelve cuando todas las fases terminan
   */
  async executeProgressPhases() {
    const phases = this.config.LOADING_PHASES;
    let cumulativeDelay = 0;
    
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      
      // Calculate adjusted duration based on network optimization
      const adjustedDuration = Math.round(phase.duration * (this.optimizedDuration / this.config.BASE_DURATION));
      
      // Schedule phase execution
      this.scheduleTimeout(() => {
        if (!this.state.isActive || this.state.isPaused) return;
        
        this.executePhase(phase, i);
      }, cumulativeDelay);
      
      cumulativeDelay += adjustedDuration;
    }
    
    // Schedule completion
    this.scheduleTimeout(() => {
      if (this.state.isActive && !this.state.isCompleted) {
        this.complete();
      }
    }, cumulativeDelay + 100);
  }
  
  /**
   * Ejecuta una fase específica
   * @param {Object} phase - Datos de la fase
   * @param {number} index - Índice de la fase
   */
  async executePhase(phase, index) {
    try {
      EnterpriseUtilities.log('info', `Executing phase ${phase.id}: ${phase.message}`);
      
      // Update state
      this.state.currentPhase = phase.id;
      this.performanceMetrics.phaseTimestamps.push({
        phase: phase.id,
        timestamp: performance.now(),
        message: phase.message
      });
      
      // Emit phase change
      this.emit('phaseChange', {
        phase: phase.id,
        message: phase.message,
        index,
        totalPhases: this.config.LOADING_PHASES.length
      });
      
      // Call callback
      this.callbacks.onPhaseChange({
        phase: phase.id,
        message: phase.message,
        index,
        totalPhases: this.config.LOADING_PHASES.length,
        progress: phase.targetProgress
      });
      
      // Animate progress to target
      await this.animateProgressToTarget(phase.targetProgress, phase.duration);
      
    } catch (error) {
      this.handleError('phase', error, { phase: phase.id });
    }
  }
  
  /**
   * Anima el progreso hacia un objetivo
   * @param {number} targetProgress - Progreso objetivo (0-100)
   * @param {number} duration - Duración en ms
   * @returns {Promise} Promise que se resuelve cuando la animación termina
   */
  async animateProgressToTarget(targetProgress, duration) {
    return new Promise((resolve) => {
      const startProgress = this.state.currentProgress;
      const progressDiff = targetProgress - startProgress;
      const startTime = performance.now();
      
      // Adjust duration based on network conditions
      const adjustedDuration = Math.round(duration * (this.optimizedDuration / this.config.BASE_DURATION));
      
      const animate = (currentTime) => {
        if (!this.state.isActive || this.state.isPaused) {
          resolve();
          return;
        }
        
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / adjustedDuration, 1);
        
        // Apply easing
        const easedProgress = EnterpriseUtilities.advancedLerp(0, 1, progress, 'easeOutCubic');
        const currentValue = startProgress + (progressDiff * easedProgress);
        
        // Update progress
        this.updateProgress(currentValue);
        
        if (progress < 1) {
          this.scheduleAnimationFrame(animate);
        } else {
          this.updateProgress(targetProgress);
          resolve();
        }
      };
      
      this.scheduleAnimationFrame(animate);
    });
  }
  
  /**
   * Actualiza el progreso
   * @param {number} newProgress - Nuevo valor de progreso
   */
  updateProgress(newProgress) {
    const clampedProgress = Math.max(0, Math.min(100, newProgress));
    this.state.currentProgress = clampedProgress;
    
    // Emit progress update
    this.emit('progressUpdate', {
      progress: clampedProgress,
      phase: this.state.currentPhase,
      state: this.state
    });
    
    // Call callback
    this.callbacks.onProgressUpdate({
      progress: clampedProgress,
      phase: this.state.currentPhase,
      isCompleted: clampedProgress >= 100
    });
  }
  
  /**
   * Completa el progreso
   */
  async complete() {
    if (this.state.isCompleted || !this.state.isActive) return;
    
    EnterpriseUtilities.log('info', 'Progress sequence completed');
    
    // Update state
    this.state.isCompleted = true;
    this.state.isActive = false;
    this.state.endTime = Date.now();
    this.state.duration = this.state.endTime - this.state.startTime;
    
    // Ensure 100% progress
    this.updateProgress(100);
    
    // Emit completion
    this.emit('complete', {
      state: this.state,
      duration: this.state.duration,
      metrics: this.getPerformanceMetrics()
    });
    
    // Call callback
    this.callbacks.onComplete({
      state: this.state,
      duration: this.state.duration,
      metrics: this.getPerformanceMetrics()
    });
    
    // Cleanup resources after delay
    this.scheduleTimeout(() => {
      this.cleanup();
    }, 1000);
  }
  
  /**
   * Pausa el progreso
   */
  pause() {
    if (!this.state.isActive || this.state.isPaused) return;
    
    this.state.isPaused = true;
    this.emit('pause', { state: this.state });
    
    EnterpriseUtilities.log('info', 'Progress paused');
  }
  
  /**
   * Reanuda el progreso
   */
  resume() {
    if (!this.state.isPaused) return;
    
    this.state.isPaused = false;
    this.emit('resume', { state: this.state });
    
    EnterpriseUtilities.log('info', 'Progress resumed');
  }
  
  /**
   * Detiene y resetea el progreso
   */
  stop() {
    if (!this.state.isActive) return;
    
    EnterpriseUtilities.log('info', 'Progress stopped');
    
    this.state.isActive = false;
    this.state.isPaused = false;
    
    this.emit('stop', { state: this.state });
    
    this.cleanup();
  }
  
  /**
   * Maneja errores
   * @param {string} context - Contexto del error
   * @param {Error} error - Error ocurrido
   * @param {Object} meta - Metadatos adicionales
   */
  handleError(context, error, meta = {}) {
    const errorInfo = {
      context,
      error: error.message || error,
      stack: error.stack,
      timestamp: Date.now(),
      state: this.state,
      meta
    };
    
    this.state.error = errorInfo;
    
    EnterpriseUtilities.log('error', `Progress error in ${context}:`, errorInfo);
    
    this.emit('error', errorInfo);
    this.callbacks.onError(errorInfo);
    
    // Attempt recovery
    this.attemptRecovery(context, error);
  }
  
  /**
   * Intenta recuperarse de errores
   * @param {string} context - Contexto del error
   * @param {Error} error - Error ocurrido
   */
  attemptRecovery(context, error) {
    if (this.config.ERROR_HANDLING.ENABLE_GRACEFUL_DEGRADATION) {
      EnterpriseUtilities.log('info', 'Attempting error recovery...');
      
      // Implement recovery strategies based on context
      switch (context) {
        case 'phase':
          // Continue to next phase
          this.scheduleTimeout(() => {
            if (this.state.currentPhase < this.config.LOADING_PHASES.length) {
              const nextPhase = this.config.LOADING_PHASES[this.state.currentPhase];
              if (nextPhase) {
                this.executePhase(nextPhase, this.state.currentPhase);
              }
            } else {
              this.complete();
            }
          }, 500);
          break;
          
        case 'animation':
          // Skip to target progress directly
          this.updateProgress(100);
          this.complete();
          break;
          
        default:
          // Generic recovery
          this.scheduleTimeout(() => {
            this.complete();
          }, 1000);
      }
    }
  }
  
  /**
   * Sistema de eventos
   * @param {string} eventName - Nombre del evento
   * @param {Function} listener - Función listener
   */
  on(eventName, listener) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set());
    }
    this.eventListeners.get(eventName).add(listener);
  }
  
  /**
   * Emite un evento
   * @param {string} eventName - Nombre del evento
   * @param {any} data - Datos del evento
   */
  emit(eventName, data) {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          EnterpriseUtilities.log('error', `Event listener error for ${eventName}:`, error);
        }
      });
    }
  }
  
  /**
   * Programa un timeout de manera controlada
   * @param {Function} callback - Función a ejecutar
   * @param {number} delay - Delay en ms
   * @returns {number} ID del timeout
   */
  scheduleTimeout(callback, delay) {
    const timeoutId = setTimeout(() => {
      this.resources.timeouts.delete(timeoutId);
      callback();
    }, delay);
    
    this.resources.timeouts.add(timeoutId);
    return timeoutId;
  }
  
  /**
   * Programa un animation frame de manera controlada
   * @param {Function} callback - Función a ejecutar
   * @returns {number} ID del animation frame
   */
  scheduleAnimationFrame(callback) {
    const rafId = requestAnimationFrame((time) => {
      this.resources.animationFrames.delete(rafId);
      callback(time);
    });
    
    this.resources.animationFrames.add(rafId);
    return rafId;
  }
  
  /**
   * Obtiene métricas de performance
   * @returns {Object} Métricas de performance
   */
  getPerformanceMetrics() {
    const avgFrameRate = this.performanceMetrics.frameRateHistory.reduce((a, b) => a + b, 0) / 
                        this.performanceMetrics.frameRateHistory.length || 0;
    
    const avgMemory = this.performanceMetrics.memoryHistory.reduce((a, b) => a + b, 0) / 
                     this.performanceMetrics.memoryHistory.length || 0;
    
    return {
      duration: this.state.duration,
      averageFrameRate: Math.round(avgFrameRate),
      averageMemoryUsage: Math.round(avgMemory),
      phaseCount: this.performanceMetrics.phaseTimestamps.length,
      networkInfo: this.networkInfo,
      timestamps: this.performanceMetrics.phaseTimestamps
    };
  }
  
  /**
   * Optimiza uso de memoria
   */
  optimizeMemoryUsage() {
    EnterpriseUtilities.log('info', 'Optimizing memory usage...');
    
    // Clear old frame rate history
    if (this.performanceMetrics.frameRateHistory.length > 5) {
      this.performanceMetrics.frameRateHistory = this.performanceMetrics.frameRateHistory.slice(-3);
    }
    
    // Clear old memory history
    if (this.performanceMetrics.memoryHistory.length > 10) {
      this.performanceMetrics.memoryHistory = this.performanceMetrics.memoryHistory.slice(-5);
    }
    
    // Run garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }
  
  /**
   * Obtiene estado actual
   * @returns {Object} Estado completo del sistema
   */
  getState() {
    return {
      ...this.state,
      id: this.id,
      config: this.config,
      performanceMetrics: this.getPerformanceMetrics(),
      resourceCount: {
        timeouts: this.resources.timeouts.size,
        animationFrames: this.resources.animationFrames.size,
        eventListeners: this.eventListeners.size
      }
    };
  }
  
  /**
   * Limpia todos los recursos
   */
  cleanup() {
    EnterpriseUtilities.log('info', `Cleaning up ProgressManager ${this.id}`);
    
    // Clear timeouts
    this.resources.timeouts.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    this.resources.timeouts.clear();
    
    // Clear intervals
    this.resources.intervals.forEach(intervalId => {
      clearInterval(intervalId);
    });
    this.resources.intervals.clear();
    
    // Clear animation frames
    this.resources.animationFrames.forEach(rafId => {
      cancelAnimationFrame(rafId);
    });
    this.resources.animationFrames.clear();
    
    // Clear event listeners
    this.eventListeners.clear();
    
    // Execute memory manager cleanup
    this.memoryManager.executeCleanup();
    
    EnterpriseUtilities.log('info', 'ProgressManager cleanup completed');
  }
  
  /**
   * Destructor del objeto
   */
  destroy() {
    this.stop();
    this.cleanup();
    
    // Clear all references
    this.callbacks = null;
    this.networkInfo = null;
    this.performanceMetrics = null;
    this.resources = null;
    this.memoryManager = null;
    
    EnterpriseUtilities.log('info', `ProgressManager ${this.id} destroyed`);
  }
}

// ===================================
// SISTEMA DE MANEJO DE ERRORES ENTERPRISE
// ===================================

/**
 * Sistema de manejo de errores enterprise con reporting y recovery
 */
class EnterpriseErrorHandler {
  constructor(contextId) {
    this.contextId = contextId;
    this.errorHistory = [];
    this.recoveryStrategies = new Map();
    this.initialize();
  }
  
  initialize() {
    this.setupRecoveryStrategies();
    EnterpriseUtilities.log('info', `ErrorHandler initialized for context: ${this.contextId}`);
  }
  
  setupRecoveryStrategies() {
    this.recoveryStrategies.set('network', this.networkRecovery.bind(this));
    this.recoveryStrategies.set('dom', this.domRecovery.bind(this));
    this.recoveryStrategies.set('animation', this.animationRecovery.bind(this));
    this.recoveryStrategies.set('generic', this.genericRecovery.bind(this));
  }
  
  handleError(error, context = 'generic') {
    const errorEntry = {
      id: EnterpriseUtilities.generateEnterpriseId('error'),
      timestamp: Date.now(),
      context,
      error: error.message || error,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      memory: EnterpriseUtilities.getMemoryUsage()
    };
    
    this.errorHistory.push(errorEntry);
    
    // Keep only last 20 errors
    if (this.errorHistory.length > 20) {
      this.errorHistory = this.errorHistory.slice(-10);
    }
    
    EnterpriseUtilities.log('error', `Error handled in ${context}:`, errorEntry);
    
    // Attempt recovery
    this.attemptRecovery(context, error, errorEntry);
    
    return errorEntry;
  }
  
  attemptRecovery(context, error, errorEntry) {
    const strategy = this.recoveryStrategies.get(context) || this.recoveryStrategies.get('generic');
    
    try {
      strategy(error, errorEntry);
      EnterpriseUtilities.log('info', `Recovery attempted for ${context}`);
    } catch (recoveryError) {
      EnterpriseUtilities.log('error', `Recovery failed for ${context}:`, recoveryError);
    }
  }
  
  networkRecovery(error, errorEntry) {
    // Implement network-specific recovery
    setTimeout(() => {
      // Retry network operation
      EnterpriseUtilities.log('info', 'Network recovery executed');
    }, 1000);
  }
  
  domRecovery(error, errorEntry) {
    // Implement DOM-specific recovery
    EnterpriseUtilities.log('info', 'DOM recovery executed');
  }
  
  animationRecovery(error, errorEntry) {
    // Implement animation-specific recovery
    EnterpriseUtilities.log('info', 'Animation recovery executed');
  }
  
  genericRecovery(error, errorEntry) {
    // Implement generic recovery
    EnterpriseUtilities.log('info', 'Generic recovery executed');
  }
  
  getErrorHistory() {
    return [...this.errorHistory];
  }
  
  clearErrorHistory() {
    this.errorHistory = [];
  }
}

// ===================================
// CONTROLADOR PRINCIPAL ULTRA MINIMALISTA
// ===================================

/**
 * Controlador principal minimalista con arquitectura enterprise
 * Implementa una interfaz ultra limpia con código robusto
 */
class MinimalPreloaderController {
  
  constructor() {
    // Core Properties
    this.id = EnterpriseUtilities.generateEnterpriseId('controller');
    this.isInitialized = false;
    this.isDestroyed = false;
    
    // DOM Elements
    this.elements = new Map();
    this.requiredElements = [
      'minimalPreloader',
      'premiumLogo', 
      'progressFill',
      'progressPercentage',
      'loadingStatus'
    ];
    
    // Systems
    this.progressManager = null;
    this.errorHandler = new EnterpriseErrorHandler(this.id);
    this.memoryManager = EnterpriseUtilities.memoryManager();
    
    // State Management
    this.state = {
      phase: 'initializing',
      isLoading: false,
      isRedirecting: false,
      error: null,
      startTime: null,
      networkInfo: null,
      deviceInfo: null
    };
    
    // Resource Management
    this.resources = {
      timeouts: new Set(),
      intervals: new Set(),
      animationFrames: new Set(),
      eventListeners: new Map()
    };
    
    EnterpriseUtilities.log('info', `MinimalController ${this.id} created`);
  }
  
  /**
   * Inicializa el controlador
   * @returns {Promise} Promise que se resuelve cuando está listo
   */
  async initialize() {
    if (this.isInitialized) {
      EnterpriseUtilities.log('warn', 'Controller already initialized');
      return;
    }
    
    try {
      EnterpriseUtilities.log('info', 'Initializing MinimalController...');
      
      this.state.phase = 'initializing';
      this.state.startTime = Date.now();
      
      // Detect device and network
      await this.detectEnvironment();
      
      // Get DOM elements
      await this.getDOMElements();
      
      // Validate critical elements
      this.validateElements();
      
      // Setup UI
      this.setupInitialUI();
      
      // Initialize progress manager
      this.initializeProgressManager();
      
      // Setup event handlers
      this.setupEventHandlers();
      
      // Setup cleanup
      this.setupCleanup();
      
      // Mark as initialized
      this.isInitialized = true;
      this.state.phase = 'ready';
      
      EnterpriseUtilities.log('info', 'MinimalController initialized successfully');
      
      // Start loading sequence
      await this.startLoadingSequence();
      
    } catch (error) {
      await this.handleInitializationError(error);
    }
  }
  
  /**
   * Detecta entorno (dispositivo, red, etc.)
   * @returns {Promise} Promise que se resuelve con info del entorno
   */
  async detectEnvironment() {
    try {
      // Detect device
      this.state.deviceInfo = EnterpriseUtilities.detectDevice();
      
      // Detect network
      if (MINIMAL_PRELOADER_CONFIG.FEATURES.ENABLE_NETWORK_DETECTION) {
        this.state.networkInfo = await EnterpriseUtilities.detectNetworkSpeed();
      }
      
      EnterpriseUtilities.log('info', 'Environment detected:', {
        device: this.state.deviceInfo.deviceType,
        network: this.state.networkInfo?.speed || 'unknown'
      });
      
    } catch (error) {
      EnterpriseUtilities.log('warn', 'Environment detection failed:', error);
    }
  }
  
  /**
   * Obtiene elementos DOM con retry y timeout
   * @returns {Promise} Promise que se resuelve cuando todos los elementos están listos
   */
  async getDOMElements() {
    const elementPromises = this.requiredElements.map(async (id) => {
      try {
        const element = await EnterpriseUtilities.validateElement(`#${id}`, {
          timeout: 5000,
          retryInterval: 100,
          required: true
        });
        
        this.elements.set(id, element);
        EnterpriseUtilities.log('debug', `✓ Element found: ${id}`);
        
        return element;
        
      } catch (error) {
        EnterpriseUtilities.log('error', `✗ Element not found: ${id}`, error);
        throw new Error(`Critical element missing: ${id}`);
      }
    });
    
    await Promise.all(elementPromises);
    
    // Optional elements
    const optionalElements = ['networkStatus'];
    
    for (const id of optionalElements) {
      try {
        const element = document.getElementById(id);
        if (element) {
          this.elements.set(id, element);
          EnterpriseUtilities.log('debug', `✓ Optional element found: ${id}`);
        }
      } catch (error) {
        EnterpriseUtilities.log('debug', `Optional element not found: ${id}`);
      }
    }
  }
  
  /**
   * Valida elementos críticos
   */
  validateElements() {
    const missing = this.requiredElements.filter(id => !this.elements.has(id));
    
    if (missing.length > 0) {
      throw new Error(`Critical elements missing: ${missing.join(', ')}`);
    }
    
    EnterpriseUtilities.log('info', 'All critical elements validated');
  }
  
  /**
   * Configura UI inicial
   */
  setupInitialUI() {
    try {
      // Ensure preloader is visible
      const preloader = this.elements.get('minimalPreloader');
      if (preloader) {
        preloader.classList.remove('fade-out', 'hidden');
        preloader.style.display = '';
      }
      
      // Initialize progress
      this.updateProgress(0);
      
      // Initialize status
      this.updateStatus('Inicializando servicios...');
      
      // Setup logo animation
      this.initializeLogoAnimation();
      
      // Update network indicator
      this.updateNetworkIndicator();
      
      EnterpriseUtilities.log('info', 'Initial UI configured');
      
    } catch (error) {
      this.errorHandler.handleError(error, 'ui-setup');
    }
  }
  
  /**
   * Inicializa animación del logo
   */
  initializeLogoAnimation() {
    const logo = this.elements.get('premiumLogo');
    if (!logo) return;
    
    // Ensure logo is visible and animated
    logo.style.opacity = '1';
    logo.classList.add('fade-in');
    
    // Start breathing animation after load
    const startBreathing = () => {
      logo.style.animationPlayState = 'running';
    };
    
    if (logo.complete && logo.naturalHeight !== 0) {
      startBreathing();
    } else {
      logo.addEventListener('load', startBreathing, { once: true });
      logo.addEventListener('error', () => {
        EnterpriseUtilities.log('warn', 'Logo failed to load');
      }, { once: true });
    }
  }
  
  /**
   * Actualiza indicador de red
   */
  updateNetworkIndicator() {
    const networkIndicator = this.elements.get('networkStatus');
    if (!networkIndicator) return;
    
    const networkSpeed = this.state.networkInfo?.speed || 'normal';
    
    networkIndicator.className = 'network-dot';
    networkIndicator.classList.add('connected');
    
    if (networkSpeed === 'fast') {
      networkIndicator.classList.add('fast');
    }
    
    EnterpriseUtilities.log('debug', `Network indicator updated: ${networkSpeed}`);
  }
  
  /**
   * Inicializa el gestor de progreso
   */
  initializeProgressManager() {
    this.progressManager = new EnterpriseProgressManager();
    
    // Setup cleanup
    this.memoryManager.addCleanup(() => {
      if (this.progressManager) {
        this.progressManager.destroy();
        this.progressManager = null;
      }
    });
    
    EnterpriseUtilities.log('info', 'Progress manager initialized');
  }
  
  /**
   * Configura event handlers
   */
  setupEventHandlers() {
    // Keyboard events
    const handleKeyboard = (event) => {
      if (event.key === 'Escape') {
        // Emergency redirect
        this.performEmergencyRedirect();
      }
    };
    
    document.addEventListener('keydown', handleKeyboard);
    this.resources.eventListeners.set('keyboard', handleKeyboard);
    
    // Visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        EnterpriseUtilities.log('info', 'Page hidden, pausing animations');
      } else {
        EnterpriseUtilities.log('info', 'Page visible, resuming animations');
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    this.resources.eventListeners.set('visibility', handleVisibilityChange);
    
    EnterpriseUtilities.log('info', 'Event handlers configured');
  }
  
  /**
   * Configura cleanup automático
   */
  setupCleanup() {
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      this.destroy();
    });
    
    // Cleanup on error
    window.addEventListener('error', (event) => {
      this.errorHandler.handleError(event.error, 'global');
    });
    
    // Cleanup on unhandled promise rejection
    window.addEventListener('unhandledrejection', (event) => {
      this.errorHandler.handleError(event.reason, 'promise');
    });
  }
  
  /**
   * Inicia secuencia de carga
   * @returns {Promise} Promise que se resuelve cuando termina la carga
   */
  async startLoadingSequence() {
    if (this.state.isLoading) return;
    
    try {
      EnterpriseUtilities.log('info', 'Starting loading sequence...');
      
      this.state.isLoading = true;
      this.state.phase = 'loading';
      
      // Start progress with callbacks
      await this.progressManager.start({
        onProgressUpdate: this.handleProgressUpdate.bind(this),
        onPhaseChange: this.handlePhaseChange.bind(this),
        onComplete: this.handleLoadingComplete.bind(this),
        onError: this.handleProgressError.bind(this)
      });
      
    } catch (error) {
      await this.handleLoadingError(error);
    }
  }
  
  /**
   * Maneja actualización de progreso
   * @param {Object} data - Datos del progreso
   */
  handleProgressUpdate(data) {
    this.updateProgress(data.progress);
    
    // Log significant progress milestones
    if (data.progress % 25 === 0) {
      EnterpriseUtilities.log('info', `Progress milestone: ${data.progress}%`);
    }
  }
  
  /**
   * Maneja cambio de fase
   * @param {Object} data - Datos de la fase
   */
  handlePhaseChange(data) {
    this.updateStatus(data.message);
    
    EnterpriseUtilities.log('info', `Phase ${data.phase}: ${data.message}`);
  }
  
  /**
   * Maneja finalización de carga - REDIRECCIÓN DIRECTA
   * @param {Object} data - Datos de finalización
   */
  async handleLoadingComplete(data) {
    try {
      EnterpriseUtilities.log('info', 'Loading completed, redirecting directly...');
      
      this.state.phase = 'completed';
      this.state.isLoading = false;
      
      // Ensure 100% progress
      this.updateProgress(100);
      this.updateStatus('Completando...');
      
      // NO mostrar pantalla de completado - REDIRECCIÓN DIRECTA
      await this.performDirectRedirect();
      
    } catch (error) {
      await this.handleRedirectError(error);
    }
  }
  
  /**
   * Realiza redirección directa sin pantalla intermedia
   * @returns {Promise} Promise que se resuelve cuando inicia la redirección
   */
  async performDirectRedirect() {
    this.state.isRedirecting = true;
    
    EnterpriseUtilities.log('info', 'Performing direct redirect...');
    
    // Fade out inmediato
    const preloader = this.elements.get('minimalPreloader');
    if (preloader) {
      preloader.classList.add('fade-out');
    }
    
    // Esperar fade-out
    await this.delay(MINIMAL_PRELOADER_CONFIG.FADE_OUT_DURATION);
    
    // Redirect inmediato
    this.scheduleTimeout(() => {
      EnterpriseUtilities.log('info', 'Redirecting to:', MINIMAL_PRELOADER_CONFIG.REDIRECT_URL);
      
      // Limpiar recursos antes de redirect
      this.cleanup();
      
      // Redirect
      window.location.href = MINIMAL_PRELOADER_CONFIG.REDIRECT_URL;
      
    }, MINIMAL_PRELOADER_CONFIG.REDIRECT_DELAY);
  }
  
  /**
   * Actualiza progreso visual
   * @param {number} progress - Progreso (0-100)
   */
  updateProgress(progress) {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    
    // Update progress bar
    const progressFill = this.elements.get('progressFill');
    if (progressFill) {
      progressFill.style.width = `${clampedProgress}%`;
    }
    
    // Update percentage display
    const progressPercentage = this.elements.get('progressPercentage');
    if (progressPercentage && progressPercentage.textContent !== Math.round(clampedProgress).toString()) {
      progressPercentage.textContent = Math.round(clampedProgress);
    }
    
    // Update ARIA attributes
    const container = this.elements.get('minimalPreloader');
    if (container) {
      container.setAttribute('aria-valuenow', Math.round(clampedProgress));
    }
  }
  
  /**
   * Actualiza texto de estado
   * @param {string} message - Mensaje de estado
   */
  updateStatus(message) {
    const statusElement = this.elements.get('loadingStatus');
    if (!statusElement || statusElement.textContent === message) return;
    
    // Smooth text transition
    statusElement.classList.add('updating');
    
    this.scheduleTimeout(() => {
      statusElement.textContent = message;
      statusElement.classList.remove('updating');
    }, MINIMAL_PRELOADER_CONFIG.ANIMATIONS.TEXT_UPDATE_DURATION);
  }
  
  /**
   * Maneja error en inicialización
   * @param {Error} error - Error ocurrido
   */
  async handleInitializationError(error) {
    EnterpriseUtilities.log('error', 'Initialization error:', error);
    
    this.state.error = error;
    this.state.phase = 'error';
    
    // Show error and redirect after delay
    this.showErrorAndRedirect('Error de inicialización. Redirigiendo...', 3000);
  }
  
  /**
   * Maneja error en carga
   * @param {Error} error - Error ocurrido
   */
  async handleLoadingError(error) {
    EnterpriseUtilities.log('error', 'Loading error:', error);
    
    this.state.error = error;
    
    // Try to continue or redirect
    this.showErrorAndRedirect('Error en la carga. Redirigiendo...', 2000);
  }
  
  /**
   * Maneja error de progreso
   * @param {Object} errorData - Datos del error
   */
  handleProgressError(errorData) {
    EnterpriseUtilities.log('error', 'Progress error:', errorData);
    
    // Continue loading despite error
    this.scheduleTimeout(() => {
      this.performDirectRedirect();
    }, 1000);
  }
  
  /**
   * Maneja error de redirección
   * @param {Error} error - Error de redirección
   */
  async handleRedirectError(error) {
    EnterpriseUtilities.log('error', 'Redirect error:', error);
    
    // Force redirect immediately
    this.performEmergencyRedirect();
  }
  
  /**
   * Muestra error y redirecciona
   * @param {string} message - Mensaje de error
   * @param {number} delay - Delay antes de redireccionar
   */
  showErrorAndRedirect(message, delay = 2000) {
    // Update status with error message
    this.updateStatus(message);
    
    // Force redirect after delay
    this.scheduleTimeout(() => {
      this.performEmergencyRedirect();
    }, delay);
  }
  
  /**
   * Realiza redirección de emergencia
   */
  performEmergencyRedirect() {
    EnterpriseUtilities.log('warn', 'Performing emergency redirect');
    
    this.cleanup();
    window.location.href = MINIMAL_PRELOADER_CONFIG.REDIRECT_URL;
  }
  
  /**
   * Utilidad para delay con Promise
   * @param {number} ms - Milisegundos de delay
   * @returns {Promise} Promise que se resuelve después del delay
   */
  delay(ms) {
    return new Promise(resolve => {
      this.scheduleTimeout(resolve, ms);
    });
  }
  
  /**
   * Programa timeout de manera controlada
   * @param {Function} callback - Función a ejecutar
   * @param {number} delay - Delay en ms
   * @returns {number} ID del timeout
   */
  scheduleTimeout(callback, delay) {
    const timeoutId = setTimeout(() => {
      this.resources.timeouts.delete(timeoutId);
      try {
        callback();
      } catch (error) {
        EnterpriseUtilities.log('error', 'Timeout callback error:', error);
      }
    }, delay);
    
    this.resources.timeouts.add(timeoutId);
    return timeoutId;
  }
  
  /**
   * Obtiene estado completo del controlador
   * @returns {Object} Estado del controlador
   */
  getState() {
    return {
      ...this.state,
      id: this.id,
      isInitialized: this.isInitialized,
      isDestroyed: this.isDestroyed,
      elementsCount: this.elements.size,
      progressManager: this.progressManager ? this.progressManager.getState() : null,
      resources: {
        timeouts: this.resources.timeouts.size,
        eventListeners: this.resources.eventListeners.size
      }
    };
  }
  
  /**
   * Limpia recursos
   */
  cleanup() {
    if (this.isDestroyed) return;
    
    EnterpriseUtilities.log('info', `Cleaning up MinimalController ${this.id}`);
    
    // Clear timeouts
    this.resources.timeouts.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    this.resources.timeouts.clear();
    
    // Clear intervals
    this.resources.intervals.forEach(intervalId => {
      clearInterval(intervalId);
    });
    this.resources.intervals.clear();
    
    // Clear animation frames
    this.resources.animationFrames.forEach(rafId => {
      cancelAnimationFrame(rafId);
    });
    this.resources.animationFrames.clear();
    
    // Remove event listeners
    this.resources.eventListeners.forEach((listener, type) => {
      document.removeEventListener(type, listener);
    });
    this.resources.eventListeners.clear();
    
    // Execute memory manager cleanup
    this.memoryManager.executeCleanup();
    
    EnterpriseUtilities.log('info', 'MinimalController cleanup completed');
  }
  
  /**
   * Destruye el controlador completamente
   */
  destroy() {
    if (this.isDestroyed) return;
    
    EnterpriseUtilities.log('info', `Destroying MinimalController ${this.id}`);
    
    this.isDestroyed = true;
    
    // Cleanup resources
    this.cleanup();
    
    // Destroy progress manager
    if (this.progressManager) {
      this.progressManager.destroy();
      this.progressManager = null;
    }
    
    // Clear references
    this.elements.clear();
    this.state = null;
    this.errorHandler = null;
    this.memoryManager = null;
    
    EnterpriseUtilities.log('info', 'MinimalController destroyed');
  }
}

// ===================================
// INICIALIZACIÓN AUTOMÁTICA ENTERPRISE
// ===================================

/**
 * Inicialización principal del sistema ultra minimalista
 * con arquitectura enterprise robusta
 */
async function initializeMinimalPreloaderSystem() {
  try {
    EnterpriseUtilities.log('info', '🎯 Initializing Ultra Minimal Preloader Enterprise System...');
    
    // Performance mark
    if (performance.mark) {
      performance.mark('minimal-preloader-init-start');
    }
    
    // Create controller
    const controller = new MinimalPreloaderController();
    
    // Make globally accessible
    window.minimalPreloaderSystem = controller;
    
    // Initialize controller
    await controller.initialize();
    
    // Performance measure
    if (performance.mark && performance.measure) {
      performance.mark('minimal-preloader-init-end');
      performance.measure('minimal-preloader-init', 'minimal-preloader-init-start', 'minimal-preloader-init-end');
    }
    
    // Setup global error handlers
    window.addEventListener('beforeunload', () => {
      if (window.minimalPreloaderSystem) {
        window.minimalPreloaderSystem.destroy();
      }
    });
    
    // Development tools
    if (MINIMAL_PRELOADER_CONFIG.DEBUG.ENABLED) {
      window.minimalDebug = {
        getState: () => controller.getState(),
        getConfig: () => MINIMAL_PRELOADER_CONFIG,
        getLogs: () => window.__MINIMAL_LOGS__ || [],
        redirect: () => controller.performDirectRedirect(),
        emergency: () => controller.performEmergencyRedirect(),
        cleanup: () => controller.cleanup(),
        destroy: () => controller.destroy()
      };
      
      EnterpriseUtilities.log('info', '🔧 Debug tools available at window.minimalDebug');
    }
    
    EnterpriseUtilities.log('info', '✅ Ultra Minimal Preloader Enterprise System initialized successfully!');
    
  } catch (error) {
    EnterpriseUtilities.log('error', '💥 System initialization failed:', error);
    
    // Emergency fallback
    const emergencyRedirect = () => {
      console.error('Minimal Preloader failed, redirecting immediately');
      window.location.href = MINIMAL_PRELOADER_CONFIG.REDIRECT_URL;
    };
    
    // Show simple error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: white; padding: 2rem; border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      z-index: 10000;
    `;
    errorDiv.innerHTML = `
      <h3 style="margin: 0 0 1rem 0; color: #333;">Redirigiendo...</h3>
      <p style="margin: 0; color: #666;">Cargando servicios...</p>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Redirect after 1 second
    setTimeout(emergencyRedirect, 1000);
  }
}

// ===================================
// INICIALIZACIÓN AUTOMÁTICA
// ===================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMinimalPreloaderSystem);
} else {
  // DOM already loaded, initialize immediately
  initializeMinimalPreloaderSystem();
}

// Final logging
EnterpriseUtilities.log('info', '📦 Ultra Minimal Preloader Enterprise System - Loaded and Ready');
EnterpriseUtilities.log('info', `⚡ System version: ${MINIMAL_PRELOADER_CONFIG.VERSION} - Build: ${MINIMAL_PRELOADER_CONFIG.BUILD_TIMESTAMP}`);
EnterpriseUtilities.log('info', '🎯 Ultra clean interface with enterprise-level architecture');

// System metadata
window.MINIMAL_PRELOADER_METADATA = {
  name: MINIMAL_PRELOADER_CONFIG.SYSTEM_NAME,
  version: MINIMAL_PRELOADER_CONFIG.VERSION,
  buildTimestamp: MINIMAL_PRELOADER_CONFIG.BUILD_TIMESTAMP,
  loadTime: Math.round(performance.now()),
  timestamp: new Date().toISOString(),
  architecture: 'enterprise-ultra-minimal',
  features: Object.keys(MINIMAL_PRELOADER_CONFIG.FEATURES).filter(key => 
    MINIMAL_PRELOADER_CONFIG.FEATURES[key]
  )
};

// --- SINCRONIZACIÓN DE REDIRECCIÓN ULTRA MINIMALISTA ---
(function() {
  let animationDone = false;
  let iframeLoaded = false;

  // Detecta cuando el preloader termina (progreso 100%)
  window.addEventListener('minimalPreloader:completed', () => {
    animationDone = true;
    tryRedirect();
  });

  // Detecta cuando el iframe termina de cargar la web destino
  const preloadFrame = document.getElementById('preloadFrame');
  if (preloadFrame) {
    preloadFrame.addEventListener('load', () => {
      iframeLoaded = true;
      tryRedirect();
    });
  }

  // Si ambos están listos, redirige
  function tryRedirect() {
    if (animationDone && iframeLoaded) {
      const preloader = document.getElementById('minimalPreloader');
      if (preloader) preloader.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = 'https://intiterravillas.github.io/Servicios/';
      }, 300);
    }
  }

  // Fallback: si tarda demasiado, redirige igual (ejemplo: 12 segundos)
  setTimeout(() => {
    window.location.href = 'https://intiterravillas.github.io/Servicios/';
  }, 12000);

  // Hook para tu sistema enterprise: dispara el evento cuando el preloader termina
  if (window.minimalPreloaderSystem && window.minimalPreloaderSystem.progressManager) {
    window.minimalPreloaderSystem.progressManager.on('complete', () => {
      window.dispatchEvent(new Event('minimalPreloader:completed'));
    });
  }
})();
