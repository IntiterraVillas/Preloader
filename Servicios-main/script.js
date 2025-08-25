// Hero fade out on scroll
document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let lastScrollTop = 0;
    let isHidden = false;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = hero.offsetHeight;

        // Determinar dirección del scroll
        if (scrollTop > lastScrollTop) {
            // Scroll hacia abajo
            if (scrollTop > heroHeight/2 && !isHidden) {
                hero.style.transform = 'translateY(-100%)';
                hero.style.opacity = '0';
                setTimeout(() => {
                    hero.style.display = 'none';
                    isHidden = true;
                }, 300);
            }
        } else {
            // Scroll hacia arriba
            if (scrollTop < heroHeight && isHidden) {
                hero.style.display = 'block';
                // Pequeño timeout para asegurar que el display: block se aplique antes de la animación
                setTimeout(() => {
                    hero.style.transform = 'translateY(0)';
                    hero.style.opacity = '1';
                    isHidden = false;
                }, 10);
            }
        }

        lastScrollTop = scrollTop;
    });
});



// Selecciona todos los enlaces con data-images
document.querySelectorAll('.card-image-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const images = JSON.parse(link.getAttribute('data-images'));
    openGallery(images);
  });
});

function openGallery(images) {
  // Ejemplo mínimo de lightbox: crea un overlay y muestra la primera imagen
  const overlay = document.createElement('div');
  overlay.className = 'gallery-overlay';

  const img = document.createElement('img');
  img.src = images[0];
  img.className = 'gallery-image';

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // Cierra al hacer clic
  overlay.addEventListener('click', () => document.body.removeChild(overlay));
}





