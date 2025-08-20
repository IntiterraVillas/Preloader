/**
 * ===================================
 * SISTEMA DE PRELOADER MINIMALISTA ELEGANTE 2025
 * ===================================
 * 
 * Filosofía del código:
 * - Arquitectura modular y mantenible
 * - Clases ES6 para mejor organización
 * - Comentarios extensivos en español
 * - Optimización para rendimiento
 * - Accesibilidad y usabilidad
 * - Patrones de diseño elegantes
 * 
 * Características principales:
 * - Simulación realista de carga progresiva
 * - Estados de carga bien definidos
 * - Animaciones suaves y naturales
 * - Gestión completa de eventos
 * - Responsive y adaptable
 * - Manejo de errores robusto
 * 
 * Autor: Sistema Avanzado 2025
 * Versión: 1.0.1
 * ===================================
 */

// ===================================
// CONFIGURACIÓN GLOBAL DEL SISTEMA
// ===================================

/**
 * Configuración principal del preloader basada en los datos proporcionados
 * Todos los valores son personalizables y modulares
 */
const PRELOADER_CONFIG = {
    // Duración total de la animación de carga
    LOADING_DURATION: 5000, // 5 segundos
    
    // Pasos de progreso con timing realista y mensajes específicos
    PROGRESS_STEPS: [
        { progress: 0, duration: 0, message: "Iniciando..." },
        { progress: 15, duration: 800, message: "Cargando..." },
        { progress: 30, duration: 1000, message: "Cargando..." },
        { progress: 50, duration: 1200, message: "Cargando..." },
        { progress: 75, duration: 1000, message: "Finalizando..." },
        { progress: 90, duration: 500, message: "Finalizando..." },
        { progress: 100, duration: 500, message: "Listo" }
    ],
    
    // Mensajes de carga dinámicos con puntos de cambio específicos
    LOADING_MESSAGES: [
        { progress: 0, message: "Iniciando..." },
        { progress: 15, message: "Cargando..." },
        { progress: 75, message: "Finalizando..." },
        { progress: 100, message: "Listo" }
    ],
    
    // Configuración de animaciones
    ANIMATIONS: {
        LOGO_FADE_IN: 800,
        LOGO_PULSE: 2000,
        PROGRESS_FILL: 100,
        TEXT_TRANSITION: 400,
        COMPLETION_DELAY: 1000
    },
    
    // Configuración de colores (manteniendo minimalismo)
    COLORS: {
        BACKGROUND: "#ffffff",
        TEXT: "#333333",
        ACCENT: "#000000",
        PROGRESS: "#666666"
    },
    
    // Configuración de timing para diferentes dispositivos
    DEVICE_TIMINGS: {
        MOBILE: 0.8,    // 20% más rápido en móvil
        TABLET: 0.9,    // 10% más rápido en tablet
        DESKTOP: 1.0    // Velocidad normal en desktop
    },
    
    // Estados del sistema
    STATES: {
        INITIAL: 'initial',
        LOADING: 'loading',
        COMPLETED: 'completed',
        ERROR: 'error'
    },
    
    // Configuración de accesibilidad
    ACCESSIBILITY: {
        ANNOUNCE_PROGRESS: true,
        REDUCE_MOTION: false,
        HIGH_CONTRAST: false
    }
};

// ===================================
// UTILIDADES Y FUNCIONES AUXILIARES
// ===================================

/**
 * Clase de utilidades para operaciones comunes
 * Proporciona métodos estáticos reutilizables
 */
class PreloaderUtils {
    /**
     * Detecta el tipo de dispositivo basado en el viewport
     * @returns {string} Tipo de dispositivo: 'mobile', 'tablet', 'desktop'
     */
    static detectDeviceType() {
        const width = window.innerWidth;
        if (width <= 480) return 'mobile';
        if (width <= 768) return 'tablet';
        return 'desktop';
    }
    
    /**
     * Calcula el factor de velocidad basado en el dispositivo
     * @returns {number} Factor multiplicador para velocidad
     */
    static getSpeedFactor() {
        const deviceType = this.detectDeviceType();
        return PRELOADER_CONFIG.DEVICE_TIMINGS[deviceType.toUpperCase()];
    }
    
    /**
     * Detecta preferencias de accesibilidad del usuario
     * @returns {Object} Configuración de accesibilidad
     */
    static detectAccessibilityPreferences() {
        return {
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            highContrast: window.matchMedia('(prefers-contrast: high)').matches,
            darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
        };
    }
    
    /**
     * Interpola suavemente entre dos valores
     * @param {number} start - Valor inicial
     * @param {number} end - Valor final
     * @param {number} progress - Progreso (0-1)
     * @returns {number} Valor interpolado
     */
    static lerp(start, end, progress) {
        return start + (end - start) * progress;
    }
    
    /**
     * Aplica curva de suavizado (easing) a un valor
     * @param {number} t - Tiempo normalizado (0-1)
     * @param {string} easingType - Tipo de easing
     * @returns {number} Valor con easing aplicado
     */
    static applyEasing(t, easingType = 'easeOutCubic') {
        const easingFunctions = {
            linear: t => t,
            easeInCubic: t => t * t * t,
            easeOutCubic: t => 1 - Math.pow(1 - t, 3),
            easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
            easeOutBounce: t => {
                const n1 = 7.5625;
                const d1 = 2.75;
                if (t < 1 / d1) return n1 * t * t;
                else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
                else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
                else return n1 * (t -= 2.625 / d1) * t + 0.984375;
            }
        };
        
        return easingFunctions[easingType] ? easingFunctions[easingType](t) : t;
    }
    
