/**
 * Duplex Familiar - Ultra Elegante Carousel - FIXED VERSION
 * Manejo perfecto de imágenes de diferentes dimensiones
 */

class ElegantCarousel {
  constructor() {
    // Datos de las imágenes
    this.images = [
      {
        src: 'du1.jpg',
        alt: 'Duplex Familiar - Vista 1',
        title: 'Suite Principal',
        description: 'Espacio elegante con acabados de lujo y confort excepcional'
      },
      {
        src: 'du2.jpg',
        alt: 'Duplex Familiar - Vista 2', 
        title: 'Área de Descanso',
        description: 'Ambiente relajante diseñado para el máximo bienestar'
      },
      {
        src: 'du3.JPG',
        alt: 'Duplex Familiar - Vista 3',
        title: 'Detalles Exclusivos',
        description: 'Elementos únicos que definen la experiencia superior'
      },
      {
        src: 'du4.JPG',
        alt: 'Duplex Familiar - Vista 4',
        title: 'Vista Panorámica',
        description: 'Perspectiva completa del refinamiento y elegancia'
      },
      {
        src: 'du5.JPG',
        alt: 'Duplex Familiar - Vista 4',
        title: 'Vista Panorámica',
        description: 'Perspectiva completa del refinamiento y elegancia'
      },
      {
        src: 'du6.JPG',
        alt: 'Duplex Familiar - Vista 4',
        title: 'Vista Panorámica',
        description: 'Perspectiva completa del refinamiento y elegancia'
      },
      {
        src: 'du7.JPG',
        alt: 'Duplex Familiar - Vista 4',
        title: 'Vista Panorámica',
        description: 'Perspectiva completa del refinamiento y elegancia'
      },
      {
        src: 'du8.JPG',
        alt: 'Duplex Familiar - Vista 4',
        title: 'Vista Panorámica',
        description: 'Perspectiva completa del refinamiento y elegancia'
      },
      {
        src: 'du9.JPG',
        alt: 'Duplex Familiar - Vista 4',
        title: 'Vista Panorámica',
        description: 'Perspectiva completa del refinamiento y elegancia'
      },
      {
        src: 'du10.JPG',
        alt: 'Duplex Familiar - Vista 4',
        title: 'Vista Panorámica',
        description: 'Perspectiva completa del refinamiento y elegancia'
      }
    ];

    // Estado del carousel
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.autoplayInterval = null;
    this.isAutoplayActive = false;
    
    // Elementos DOM
    this.elements = {};
    
    // Configuraciones
    this.autoplayDelay = 5000;
    this.transitionDuration = 600;
    
    this.init();
  }

  /**
   * Inicialización principal
   */
  async init() {
    try {
      this.cacheElements();
      this.setupEventListeners();
      this.setupKeyboardNavigation();
      this.setupTouchGestures();
      
      // Inicializar UI inmediatamente
      this.updateUI();
      this.loadCurrentImage();
      
      // Precargar otras imágenes
      this.preloadImages();
      this.startAutoplay();
    } catch (error) {
      console.error('Error al inicializar el carousel:', error);
      this.handleError('Error al cargar el carousel');
    }
  }

