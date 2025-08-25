// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Add smooth scrolling for any internal links
    addSmoothScrolling();
    
    // Add interactive feedback for buttons
    addButtonInteractions();
    
    // Add animations for cards when they come into view
    addScrollAnimations();
    
    // Add click tracking for the map button
    trackMapInteractions();
    
    // Add accessibility features
    addAccessibilityFeatures();
    
    // Initialize quick action buttons
    initializeQuickActions();
    
    // Add entrance image error handling
    handleImageLoading();
    
    console.log('Intiterra Apart Hotel - Parking Info App loaded successfully');
}

// Handle card keypress events
function handleCardKeypress(event, callback) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callback();
    }
}

// Show location info
function showLocationInfo() {
    showModal('Información de ubicación', `
        <div class="location-info">
            <div class="location-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <strong>Ubicación exacta</strong>
                    <p>Portón metálico de color rojo oscuro (vino tinto) ubicado a tu mano izquierda</p>
                </div>
            </div>
            <div class="location-item">
                <i class="fas fa-route"></i>
                <div>
                    <strong>Cómo llegar</strong>
                    <p>Sigue el camino completamente recto desde la entrada principal</p>
                </div>
            </div>
            <div class="location-item">
                <i class="fas fa-eye"></i>
                <div>
                    <strong>Qué buscar</strong>
                    <p>Un portón metálico grande, claramente identificado con la señalización del hotel</p>
                </div>
            </div>
        </div>
        <div class="modal-actions">
            <a href="https://maps.app.goo.gl/NeCb8rqQw92XqvNC9" target="_blank" class="btn btn--primary">
                <i class="fas fa-directions"></i>
                Abrir en Maps
            </a>
        </div>
    `);
}

// Show schedule info
function showScheduleInfo() {
    showModal('Horarios de acceso', `
        <div class="schedule-info">
            <div class="schedule-item">
                <i class="fas fa-clock"></i>
                <div>
                    <strong>Horario del garaje</strong>
                    <p>Acceso disponible las <strong>24 horas del día</strong></p>
                </div>
            </div>
            <div class="schedule-item">
                <i class="fas fa-key"></i>
                <div>
                    <strong>Acceso</strong>
                    <p>Una vez que llegues al portón, contacta con recepción para el acceso</p>
                </div>
            </div>
            <div class="schedule-item">
                <i class="fas fa-info-circle"></i>
                <div>
                    <strong>Importante</strong>
                    <p>El acceso está disponible todos los días del año sin excepción</p>
                </div>
            </div>
        </div>
    `);
}

// Handle entrance image loading
function handleImageLoading() {
    const entranceImage = document.querySelector('.entrance-image');
    const logoImage = document.querySelector('.logo-image');
    
    if (entranceImage) {
        entranceImage.addEventListener('load', function() {
            // Image loaded successfully, add click handler for zoom
            this.style.cursor = 'pointer';
            this.setAttribute('title', 'Hacer clic para ver imagen ampliada');
            this.addEventListener('click', function() {
                showImageModal(this.src);
            });
        });
    }
    
    if (logoImage) {
        logoImage.addEventListener('load', function() {
            console.log('Logo image loaded successfully');
        });
    }
}

// Show image in modal for better viewing
function showImageModal(imageUrl) {
    if (!imageUrl) return;
    
    showModal('Imagen de la entrada del garaje', `
        <div class="image-modal-content">
            <img src="${imageUrl}" alt="Entrada del garaje - Portón rojo oscuro" style="
                width: 100%;
                height: auto;
                border-radius: 8px;
                border: 2px solid var(--wine-red-light);
                margin-bottom: 16px;
                max-height: 60vh;
                object-fit: contain;
            ">
            <div class="image-modal-description">
                <h4 style="color: var(--wine-red-primary); margin-bottom: 8px;">
                    <i class="fas fa-map-marker-alt"></i> Ubicación exacta
                </h4>
                <p style="color: var(--text-medium); margin: 0; line-height: 1.5;">
                    Esta es la entrada que debes buscar: un portón metálico de color rojo oscuro (vino tinto) 
                    ubicado a tu <strong>mano izquierda</strong> mientras sigues el camino recto.
                </p>
            </div>
        </div>
    `);
}

// Smooth scrolling for internal links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add interactive feedback for buttons
function addButtonInteractions() {
    const buttons = document.querySelectorAll('.btn, .quick-action-btn');
    
    buttons.forEach(button => {
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('quick-action-btn')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('quick-action-btn')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Add click feedback
        button.addEventListener('click', function(e) {
            // Don't add ripple to external links or quick action buttons
            if (this.hasAttribute('href') || this.classList.contains('quick-action-btn')) {
                return;
            }
            
            // Create ripple effect with wine red color
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add scroll animations for cards
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const elementsToAnimate = document.querySelectorAll('.card, .welcome-card, .info-card, .alert-card');
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-ready');
        observer.observe(element);
    });
}

// Track map interactions
function trackMapInteractions() {
    const mapButtons = document.querySelectorAll('a[href*="maps.app.goo.gl"], a[href*="maps.google.com"]');
    
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show confirmation message
            showNotification('Abriendo Google Maps...', 'info');
            
            // Track the interaction
            console.log('User opened Google Maps for garage location');
        });
    });
}