    /**
     * Debounce para optimizar eventos frecuentes
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en ms
     * @returns {Function} Función debounced
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Genera un ID único para elementos
     * @returns {string} ID único
     */
    static generateUniqueId() {
        return 'preloader_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Valida si un elemento DOM existe y está visible
     * @param {Element} element - Elemento DOM a validar
     * @returns {boolean} True si el elemento es válido
     */
    static isValidElement(element) {
        return element && 
               element instanceof Element && 
               element.offsetParent !== null;
    }
    
    /**
     * Formatea el porcentaje para mostrar
     * @param {number} value - Valor numérico del porcentaje
     * @returns {string} Porcentaje formateado
     */
    static formatPercentage(value) {
        return `${Math.round(Math.max(0, Math.min(100, value)))}%`;
    }
    
    /**
     * Determina el mensaje de carga apropiado basado en el progreso
     * @param {number} progress - Progreso actual (0-100)
     * @returns {string} Mensaje apropiado
     */
    static getMessageForProgress(progress) {
        // Encontrar el mensaje más apropiado para el nivel de progreso
        const sortedMessages = PRELOADER_CONFIG.LOADING_MESSAGES
            .sort((a, b) => a.progress - b.progress);
        
        let appropriateMessage = sortedMessages[0].message;
        
        for (let i = 0; i < sortedMessages.length; i++) {
            if (progress >= sortedMessages[i].progress) {
                appropriateMessage = sortedMessages[i].message;
            } else {
                break;
            }
        }
        
        return appropriateMessage;
    }
}

// ===================================
// GESTOR DE ANIMACIONES AVANZADO
// ===================================

/**
 * Clase especializada en el manejo de animaciones suaves
 * Proporciona control granular sobre todas las animaciones del preloader
 */
class AnimationManager {
    constructor() {
        this.activeAnimations = new Map();
        this.animationId = 0;
        this.isReducedMotion = PreloaderUtils.detectAccessibilityPreferences().reducedMotion;
        
        // Configurar observador de cambios en preferencias de movimiento
        this.setupMotionPreferenceObserver();
    }
    
    /**
     * Configura el observador para cambios en preferencias de movimiento
     */
    setupMotionPreferenceObserver() {
        const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionMediaQuery.addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            if (this.isReducedMotion) {
                this.cancelAllAnimations();
            }
        });
    }
    
    /**
     * Anima un valor numerico suavemente
     * @param {Object} options - Configuración de la animación
     * @returns {Promise} Promesa que se resuelve cuando termina la animación
     */
    animateValue(options) {
        const {
            from = 0,
            to = 100,
            duration = 1000,
            easing = 'easeOutCubic',
            onUpdate = () => {},
            onComplete = () => {}
        } = options;
        
        return new Promise((resolve) => {
            // Si está habilitado reduce motion, ejecutar inmediatamente
            if (this.isReducedMotion) {
                onUpdate(to);
                onComplete(to);
                resolve(to);
                return;
            }
            
            const animationId = ++this.animationId;
            const startTime = performance.now();
            const difference = to - from;
            
            const animate = (currentTime) => {
                // Verificar si la animación fue cancelada
                if (!this.activeAnimations.has(animationId)) {
                    return;
                }
                
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = PreloaderUtils.applyEasing(progress, easing);
                const currentValue = from + (difference * easedProgress);
                
                // Actualizar valor
                onUpdate(currentValue);
                
                // Continuar animación o completar
                if (progress < 1) {
                    this.activeAnimations.set(animationId, requestAnimationFrame(animate));
                } else {
                    this.activeAnimations.delete(animationId);
                    onComplete(to);
                    resolve(to);
                }
            };
            
            // Iniciar animación
            this.activeAnimations.set(animationId, requestAnimationFrame(animate));
        });
    }
    
    /**
     * Anima múltiples elementos con delay escalonado
     * @param {Array} elements - Array de elementos a animar
     * @param {Object} options - Configuración de animación
     * @returns {Promise} Promesa que se resuelve cuando todas las animaciones terminan
     */
    staggerAnimation(elements, options = {}) {
        const {
            delay = 100,
            animationFunction = this.fadeIn.bind(this)
        } = options;
        
        const promises = elements.map((element, index) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    animationFunction(element).then(resolve);
                }, index * delay);
            });
        });
        
        return Promise.all(promises);
    }
    
    /**
     * Animación de fade in elegante
     * @param {Element} element - Elemento a animar
     * @param {number} duration - Duración en ms
     * @returns {Promise} Promesa de completado
     */
    fadeIn(element, duration = 600) {
        if (!PreloaderUtils.isValidElement(element)) {
            return Promise.resolve();
        }
        
        return this.animateValue({
            from: 0,
            to: 1,
            duration,
            easing: 'easeOutCubic',
            onUpdate: (value) => {
                element.style.opacity = value;
                element.style.transform = `translateY(${(1 - value) * 10}px)`;
            }
        });
    }
    
    /**
     * Animación de fade out elegante
     * @param {Element} element - Elemento a animar
     * @param {number} duration - Duración en ms
     * @returns {Promise} Promesa de completado
     */
    fadeOut(element, duration = 400) {
        if (!PreloaderUtils.isValidElement(element)) {
            return Promise.resolve();
        }
        
        return this.animateValue({
            from: 1,
            to: 0,
            duration,
            easing: 'easeInCubic',
            onUpdate: (value) => {
                element.style.opacity = value;
                element.style.transform = `translateY(${(1 - value) * -5}px)`;
            }
        });
    }
    
    /**
     * Cancela todas las animaciones activas
     */
    cancelAllAnimations() {
        this.activeAnimations.forEach((animationFrame) => {
            cancelAnimationFrame(animationFrame);
        });
        this.activeAnimations.clear();
    }
    
    /**
     * Cancela una animación específica
     * @param {number} animationId - ID de la animación a cancelar
     */
    cancelAnimation(animationId) {
        if (this.activeAnimations.has(animationId)) {
            cancelAnimationFrame(this.activeAnimations.get(animationId));
            this.activeAnimations.delete(animationId);
        }
    }
    
    /**
     * Limpia recursos y cancela animaciones
     */
    destroy() {
        this.cancelAllAnimations();
    }
}