  /**
   * Cache de elementos DOM
   */
  cacheElements() {
    // Elementos principales
    this.elements.currentImage = document.getElementById('currentImage');
    this.elements.imageTitle = document.getElementById('imageTitle');
    this.elements.imageDescription = document.getElementById('imageDescription');
    this.elements.navPrev = document.getElementById('navPrev');
    this.elements.navNext = document.getElementById('navNext');

    // Contadores
    this.elements.currentSlideSpan = document.querySelector('.current-slide');
    this.elements.totalSlidesSpan = document.querySelector('.total-slides');

    // Elementos múltiples
    this.elements.indicators = document.querySelectorAll('.indicator');
    this.elements.thumbnails = document.querySelectorAll('.thumbnail');
    this.elements.skeleton = document.querySelector('.image-skeleton');
    
    // Verificar elementos críticos
    if (!this.elements.currentImage) {
      console.error('Elemento de imagen principal no encontrado');
    }
  }

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
    // Navegación con botones
    if (this.elements.navPrev) {
      this.elements.navPrev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.prevSlide();
      });
    }

    if (this.elements.navNext) {
      this.elements.navNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.nextSlide();
      });
    }

    // Indicadores
    this.elements.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToSlide(index);
      });
    });

    // Thumbnails
    this.elements.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToSlide(index);
      });
    });

    // Pausa autoplay en hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        this.pauseAutoplay();
      });

      carouselContainer.addEventListener('mouseleave', () => {
        this.startAutoplay();
      });
    }

    // Control de visibilidad de página
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoplay();
      } else if (!this.isAutoplayActive) {
        this.startAutoplay();
      }
    });
  }

  /**
   * Navegación con teclado
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Solo activar si no está en un input
      if (e.target.matches('input, textarea, select')) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextSlide();
          break;
        case ' ': // Spacebar
          e.preventDefault();
          this.toggleAutoplay();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.images.length - 1);
          break;
      }
    });
  }

  /**
   * Gestos táctiles
   */
  setupTouchGestures() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;

    let startX = 0;
    let startY = 0;
    let isDragging = false;
    const minSwipeDistance = 50;

    carouselContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
      this.pauseAutoplay();
    }, { passive: true });

    carouselContainer.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      // Prevenir scroll vertical si el gesto es principalmente horizontal
      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault();
      }
    }, { passive: false });

    carouselContainer.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }

      isDragging = false;
      this.startAutoplay();
    }, { passive: true });
  }

  /**
   * Cargar imagen actual
   */
  loadCurrentImage() {
    if (!this.elements.currentImage) return;

    const currentImageData = this.images[this.currentIndex];
    
    // Mostrar skeleton mientras carga
    if (this.elements.skeleton) {
      this.elements.skeleton.classList.remove('hidden');
    }

    // Crear nueva imagen para precargar
    const tempImg = new Image();
    
    tempImg.onload = () => {
      // Imagen cargada exitosamente
      this.elements.currentImage.src = tempImg.src;
      this.elements.currentImage.alt = currentImageData.alt;
      this.elements.currentImage.classList.add('active');
      
      // Ocultar skeleton
      if (this.elements.skeleton) {
        setTimeout(() => {
          this.elements.skeleton.classList.add('hidden');
        }, 300);
      }
    };

    tempImg.onerror = () => {
      console.warn(`Error cargando imagen: ${currentImageData.src}`);
      // Mostrar placeholder en caso de error
      this.showImagePlaceholder();
    };

    tempImg.src = currentImageData.src;
  }

  /**
   * Mostrar placeholder de imagen
   */
  showImagePlaceholder() {
    if (!this.elements.currentImage) return;
    
    // Crear SVG placeholder
    const placeholder = this.createImagePlaceholder();
    this.elements.currentImage.src = placeholder;
    this.elements.currentImage.classList.add('active');
    
    if (this.elements.skeleton) {
      this.elements.skeleton.classList.add('hidden');
    }
  }

  /**
   * Crear placeholder SVG
   */
  createImagePlaceholder() {
    const svg = `
      <svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:var(--color-primary);stop-opacity:0.1" />
            <stop offset="100%" style="stop-color:var(--color-teal-400);stop-opacity:0.1" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#grad1)"/>
        <circle cx="400" cy="250" r="40" fill="var(--color-primary)" opacity="0.3"/>
        <rect x="360" y="210" width="80" height="80" rx="8" fill="none" stroke="var(--color-primary)" stroke-width="2" opacity="0.5"/>
        <circle cx="380" cy="230" r="4" fill="var(--color-primary)" opacity="0.7"/>
        <path d="M360 260 L380 240 L420 280 L440 260" fill="none" stroke="var(--color-primary)" stroke-width="2" opacity="0.7"/>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  /**
   * Precargar todas las imágenes
   */
  async preloadImages() {
    const loadPromises = this.images.map((imageData, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ success: true, index });
        img.onerror = () => {
          console.warn(`Error precargando imagen ${index + 1}: ${imageData.src}`);
          resolve({ success: false, index });
        };
        img.src = imageData.src;
      });
    });

    try {
      const results = await Promise.allSettled(loadPromises);
      console.log(`Precargadas ${results.length} imágenes`);
    } catch (error) {
      console.error('Error precargando imágenes:', error);
    }
  }

  /**
   * Ir a slide específico
   */
  goToSlide(index) {
    if (this.isTransitioning || index === this.currentIndex || index < 0 || index >= this.images.length) {
      return;
    }

    console.log(`Cambiando a slide ${index + 1}`);

    this.isTransitioning = true;
    this.currentIndex = index;

    // Actualizar imagen con efecto de transición
    this.updateImageWithTransition();
    this.updateUI();

    // Resetear lock de transición
    setTimeout(() => {
      this.isTransitioning = false;
    }, this.transitionDuration);
  }

  /**
   * Actualizar imagen con transición
   */
  updateImageWithTransition() {
    if (!this.elements.currentImage) return;

    const currentImageData = this.images[this.currentIndex];
    
    // Fade out
    this.elements.currentImage.style.opacity = '0';
    
    setTimeout(() => {
      // Crear nueva imagen para verificar carga
      const tempImg = new Image();
      
      tempImg.onload = () => {
        this.elements.currentImage.src = tempImg.src;
        this.elements.currentImage.alt = currentImageData.alt;
        this.elements.currentImage.style.opacity = '1';
      };
      
      tempImg.onerror = () => {
        console.warn(`Error cargando imagen: ${currentImageData.src}`);
        this.elements.currentImage.src = this.createImagePlaceholder();
        this.elements.currentImage.alt = currentImageData.alt;
        this.elements.currentImage.style.opacity = '1';
      };
      
      tempImg.src = currentImageData.src;
      
    }, 300);
  }

  /**
   * Slide siguiente
   */
  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.goToSlide(nextIndex);
  }

  /**
   * Slide anterior
   */
  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.goToSlide(prevIndex);
  }

  /**
   * Actualizar toda la UI
   */
  updateUI() {
    const currentImageData = this.images[this.currentIndex];

    // Actualizar información de imagen
    if (this.elements.imageTitle) {
      this.elements.imageTitle.textContent = currentImageData.title;
    }

    if (this.elements.imageDescription) {
      this.elements.imageDescription.textContent = currentImageData.description;
    }

    // Actualizar contador - FIX CRÍTICO
    if (this.elements.currentSlideSpan) {
      this.elements.currentSlideSpan.textContent = this.currentIndex + 1;
    }

    if (this.elements.totalSlidesSpan) {
      this.elements.totalSlidesSpan.textContent = this.images.length;
    }

    // Actualizar indicadores
    this.elements.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });

    // Actualizar thumbnails
    this.elements.thumbnails.forEach((thumbnail, index) => {
      thumbnail.classList.toggle('active', index === this.currentIndex);
    });

    // Scroll thumbnail activo a la vista
    const activeThumbnail = document.querySelector('.thumbnail.active');
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    console.log(`UI actualizada - Slide actual: ${this.currentIndex + 1}/${this.images.length}`);
  }

  /**
   * Iniciar autoplay
   */
  startAutoplay() {
    if (this.isAutoplayActive) return;
    
    this.isAutoplayActive = true;
    this.autoplayInterval = setInterval(() => {
      if (!document.hidden && !this.isTransitioning) {
        this.nextSlide();
      }
    }, this.autoplayDelay);
  }

  /**
   * Pausar autoplay
   */
  pauseAutoplay() {
    this.isAutoplayActive = false;
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  /**
   * Toggle autoplay
   */
  toggleAutoplay() {
    if (this.isAutoplayActive) {
      this.pauseAutoplay();
    } else {
      this.startAutoplay();
    }
  }

  /**
   * Manejar errores
   */
  handleError(message) {
    console.error(message);
    
    // Mostrar mensaje de error elegante
    const errorNotification = document.createElement('div');
    errorNotification.className = 'error-notification';
    errorNotification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(220, 38, 127, 0.9);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      backdrop-filter: blur(10px);
      font-size: 14px;
      font-weight: 500;
      border: 1px solid rgba(255, 255, 255, 0.1);
      animation: slideInFromRight 0.3s ease-out;
    `;
    
    errorNotification.textContent = message;
    document.body.appendChild(errorNotification);
    
    // Auto remove después de 5 segundos
    setTimeout(() => {
      if (errorNotification.parentNode) {
        errorNotification.style.animation = 'slideOutToRight 0.3s ease-in';
        setTimeout(() => {
          document.body.removeChild(errorNotification);
        }, 300);
      }
    }, 5000);
  }

  /**
   * Cleanup al destruir
   */
  destroy() {
    this.pauseAutoplay();
    console.log('Carousel destruido');
  }
}

// Agregar estilos dinámicos para animaciones
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutToRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;

document.head.appendChild(dynamicStyles);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Inicializando Duplex Familiar Carousel...');
    window.carousel = new ElegantCarousel();
    
    // Optimización adicional para dispositivos táctiles
    if ('ontouchstart' in window) {
      document.body.classList.add('touch-device');
    }
    
    // Manejar cambios de orientación en móviles
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        if (window.carousel) {
          window.carousel.updateUI();
        }
      }, 100);
    });
    
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
  }
});

// Cleanup al salir
window.addEventListener('beforeunload', () => {
  if (window.carousel) {
    window.carousel.destroy();
  }
});

// Exportar para uso externo si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ElegantCarousel;
}