// Initialize quick action buttons
function initializeQuickActions() {
    // Quick action buttons are already in the HTML, just need to ensure they work
    console.log('Quick action buttons initialized');
}

// Copy location function
function copyLocation() {
    const locationUrl = 'https://maps.app.goo.gl/NeCb8rqQw92XqvNC9';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(locationUrl).then(function() {
            showNotification('Ubicación copiada al portapapeles', 'success');
        }).catch(function(err) {
            console.error('Error copying to clipboard:', err);
            fallbackCopyToClipboard(locationUrl);
        });
    } else {
        fallbackCopyToClipboard(locationUrl);
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Ubicación copiada al portapapeles', 'success');
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showNotification('No se pudo copiar. Usa el botón de Google Maps.', 'warning');
    }
    
    document.body.removeChild(textArea);
}

// Share location function
function shareLocation() {
    const locationUrl = 'https://maps.app.goo.gl/NeCb8rqQw92XqvNC9';
    const shareText = 'Garaje de Intiterra Apart Hotel - Busca el portón rojo oscuro a la izquierda';
    
    if (navigator.share) {
        navigator.share({
            title: 'Ubicación del Garaje - Intiterra Apart Hotel',
            text: shareText,
            url: locationUrl
        }).then(() => {
            showNotification('Ubicación compartida', 'success');
        }).catch((err) => {
            console.log('Error sharing:', err);
            fallbackShare(locationUrl, shareText);
        });
    } else {
        fallbackShare(locationUrl, shareText);
    }
}

// Fallback share method
function fallbackShare(url, text) {
    const shareData = `${text}\n${url}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareData).then(() => {
            showNotification('Información copiada. Ahora puedes pegarla donde quieras compartirla.', 'success');
        }).catch(() => {
            showModal('Compartir ubicación', `
                <p>Copia esta información para compartir:</p>
                <div class="share-content">
                    <p><strong>${text}</strong></p>
                    <p><a href="${url}" target="_blank">${url}</a></p>
                </div>
            `);
        });
    } else {
        showModal('Compartir ubicación', `
            <p>Copia esta información para compartir:</p>
            <div class="share-content">
                <p><strong>${text}</strong></p>
                <p><a href="${url}" target="_blank">${url}</a></p>
            </div>
        `);
    }
}

// Show contact info function
function showContactInfo() {
    showModal('Información de contacto', `
        <div class="contact-info">
            <div class="contact-item">
                <i class="fas fa-hotel"></i>
                <div>
                    <strong>Intiterra Apart Hotel</strong>
                    <p>Recepción disponible 24 horas para asistencia</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-clock"></i>
                <div>
                    <strong>Horario del garaje</strong>
                    <p>Acceso disponible las 24 horas, todos los días</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <strong>Referencia visual</strong>
                    <p>Portón metálico rojo oscuro (vino tinto) a la izquierda</p>
                </div>
            </div>
            <div class="contact-item">
                <i class="fas fa-info-circle"></i>
                <div>
                    <strong>Instrucciones</strong>
                    <p>Sigue el camino recto hasta encontrar el portón identificado</p>
                </div>
            </div>
        </div>
        <div class="modal-actions">
            <a href="https://maps.app.goo.gl/NeCb8rqQw92XqvNC9" target="_blank" class="btn btn--primary">
                <i class="fas fa-directions"></i>
                Ver ubicación
            </a>
        </div>
    `);
}

// Show modal function - FIXED to handle overlay clicks properly
function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__overlay"></div>
        <div class="modal__content">
            <div class="modal__header">
                <h3>${title}</h3>
                <button class="modal__close" aria-label="Cerrar modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal__body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Add event listeners for closing the modal
    const overlay = modal.querySelector('.modal__overlay');
    const closeButton = modal.querySelector('.modal__close');
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Close on close button click
    closeButton.addEventListener('click', closeModal);
    
    // Focus management
    const firstFocusable = modal.querySelector('button, a, input, textarea, select');
    if (firstFocusable) {
        firstFocusable.focus();
    }
    
    // Close on Escape key
    document.addEventListener('keydown', handleModalKeydown);
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', handleModalKeydown);
    }
}

// Handle modal keyboard interactions
function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles with wine red theme
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--cream-light);
        color: var(--text-dark);
        padding: 16px 20px;
        border-radius: 8px;
        border: 2px solid var(--wine-red-light);
        box-shadow: 0 4px 20px rgba(114, 47, 55, 0.2);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 250ms ease;
        max-width: 320px;
        min-width: 250px;
    `;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'var(--wine-red-primary)';
        notification.style.background = 'var(--wine-red-lighter)';
    } else if (type === 'warning') {
        notification.style.borderColor = 'var(--gold-accent)';
        notification.style.background = 'var(--gold-light)';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        info: 'info-circle',
        success: 'check-circle',
        warning: 'exclamation-triangle',
        error: 'exclamation-circle'
    };
    return icons[type] || 'info-circle';
}