// ===================================
// GESTOR DE ESTADOS DEL SISTEMA
// ===================================

/**
 * Clase para manejar los estados del preloader de forma robusta
 * Implementa un patrón de máquina de estados simple pero eficaz
 */
class StateManager {
    constructor() {
        this.currentState = PRELOADER_CONFIG.STATES.INITIAL;
        this.previousState = null;
        this.stateHistory = [];
        this.stateListeners = new Map();
        
        // Registrar estado inicial
        this.recordState(this.currentState);
    }
    
    /**
     * Cambia el estado actual del sistema
     * @param {string} newState - Nuevo estado
     * @param {Object} data - Datos adicionales del estado
     */
    setState(newState, data = {}) {
        // Validar que el estado existe
        if (!Object.values(PRELOADER_CONFIG.STATES).includes(newState)) {
            console.warn(`Estado inválido: ${newState}`);
            return false;
        }
        
        // Evitar cambios redundantes
        if (this.currentState === newState) {
            return false;
        }
        
        // Guardar estado anterior
        this.previousState = this.currentState;
        this.currentState = newState;
        
        // Registrar en historial
        this.recordState(newState, data);
        
        // Notificar a los listeners
        this.notifyStateChange(newState, data);
        
        console.log(`Estado cambiado: ${this.previousState} → ${newState}`, data);
        
        return true;
    }
    
    /**
     * Obtiene el estado actual
     * @returns {string} Estado actual
     */
    getState() {
        return this.currentState;
    }
    
    /**
     * Obtiene el estado anterior
     * @returns {string} Estado anterior
     */
    getPreviousState() {
        return this.previousState;
    }
    
    /**
     * Verifica si está en un estado específico
     * @param {string} state - Estado a verificar
     * @returns {boolean} True si está en el estado
     */
    isState(state) {
        return this.currentState === state;
    }
    
    /**
     * Verifica si puede cambiar a un estado específico
     * @param {string} targetState - Estado objetivo
     * @returns {boolean} True si puede cambiar
     */
    canTransitionTo(targetState) {
        // Definir transiciones válidas
        const validTransitions = {
            [PRELOADER_CONFIG.STATES.INITIAL]: [
                PRELOADER_CONFIG.STATES.LOADING,
                PRELOADER_CONFIG.STATES.ERROR
            ],
            [PRELOADER_CONFIG.STATES.LOADING]: [
                PRELOADER_CONFIG.STATES.COMPLETED,
                PRELOADER_CONFIG.STATES.ERROR,
                PRELOADER_CONFIG.STATES.INITIAL
            ],
            [PRELOADER_CONFIG.STATES.COMPLETED]: [
                PRELOADER_CONFIG.STATES.INITIAL,
                PRELOADER_CONFIG.STATES.LOADING
            ],
            [PRELOADER_CONFIG.STATES.ERROR]: [
                PRELOADER_CONFIG.STATES.INITIAL,
                PRELOADER_CONFIG.STATES.LOADING
            ]
        };
        
        const allowedTransitions = validTransitions[this.currentState] || [];
        return allowedTransitions.includes(targetState);
    }
    
    /**
     * Registra un listener para cambios de estado
     * @param {string} state - Estado a escuchar (o 'any' para todos)
     * @param {Function} callback - Función callback
     * @returns {Function} Función para desregistrar el listener
     */
    onStateChange(state, callback) {
        if (!this.stateListeners.has(state)) {
            this.stateListeners.set(state, new Set());
        }
        
        this.stateListeners.get(state).add(callback);
        
        // Retornar función para desregistrar
        return () => {
            const listeners = this.stateListeners.get(state);
            if (listeners) {
                listeners.delete(callback);
            }
        };
    }
    
