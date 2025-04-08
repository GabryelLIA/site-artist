/**
 * Enhanced Lightbox JavaScript file for Claude Marthe Portfolio
 * Implements PhotoSwipe for advanced gallery viewing experience
 */

document.addEventListener('DOMContentLoaded', function() {
    // PhotoSwipe initialization is now handled in gallery.js
    
    // For backward compatibility, we'll maintain minimal lightbox functionality
    // to support any old code that might be expecting the lightbox behavior
    initBasicLightboxFallback();
});

/**
 * Initialize basic lightbox functionality as a fallback
 * This redirects old lightbox behavior to PhotoSwipe
 */
function initBasicLightboxFallback() {
    const lightbox = document.getElementById('lightbox');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    
    // Hide the old lightbox element if it exists
    if (lightbox) {
        lightbox.style.display = 'none';
    }
    
    // If there's no PhotoSwipe implementation, maintain minimal functionality
    if (!window.PhotoSwipe && lightbox) {
        console.warn('PhotoSwipe not loaded, falling back to basic lightbox');
        
        let currentIndex = 0;
        let images = [];
        
        // Collect image sources
        lightboxTriggers.forEach((trigger, index) => {
            const imageSrc = trigger.getAttribute('data-image');
            if (imageSrc) {
                images.push({
                    src: imageSrc,
                    alt: trigger.querySelector('img')?.alt || 'Gallery image'
                });
            }
        });
        
        // Re-enable the lightbox and set up basic functionality
        lightbox.style.display = '';
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-prev');
        const lightboxNext = lightbox.querySelector('.lightbox-next');
        
        if (!lightboxImg) return;
        
        // Basic lightbox functionality
        function updateImage() {
            if (images[currentIndex]) {
                lightboxImg.src = images[currentIndex].src;
                lightboxImg.alt = images[currentIndex].alt;
            }
        }
        
        function openLightbox(index) {
            currentIndex = index;
            updateImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Set up event listeners
        lightboxTriggers.forEach((trigger, index) => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(index);
            });
        });
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateImage();
            });
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    if (lightboxPrev) lightboxPrev.click();
                    break;
                case 'ArrowRight':
                    if (lightboxNext) lightboxNext.click();
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        });
    }
}