// Add accessibility features
function addAccessibilityFeatures() {
    // Add keyboard navigation for cards
    const focusableCards = document.querySelectorAll('.info-card, .welcome-card, .quick-action-btn');
    
    focusableCards.forEach(card => {
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Focus first interactive element inside card if any, or trigger click
                const button = card.querySelector('button, a');
                if (button) {
                    button.click();
                } else if (this.onclick) {
                    this.onclick();
                } else {
                    this.click();
                }
            }
        });
    });
    
    // Add aria-labels for better screen reader support
    const stepNumbers = document.querySelectorAll('.step__number');
    stepNumbers.forEach((step, index) => {
        step.setAttribute('aria-label', `Paso ${index + 1}`);
    });
    
    // Add skip link for keyboard users
    addSkipLink();
    
    // Add image alt text enhancements
    const entranceImage = document.querySelector('.entrance-image');
    if (entranceImage) {
        entranceImage.setAttribute('role', 'img');
        entranceImage.setAttribute('aria-describedby', 'entrance-description');
    }
}

// Add skip link for accessibility
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--wine-red-primary);
        color: var(--cream-light);
        padding: 8px 12px;
        text-decoration: none;
        border-radius: 6px;
        transition: top 150ms ease;
        z-index: 1001;
        font-weight: 500;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Add CSS for animations and interactions
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 400ms ease, transform 400ms ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
        }
        
        .notification__content i {
            color: var(--wine-red-primary);
            font-size: 1.2rem;
        }
        
        .skip-link:focus {
            outline: 2px solid var(--cream-light);
            outline-offset: 2px;
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
        }
        
        .modal__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(114, 47, 55, 0.6);
            backdrop-filter: blur(4px);
        }
        
        .modal__content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--cream-light);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(114, 47, 55, 0.3);
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            border: 2px solid var(--wine-red-light);
        }
        
        .modal__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            border-bottom: 2px solid var(--wine-red-light);
            background: var(--wine-red-lighter);
        }
        
        .modal__header h3 {
            margin: 0;
            color: var(--wine-red-primary);
            font-size: 1.25rem;
        }
        
        .modal__close {
            background: none;
            border: none;
            font-size: 1.25rem;
            color: var(--wine-red-primary);
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            transition: background 200ms ease;
        }
        
        .modal__close:hover {
            background: var(--wine-red-light);
        }
        
        .modal__body {
            padding: 24px;
        }
        
        .contact-info, .location-info, .schedule-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .contact-item, .location-item, .schedule-item {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 16px;
            background: var(--beige-light);
            border-radius: 8px;
            border: 1px solid var(--wine-red-light);
        }
        
        .contact-item i, .location-item i, .schedule-item i {
            color: var(--wine-red-primary);
            font-size: 1.25rem;
            margin-top: 2px;
            min-width: 20px;
        }
        
        .contact-item strong, .location-item strong, .schedule-item strong {
            color: var(--wine-red-primary);
            margin-bottom: 4px;
            display: block;
            font-size: 1.1rem;
        }
        
        .contact-item p, .location-item p, .schedule-item p {
            color: var(--text-medium);
            margin: 0;
            line-height: 1.4;
        }
        
        .modal-actions {
            margin-top: 24px;
            display: flex;
            justify-content: center;
            gap: 12px;
        }
        
        .share-content {
            background: var(--beige-light);
            padding: 20px;
            border-radius: 8px;
            border: 2px solid var(--wine-red-light);
            margin-top: 16px;
        }
        
        .share-content p {
            margin: 0 0 12px 0;
            color: var(--text-dark);
        }
        
        .share-content a {
            color: var(--wine-red-primary);
            word-break: break-all;
            font-weight: 500;
        }
        
        body.modal-open {
            overflow: hidden;
        }
        
        .image-modal-content {
            text-align: center;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .animate-ready,
            .animate-in,
            .ripple {
                transition: none;
                animation: none;
            }
        }
        
        @media (max-width: 768px) {
            .modal__content {
                width: 95%;
                margin: 0 2.5%;
            }
            
            .modal__header,
            .modal__body {
                padding: 16px;
            }
            
            .contact-item, .location-item, .schedule-item {
                padding: 12px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Handle errors gracefully
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Ha ocurrido un error. La página sigue funcionando correctamente.', 'warning');
});

// Handle offline/online status
window.addEventListener('online', function() {
    showNotification('Conexión restablecida', 'success');
});

window.addEventListener('offline', function() {
    showNotification('Sin conexión a internet. Algunas funciones pueden no estar disponibles.', 'warning');
});