    /**
     * Notifica a los listeners sobre cambios de estado
     * @param {string} newState - Nuevo estado
     * @param {Object} data - Datos del estado
     */
    notifyStateChange(newState, data) {
        // Notificar listeners específicos del estado
        const stateListeners = this.stateListeners.get(newState);
        if (stateListeners) {
            stateListeners.forEach(callback => {
                try {
                    callback(newState, data, this.previousState);
                } catch (error) {
                    console.error('Error en listener de estado:', error);
                }
            });
        }
        
        // Notificar listeners generales
        const anyListeners = this.stateListeners.get('any');
        if (anyListeners) {
            anyListeners.forEach(callback => {
                try {
                    callback(newState, data, this.previousState);
                } catch (error) {
                    console.error('Error en listener general de estado:', error);
                }
            });
        }
    }
    
    /**
     * Registra un estado en el historial
     * @param {string} state - Estado a registrar
     * @param {Object} data - Datos adicionales
     */
    recordState(state, data = {}) {
        this.stateHistory.push({
            state,
            data,
            timestamp: Date.now(),
            performance: performance.now()
        });
        
        // Limitar tamaño del historial
        if (this.stateHistory.length > 50) {
            this.stateHistory = this.stateHistory.slice(-25);
        }
    }
    
    /**
     * Obtiene el historial de estados
     * @returns {Array} Historial de estados
     */
    getStateHistory() {
        return [...this.stateHistory];
    }
    
    /**
     * Resetea el gestor de estados
     */
    reset() {
        this.previousState = this.currentState;
        this.currentState = PRELOADER_CONFIG.STATES.INITIAL;
        this.recordState(this.currentState);
        this.notifyStateChange(this.currentState);
    }
}

// ===================================
// CLASE PRINCIPAL DEL PRELOADER
// ===================================

/**
 * Clase principal que orquesta todo el sistema del preloader
 * Implementa el patrón de composición para máxima flexibilidad
 */
class MinimalistPreloaderSystem {
    constructor() {
        // Inicializar sistemas auxiliares
        this.animationManager = new AnimationManager();
        this.stateManager = new StateManager();
        
        // Referencias a elementos DOM
        this.elements = {
            preloader: null,
            completedScreen: null,
            logoImage: null,
            loadingText: null,
            progressFill: null,
            progressPercent: null,
            restartButton: null
        };
        
        // Variables de control
        this.currentProgress = 0;
        this.targetProgress = 0;
        this.currentStepIndex = 0;
        this.loadingStartTime = 0;
        this.speedFactor = PreloaderUtils.getSpeedFactor();
        this.lastMessageProgress = -1; // Para controlar cambios de mensaje
        
        // Timeouts y intervals activos
        this.activeTimeouts = new Set();
        this.activeIntervals = new Set();
        
        // Configuración de accesibilidad
        this.accessibilityConfig = PreloaderUtils.detectAccessibilityPreferences();
        
        // Flag de inicialización
        this.isInitialized = false;
        
        // Bind de métodos para eventos
        this.handleRestart = this.handleRestart.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleKeyboardInteraction = this.handleKeyboardInteraction.bind(this);
        
        console.log('🚀 Sistema Minimalista de Preloader inicializado');
    }
    
    /**
     * Inicialización completa del sistema
     * Configura DOM, eventos y estado inicial
     */
    async init() {
        try {
            console.log('🔧 Iniciando configuración del sistema...');
            
            // Obtener referencias DOM
            this.getDOMReferences();
            
            // Validar elementos críticos
            this.validateCriticalElements();
            
            // Configurar eventos del sistema
            this.setupEventListeners();
            
            // Configurar listeners de estado
            this.setupStateListeners();
            
            // Configurar accesibilidad
            this.setupAccessibility();
            
            // Preparar estado inicial
            this.prepareInitialState();
            
            // Marcar como inicializado
            this.isInitialized = true;
            
            console.log('✅ Sistema inicializado correctamente');
            
            // Iniciar secuencia de carga después de un breve delay
            this.scheduleTimeout(() => {
                this.startLoadingSequence();
            }, 150);
            
        } catch (error) {
            console.error('❌ Error durante la inicialización:', error);
            this.handleInitializationError(error);
        }
    }
    
    /**
     * Obtiene todas las referencias DOM necesarias
     */
    getDOMReferences() {
        console.log('🔍 Obteniendo referencias DOM...');
        
        this.elements = {
            preloader: document.getElementById('preloader'),
            completedScreen: document.getElementById('completedScreen'),
            logoImage: document.getElementById('logoImage'),
            loadingText: document.getElementById('loadingText'),
            progressFill: document.getElementById('progressFill'),
            progressPercent: document.getElementById('progressPercent'),
            restartButton: document.getElementById('restartButton')
        };
        
        // Log de elementos encontrados/faltantes
        Object.entries(this.elements).forEach(([key, element]) => {
            if (element) {
                console.log(`✓ ${key} encontrado`);
            } else {
                console.warn(`⚠️ ${key} no encontrado`);
            }
        });
    }
    
    /**
     * Valida que los elementos críticos existan
     */
    validateCriticalElements() {
        const criticalElements = ['preloader', 'progressFill', 'progressPercent'];
        const missingElements = criticalElements.filter(key => !this.elements[key]);
        
        if (missingElements.length > 0) {
            throw new Error(`Elementos críticos faltantes: ${missingElements.join(', ')}`);
        }
    }
    
