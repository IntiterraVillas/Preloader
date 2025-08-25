/**
 * Carrusel Modal Ultra Minimalista
 * JavaScript vanilla sin dependencias - Integración automática
 */

class MinimalCarousel {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.swipeThreshold = 50;
    this.isDragging = false;
    this.dragStartX = 0;
    this.animationDuration = 300;
    
    this.modal = null;
    this.modalImage = null;
    this.dotsContainer = null;
    this.modalBackdrop = null;
    
    console.log('MinimalCarousel initialized');
    this.init();
  }

  init() {
    this.createModal();
    this.bindGlobalEvents();
    this.setupAutoIntegration();
  }

  // Integración automática - busca todos los elementos con class="card-image-link"
  setupAutoIntegration() {
    const attachLinks = () => {
      console.log('Setting up auto integration...');
      this.attachToCardLinks();
    };

    // Si el DOM ya está cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachLinks);
    } else {
      attachLinks();
    }
    
    // Observer para detectar nuevos elementos agregados dinámicamente
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const cardLinks = node.querySelectorAll ? node.querySelectorAll('.card-image-link') : [];
            cardLinks.forEach(link => this.attachToCardLink(link));
            
            if (node.classList && node.classList.contains('card-image-link')) {
              this.attachToCardLink(node);
            }
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  attachToCardLinks() {
    const cardLinks = document.querySelectorAll('.card-image-link');
    console.log(`Found ${cardLinks.length} card-image-link elements`);
    cardLinks.forEach(link => this.attachToCardLink(link));
  }

  attachToCardLink(link) {
    // Evitar duplicar event listeners
    if (link.dataset.carouselAttached) return;
    link.dataset.carouselAttached = 'true';
    
    console.log('Attaching carousel to link:', link);
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Card link clicked!', link);
      
      // Extraer imágenes del data-images
      const imagesData = link.dataset.images;
      if (imagesData) {
        try {
          this.images = JSON.parse(imagesData);
          this.currentIndex = 0;
          console.log('Opening carousel with images:', this.images);
          this.open();
        } catch (error) {
          console.warn('Error parsing data-images:', error);
        }
      } else {
        console.warn('No data-images found on element:', link);
      }
    });
    
    // También agregar evento para Enter en teclado
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        link.click();
      }
    });
  }

  createModal() {
    // Verificar si ya existe
    let existingModal = document.getElementById('minimalModal');
    if (existingModal) {
      this.modal = existingModal;
      this.modalImage = document.getElementById('modalImage');
      this.dotsContainer = document.getElementById('dotsContainer');
      this.modalBackdrop = document.getElementById('modalBackdrop');
      this.bindModalEvents();
      return;
    }

    // Crear modal si no existe
    const modalHTML = `
      <div class="minimal-modal hidden" id="minimalModal" role="dialog" aria-modal="true">
        <div class="modal-backdrop" id="modalBackdrop"></div>
        
        <div class="modal-content">
          <button class="modal-close" id="modalClose" aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="image-container">
            <button class="nav-arrow nav-prev" id="navPrev" aria-label="Imagen anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            
            <img class="modal-image" id="modalImage" alt="" />
            
            <button class="nav-arrow nav-next" id="navNext" aria-label="Imagen siguiente">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
          
          <div class="dots-container" id="dotsContainer"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    this.modal = document.getElementById('minimalModal');
    this.modalImage = document.getElementById('modalImage');
    this.dotsContainer = document.getElementById('dotsContainer');
    this.modalBackdrop = document.getElementById('modalBackdrop');
    
    console.log('Modal created:', this.modal);
    this.bindModalEvents();
  }

  bindModalEvents() {
    const modalClose = document.getElementById('modalClose');
    const navPrev = document.getElementById('navPrev');
    const navNext = document.getElementById('navNext');

    console.log('Binding modal events...');

    // Botón cerrar
    if (modalClose) {
      modalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.close();
      });
    }
    
    // Navegación
    if (navPrev) {
      navPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        this.previous();
      });
    }
    
    if (navNext) {
      navNext.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }
    
    // Click en backdrop para cerrar
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', () => {
        this.close();
      });
    }
    
    // Eventos táctiles y gestuales
    this.setupTouchEvents();
    this.setupMouseEvents();
  }

  bindGlobalEvents() {
    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.close();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.previous();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.next();
          break;
        case ' ':
          if (!e.target.closest('button, input, textarea')) {
            e.preventDefault();
            this.next();
          }
          break;
      }
    });

    // Prevenir scroll cuando modal está abierto
    document.addEventListener('wheel', (e) => {
      if (this.isOpen && e.target.closest('.minimal-modal')) {
        e.preventDefault();
      }
    }, { passive: false });

    // Resize handler
    window.addEventListener('resize', () => {
      if (this.isOpen) {
        this.adjustImageSize();
      }
    });
  }

  setupTouchEvents() {
    if (!this.modalImage) return;

    this.modalImage.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      
      // Mostrar controles en móviles
      if (window.innerWidth <= 480) {
        const modalContent = this.modal.querySelector('.modal-content');
        if (modalContent) {
          modalContent.classList.add('show-controls');
          setTimeout(() => {
            modalContent.classList.remove('show-controls');
          }, 3000);
        }
      }
    }, { passive: true });

    this.modalImage.addEventListener('touchmove', (e) => {
      if (!this.touchStartX || !this.touchStartY) return;
      
      this.touchEndX = e.touches[0].clientX;
      this.touchEndY = e.touches[0].clientY;
    }, { passive: true });

    this.modalImage.addEventListener('touchend', (e) => {
      if (!this.touchStartX || !this.touchStartY) return;
      
      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;
      
      // Detectar swipe horizontal
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.swipeThreshold) {
        if (deltaX > 0) {
          this.previous();
        } else {
          this.next();
        }
      }
      
      // Reset
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.touchEndX = 0;
      this.touchEndY = 0;
    }, { passive: true });
  }

  setupMouseEvents() {
    if (!this.modalImage) return;

    // Drag para navegación en desktop
    this.modalImage.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      const deltaX = e.clientX - this.dragStartX;
      
      if (Math.abs(deltaX) > this.swipeThreshold) {
        if (deltaX > 0) {
          this.previous();
        } else {
          this.next();
        }
        this.isDragging = false;
      }
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }

  open() {
    if (this.images.length === 0) {
      console.warn('No images to show');
      return;
    }
    
    console.log('Opening modal...');
    this.isOpen = true;
    document.body.classList.add('modal-open');
    if (this.modal) {
      this.modal.classList.remove('hidden');
    }
    
    this.updateImage();
    this.createDots();
    
    // Focus para accesibilidad
    setTimeout(() => {
      const modalClose = document.getElementById('modalClose');
      if (modalClose) modalClose.focus();
    }, 100);

    // Precargar imágenes adyacentes
    this.preloadAdjacentImages();
  }

  close() {
    console.log('Closing modal...');
    this.isOpen = false;
    document.body.classList.remove('modal-open');
    if (this.modal) {
      this.modal.classList.add('hidden');
    }
    
    // Limpiar memoria
    this.images = [];
    this.currentIndex = 0;
  }

  previous() {
    if (this.images.length === 0) return;
    
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.updateImage();
    this.updateDots();
    this.preloadAdjacentImages();
  }

  next() {
    if (this.images.length === 0) return;
    
    this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    this.updateImage();
    this.updateDots();
    this.preloadAdjacentImages();
  }

  goToImage(index) {
    if (index < 0 || index >= this.images.length) return;
    
    this.currentIndex = index;
    this.updateImage();
    this.updateDots();
    this.preloadAdjacentImages();
  }

  updateImage() {
    if (!this.modalImage || this.images.length === 0) return;
    
    const currentImageSrc = this.images[this.currentIndex];
    console.log('Updating image to:', currentImageSrc);
    
    // Transición suave
    this.modalImage.classList.add('changing');
    
    // Cargar nueva imagen
    const img = new Image();
    img.onload = () => {
      this.modalImage.src = currentImageSrc;
      this.modalImage.alt = `Imagen ${this.currentIndex + 1} de ${this.images.length}`;
      this.modalImage.classList.remove('changing', 'loading');
      this.adjustImageSize();
    };
    
    img.onerror = () => {
      console.warn('Error loading image:', currentImageSrc);
      this.modalImage.classList.remove('changing', 'loading');
    };
    
    this.modalImage.classList.add('loading');
    img.src = currentImageSrc;
  }

  adjustImageSize() {
    // Ajustes responsivos automáticos ya manejados por CSS
    // Esta función puede extenderse para ajustes más específicos si es necesario
  }

  createDots() {
    if (!this.dotsContainer || this.images.length <= 1) {
      if (this.dotsContainer) this.dotsContainer.innerHTML = '';
      return;
    }
    
    this.dotsContainer.innerHTML = '';
    
    this.images.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
      dot.type = 'button';
      
      if (index === this.currentIndex) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToImage(index);
      });
      
      this.dotsContainer.appendChild(dot);
    });
  }

  updateDots() {
    if (!this.dotsContainer) return;
    
    const dots = this.dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  preloadAdjacentImages() {
    if (this.images.length <= 1) return;
    
    const preloadIndices = [];
    
    // Imagen anterior
    const prevIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    preloadIndices.push(prevIndex);
    
    // Imagen siguiente
    const nextIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    preloadIndices.push(nextIndex);
    
    preloadIndices.forEach(index => {
      const img = new Image();
      img.src = this.images[index];
    });
  }

  // Método público para uso programático
  static init() {
    return new MinimalCarousel();
  }

  // Método para agregar imágenes programáticamente
  addImageSet(selector, images) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.add('card-image-link');
      element.dataset.images = JSON.stringify(images);
      this.attachToCardLink(element);
    });
  }

  // Destructor para limpieza de memoria
  destroy() {
    this.close();
    
    // Remover modal del DOM
    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
    }
    
    // Limpiar referencias
    this.modal = null;
    this.modalImage = null;
    this.dotsContainer = null;
    this.modalBackdrop = null;
    this.images = [];
  }
}

// Auto-inicialización
let minimalCarousel;

// Función para inicializar
function initCarousel() {
  console.log('Initializing MinimalCarousel...');
  minimalCarousel = new MinimalCarousel();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}

// Exponer globalmente para uso programático
window.MinimalCarousel = MinimalCarousel;
window.minimalCarousel = minimalCarousel;

// Utilidad para agregar carrusel a elementos existentes
window.addCarouselToElements = function(selector, images) {
  if (window.minimalCarousel) {
    window.minimalCarousel.addImageSet(selector, images);
  }
};

// Performance: debounce para eventos frecuentes
function debounce(func, wait) {
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

// Exportar para módulos ES6 si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MinimalCarousel;
}

// AMD support
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return MinimalCarousel;
  });
}