    /**
     * Configura todos los event listeners del sistema
     */
    setupEventListeners() {
        console.log('🎯 Configurando event listeners...');
        
        // Botón de reinicio
        if (this.elements.restartButton) {
            this.elements.restartButton.addEventListener('click', this.handleRestart);
        }
        
        // Eventos de teclado para accesibilidad
        document.addEventListener('keydown', this.handleKeyboardInteraction);
        
        // Cambios de visibilidad de la página
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Redimensionado de ventana (debounced)
        const debouncedResize = PreloaderUtils.debounce(() => {
            this.handleWindowResize();
        }, 250);
        window.addEventListener('resize', debouncedResize);
        
        // Cambios en preferencias de accesibilidad
        this.setupAccessibilityListeners();
        
        console.log('✅ Event listeners configurados');
    }
    
    /**
     * Configura listeners para cambios en preferencias de accesibilidad
     */
    setupAccessibilityListeners() {
        // Preferencia de movimiento reducido
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionQuery.addEventListener('change', (e) => {
            this.accessibilityConfig.reducedMotion = e.matches;
            console.log('🎛️ Movimiento reducido:', e.matches);
        });
        
        // Preferencia de alto contraste
        const contrastQuery = window.matchMedia('(prefers-contrast: high)');
        contrastQuery.addEventListener('change', (e) => {
            this.accessibilityConfig.highContrast = e.matches;
            console.log('🎛️ Alto contraste:', e.matches);
        });
    }
    
    /**
     * Configura los listeners de cambio de estado
     */
    setupStateListeners() {
        // Listener para estado de carga
        this.stateManager.onStateChange(PRELOADER_CONFIG.STATES.LOADING, (state, data) => {
            console.log('📊 Iniciando carga...');
            this.onLoadingStateEnter(data);
        });
        
        // Listener para estado completado
        this.stateManager.onStateChange(PRELOADER_CONFIG.STATES.COMPLETED, (state, data) => {
            console.log('🎉 Carga completada!');
            this.onCompletedStateEnter(data);
        });
        
        // Listener para estado de error
        this.stateManager.onStateChange(PRELOADER_CONFIG.STATES.ERROR, (state, data) => {
            console.error('❌ Error en el sistema:', data);
            this.onErrorStateEnter(data);
        });
        
        // Listener general para logging
        this.stateManager.onStateChange('any', (newState, data, previousState) => {
            console.log(`🔄 Estado: ${previousState} → ${newState}`, data);
        });
    }
    
    /**
     * Configura características de accesibilidad
     */
    setupAccessibility() {
        console.log('♿ Configurando accesibilidad...');
        
        // Configurar ARIA labels dinámicos
        if (this.elements.preloader) {
            this.elements.preloader.setAttribute('role', 'status');
            this.elements.preloader.setAttribute('aria-live', 'polite');
        }
        
        // Configurar anuncios de progreso para lectores de pantalla
        if (PRELOADER_CONFIG.ACCESSIBILITY.ANNOUNCE_PROGRESS && this.elements.progressPercent) {
            this.elements.progressPercent.setAttribute('aria-live', 'polite');
        }
        
        console.log('✅ Accesibilidad configurada');
    }
    
    /**
     * Prepara el estado visual inicial del preloader
     */
    prepareInitialState() {
        console.log('🎨 Preparando estado inicial...');
        
        // Asegurar visibilidad del preloader
        if (this.elements.preloader) {
            this.elements.preloader.classList.remove('fade-out');
        }
        
        // Ocultar pantalla de completado
        if (this.elements.completedScreen) {
            this.elements.completedScreen.classList.add('hidden');
        }
        
        // Resetear progreso visual
        this.updateProgressVisual(0);
        
        // Establecer mensaje inicial
        if (this.elements.loadingText) {
            this.elements.loadingText.textContent = PRELOADER_CONFIG.LOADING_MESSAGES[0].message;
            this.lastMessageProgress = -1; // Resetear control de mensaje
        }
        
        // Resetear variables de control
        this.currentProgress = 0;
        this.targetProgress = 0;
        this.currentStepIndex = 0;
        
        console.log('✅ Estado inicial preparado');
    }
    
    /**
     * Inicia la secuencia completa de carga
     */
    async startLoadingSequence() {
        if (!this.isInitialized) {
            console.warn('⚠️ Sistema no inicializado, abortando secuencia de carga');
            return;
        }
        
        if (this.stateManager.isState(PRELOADER_CONFIG.STATES.LOADING)) {
            console.warn('⚠️ Secuencia de carga ya en progreso');
            return;
        }
        
        try {
            console.log('🚀 Iniciando secuencia de carga...');
            
            // Cambiar estado a cargando
            this.stateManager.setState(PRELOADER_CONFIG.STATES.LOADING);
            
            // Registrar tiempo de inicio
            this.loadingStartTime = performance.now();
            
            // Ejecutar pasos de carga secuencialmente
            await this.executeLoadingSteps();
            
            // Cambiar a estado completado
            this.stateManager.setState(PRELOADER_CONFIG.STATES.COMPLETED);
            
        } catch (error) {
            console.error('❌ Error en secuencia de carga:', error);
            this.stateManager.setState(PRELOADER_CONFIG.STATES.ERROR, { error });
        }
    }
    
    /**
     * Ejecuta todos los pasos de carga de forma secuencial
     */
    async executeLoadingSteps() {
        console.log('📋 Ejecutando pasos de carga...');
        
        // Iterar a través de cada paso
        for (let i = 1; i < PRELOADER_CONFIG.PROGRESS_STEPS.length; i++) {
            // Verificar si debemos continuar
            if (!this.stateManager.isState(PRELOADER_CONFIG.STATES.LOADING)) {
                console.log('🛑 Secuencia de carga interrumpida');
                break;
            }
            
            const step = PRELOADER_CONFIG.PROGRESS_STEPS[i];
            const adjustedDuration = step.duration * this.speedFactor;
            
            console.log(`📊 Ejecutando paso ${i}: ${step.progress}% (${adjustedDuration}ms)`);
            
            // Animar progreso hacia el objetivo y actualizar mensaje dinámicamente
            await this.animateProgressToWithMessage(step.progress, adjustedDuration);
            
            // Actualizar índice del paso actual
            this.currentStepIndex = i;
            
            // Pequeña pausa entre pasos para suavidad visual
            if (i < PRELOADER_CONFIG.PROGRESS_STEPS.length - 1) {
                await this.waitFor(50);
            }
        }
        
        console.log('✅ Todos los pasos de carga completados');
    }
    
    /**
     * Anima el progreso hacia un valor específico con actualizaciones de mensaje
     * @param {number} targetProgress - Progreso objetivo (0-100)
     * @param {number} duration - Duración de la animación en ms
     */
    async animateProgressToWithMessage(targetProgress, duration = 500) {
        this.targetProgress = targetProgress;
        
        return this.animationManager.animateValue({
            from: this.currentProgress,
            to: targetProgress,
            duration: duration,
            easing: 'easeOutCubic',
            onUpdate: (value) => {
                this.currentProgress = value;
                this.updateProgressVisual(value);
                
                // Verificar si necesitamos actualizar el mensaje
                this.checkAndUpdateMessage(value);
            },
            onComplete: (value) => {
                this.currentProgress = value;
                this.updateProgressVisual(value);
                this.checkAndUpdateMessage(value);
                
                // Anunciar hitos importantes para accesibilidad
                if (PRELOADER_CONFIG.ACCESSIBILITY.ANNOUNCE_PROGRESS && 
                    [25, 50, 75, 100].includes(Math.round(value))) {
                    this.announceProgress(Math.round(value));
                }
            }
        });
    }
    
    /**
     * Verifica si necesitamos actualizar el mensaje basado en el progreso
     * @param {number} currentProgress - Progreso actual
     */
    checkAndUpdateMessage(currentProgress) {
        const newMessage = PreloaderUtils.getMessageForProgress(currentProgress);
        
        if (this.elements.loadingText && this.elements.loadingText.textContent !== newMessage) {
            // Encontrar el punto de progreso que activó el cambio
            const triggerPoint = PRELOADER_CONFIG.LOADING_MESSAGES.find(
                msg => msg.message === newMessage
            );
            
            // Solo actualizar si hemos alcanzado o superado el punto de activación
            if (triggerPoint && currentProgress >= triggerPoint.progress && 
                triggerPoint.progress > this.lastMessageProgress) {
                
                console.log(`💬 Cambiando mensaje a: "${newMessage}" en ${Math.round(currentProgress)}%`);
                this.updateLoadingMessageSync(newMessage);
                this.lastMessageProgress = triggerPoint.progress;
            }
        }
    }
    
    /**
     * Actualiza el mensaje de carga de forma sincrónica
     * @param {string} newMessage - Nuevo mensaje a mostrar
     */
    updateLoadingMessageSync(newMessage) {
        if (!this.elements.loadingText || this.elements.loadingText.textContent === newMessage) {
            return;
        }
        
        // Actualizar inmediatamente sin animación para mantener fluidez
        this.elements.loadingText.textContent = newMessage;
        
        // Agregar clase de actualización para efectos visuales sutiles
        this.elements.loadingText.classList.add('fade-change');
        
        this.scheduleTimeout(() => {
            if (this.elements.loadingText) {
                this.elements.loadingText.classList.remove('fade-change');
            }
        }, 300);
    }
    
    /**
     * Actualiza la visualización del progreso
     * @param {number} progress - Valor del progreso (0-100)
     */
    updateProgressVisual(progress) {
        const formattedProgress = PreloaderUtils.formatPercentage(progress);
        
        // Actualizar barra de progreso
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = formattedProgress;
        }
        
        // Actualizar texto del porcentaje
        if (this.elements.progressPercent) {
            this.elements.progressPercent.textContent = formattedProgress;
            
            // Efecto sutil en actualizaciones
            this.elements.progressPercent.classList.add('updating');
            this.scheduleTimeout(() => {
                if (this.elements.progressPercent) {
                    this.elements.progressPercent.classList.remove('updating');
                }
            }, 200);
        }
    }
    
    /**
     * Anuncia el progreso para lectores de pantalla
     * @param {number} progress - Progreso a anunciar
     */
    announceProgress(progress) {
        if (!PRELOADER_CONFIG.ACCESSIBILITY.ANNOUNCE_PROGRESS) return;
        
        // Crear anuncio accesible
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        announcement.textContent = `Progreso de carga: ${progress} por ciento`;
        
        document.body.appendChild(announcement);
        
        // Limpiar después del anuncio
        this.scheduleTimeout(() => {
            if (announcement.parentNode) {
                announcement.parentNode.removeChild(announcement);
            }
        }, 1000);
    }
    
    /**
     * Maneja la entrada al estado de carga
     * @param {Object} data - Datos del estado
     */
    onLoadingStateEnter(data = {}) {
        console.log('🔄 Entrando en estado de carga');
        
        // Configurar atributos ARIA
        if (this.elements.preloader) {
            this.elements.preloader.setAttribute('aria-label', 'Cargando aplicación');
        }
    }
    
    /**
     * Maneja la entrada al estado completado
     * @param {Object} data - Datos del estado
     */
    async onCompletedStateEnter(data = {}) {
        console.log('🎉 Entrando en estado completado');
        
        // Esperar un momento antes de mostrar la pantalla de completado
        await this.waitFor(PRELOADER_CONFIG.ANIMATIONS.COMPLETION_DELAY);
        
        try {
            // Ocultar preloader con fade out
            await this.hidePreloader();
            
            // Mostrar pantalla de completado
            await this.showCompletedScreen();
            
        } catch (error) {
            console.error('❌ Error al mostrar pantalla de completado:', error);
        }
    }
    
    /**
     * Maneja la entrada al estado de error
     * @param {Object} data - Datos del error
     */
    onErrorStateEnter(data = {}) {
        console.error('💥 Entrando en estado de error:', data);
        
        // Por ahora, reiniciar automáticamente después de un delay
        this.scheduleTimeout(() => {
            this.restartSystem();
        }, 2000);
    }
    
    /**
     * Oculta el preloader con animación suave
     */
    async hidePreloader() {
        if (!this.elements.preloader) return;
        
        console.log('👋 Ocultando preloader...');
        
        // Aplicar clase de fade out
        this.elements.preloader.classList.add('fade-out');
        
        // Esperar a que termine la transición CSS
        await this.waitFor(800);
    }
    
    /**
     * Muestra la pantalla de completado
     */
    async showCompletedScreen() {
        if (!this.elements.completedScreen) return;
        
        console.log('🎊 Mostrando pantalla de completado...');
        
        // Mostrar pantalla
        this.elements.completedScreen.classList.remove('hidden');
        
        // Configurar accesibilidad
        this.elements.completedScreen.setAttribute('aria-label', 'Carga completada exitosamente');
        
        // Focus en el botón de reinicio para accesibilidad
        if (this.elements.restartButton) {
            this.scheduleTimeout(() => {
                this.elements.restartButton.focus();
            }, 500);
        }
    }
    
    /**
     * Reinicia todo el sistema a su estado inicial
     */
    async restartSystem() {
        console.log('🔄 Reiniciando sistema completo...');
        
        try {
            // Limpiar recursos activos
            this.cleanupActiveResources();
            
            // Resetear estado del manager
            this.stateManager.reset();
            
            // Ocultar pantalla de completado
            if (this.elements.completedScreen) {
                this.elements.completedScreen.classList.add('hidden');
            }
            
            // Preparar estado inicial
            this.prepareInitialState();
            
            // Pequeña pausa para transición visual
            await this.waitFor(200);
            
            // Reiniciar secuencia de carga
            await this.startLoadingSequence();
            
            console.log('✅ Sistema reiniciado exitosamente');
            
        } catch (error) {
            console.error('❌ Error al reiniciar sistema:', error);
            this.stateManager.setState(PRELOADER_CONFIG.STATES.ERROR, { error });
        }
    }
    
    /**
     * Limpia todos los recursos activos (timeouts, intervals, etc.)
     */
    cleanupActiveResources() {
        console.log('🧹 Limpiando recursos activos...');
        
        // Limpiar timeouts
        this.activeTimeouts.forEach(timeoutId => {
            clearTimeout(timeoutId);
        });
        this.activeTimeouts.clear();
        
        // Limpiar intervals
        this.activeIntervals.forEach(intervalId => {
            clearInterval(intervalId);
        });
        this.activeIntervals.clear();
        
        // Cancelar animaciones activas
        this.animationManager.cancelAllAnimations();
        
        console.log('✅ Recursos limpiados');
    }
    
    /**
     * Utility: Espera un tiempo específico
     * @param {number} ms - Milisegundos a esperar
     */
    waitFor(ms) {
        return new Promise(resolve => {
            const timeoutId = setTimeout(resolve, ms);
            this.activeTimeouts.add(timeoutId);
        });
    }
    
    /**
     * Utility: Programa un timeout y lo registra para limpieza
     * @param {Function} callback - Función a ejecutar
     * @param {number} delay - Delay en ms
     */
    scheduleTimeout(callback, delay) {
        const timeoutId = setTimeout(() => {
            this.activeTimeouts.delete(timeoutId);
            callback();
        }, delay);
        
        this.activeTimeouts.add(timeoutId);
        return timeoutId;
    }
    
    /**
     * Utility: Programa un interval y lo registra para limpieza
     * @param {Function} callback - Función a ejecutar
     * @param {number} interval - Intervalo en ms
     */
    scheduleInterval(callback, interval) {
        const intervalId = setInterval(callback, interval);
        this.activeIntervals.add(intervalId);
        return intervalId;
    }
    
    /**
     * Maneja el click del botón de reinicio
     */
    handleRestart() {
        console.log('🖱️ Botón de reinicio presionado');
        this.restartSystem();
    }
    
    /**
     * Maneja cambios en la visibilidad de la página
     */
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('👁️ Página oculta, pausando animaciones');
            // Pausar animaciones para ahorrar recursos
        } else {
            console.log('👁️ Página visible, reanudando animaciones');
            // Reanudar animaciones
        }
    }
    
    /**
     * Maneja interacciones de teclado para accesibilidad
     * @param {KeyboardEvent} event - Evento de teclado
     */
    handleKeyboardInteraction(event) {
        // Escape para reiniciar si está completado
        if (event.key === 'Escape' && this.stateManager.isState(PRELOADER_CONFIG.STATES.COMPLETED)) {
            event.preventDefault();
            this.restartSystem();
        }
        
        // Enter/Space en botón de reinicio
        if ((event.key === 'Enter' || event.key === ' ') && 
            event.target === this.elements.restartButton) {
            event.preventDefault();
            this.handleRestart();
        }
    }
    
    /**
     * Maneja el redimensionado de la ventana
     */
    handleWindowResize() {
        // Recalcular factor de velocidad basado en nuevo tamaño
        const newSpeedFactor = PreloaderUtils.getSpeedFactor();
        if (newSpeedFactor !== this.speedFactor) {
            this.speedFactor = newSpeedFactor;
            console.log('📐 Factor de velocidad actualizado:', this.speedFactor);
        }
    }
    
    /**
     * Maneja errores durante la inicialización
     * @param {Error} error - Error ocurrido
     */
    handleInitializationError(error) {
        console.error('💥 Error crítico de inicialización:', error);
        
        // Intentar mostrar mensaje de error al usuario
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 20px;
            border-radius: 8px;
            font-family: sans-serif;
            text-align: center;
            z-index: 10000;
        `;
        errorMessage.innerHTML = `
            <h3>Error del Sistema</h3>
            <p>No se pudo inicializar el preloader.</p>
            <button onclick="location.reload()" style="
                margin-top: 10px;
                padding: 8px 16px;
                background: white;
                color: #ff4444;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            ">Recargar Página</button>
        `;
        
        document.body.appendChild(errorMessage);
    }
    
    /**
     * Destruye el sistema y libera todos los recursos
     */
    destroy() {
        console.log('🗑️ Destruyendo sistema...');
        
        // Limpiar recursos activos
        this.cleanupActiveResources();
        
        // Destruir managers
        if (this.animationManager) {
            this.animationManager.destroy();
        }
        
        // Remover event listeners
        document.removeEventListener('keydown', this.handleKeyboardInteraction);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        
        if (this.elements.restartButton) {
            this.elements.restartButton.removeEventListener('click', this.handleRestart);
        }
        
        // Limpiar referencias
        this.elements = {};
        this.animationManager = null;
        this.stateManager = null;
        
        console.log('✅ Sistema destruido');
    }
}

// ===================================
// INICIALIZACIÓN AUTOMÁTICA DEL SISTEMA
// ===================================

/**
 * Función de inicialización automática
 * Se ejecuta cuando el DOM está completamente cargado
 */
function initializePreloaderSystem() {
    console.log('🌟 Inicializando Sistema de Preloader Minimalista...');
    
    try {
        // Crear instancia del sistema
        window.minimalistPreloader = new MinimalistPreloaderSystem();
        
        // Inicializar sistema
        window.minimalistPreloader.init();
        
        // Exponer utilidades para debugging (solo en desarrollo)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.preloaderDebug = {
                restart: () => window.minimalistPreloader.restartSystem(),
                state: () => window.minimalistPreloader.stateManager.getState(),
                history: () => window.minimalistPreloader.stateManager.getStateHistory(),
                progress: () => window.minimalistPreloader.currentProgress
            };
            
            console.log('🔧 Herramientas de debug disponibles en window.preloaderDebug');
        }
        
    } catch (error) {
        console.error('💥 Error fatal en inicialización:', error);
    }
}

/**
 * Función de limpieza al salir de la página
 */
function cleanupPreloaderSystem() {
    if (window.minimalistPreloader) {
        window.minimalistPreloader.destroy();
        window.minimalistPreloader = null;
    }
}

// ===================================
// EVENT LISTENERS GLOBALES
// ===================================

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePreloaderSystem);
} else {
    // DOM ya está cargado
    initializePreloaderSystem();
}

// Limpiar recursos al salir
window.addEventListener('beforeunload', cleanupPreloaderSystem);

// Prevenir comportamientos no deseados durante la carga
document.addEventListener('contextmenu', (e) => {
    if (window.minimalistPreloader && 
        window.minimalistPreloader.stateManager.isState(PRELOADER_CONFIG.STATES.LOADING)) {
        e.preventDefault();
    }
});

// Logging de sistema cargado
console.log('📦 Sistema de Preloader Minimalista Elegante 2025 - Completamente Cargado');
console.log('🎯 Configuración:', PRELOADER_CONFIG);
console.log('⚡ Listo para una experiencia elegante y minimalista');