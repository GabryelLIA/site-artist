/**
 * Main JavaScript file for Claude Marthe Portfolio
 */

// Initialize Alpine.js data
document.addEventListener('alpine:init', () => {
    // Global state and functions for Alpine components
    Alpine.store('app', {
        darkMode: false,
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            document.documentElement.classList.toggle('dark-mode', this.darkMode);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize image loading
    initImageLoading();

    // Initialize back to top button
    initBackToTop();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const closeNav = document.getElementById('close-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const siteNav = document.querySelector('.site-nav');
    
    // Toggle menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close menu
    if (closeNav) {
        closeNav.addEventListener('click', function() {
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Change nav background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            siteNav.classList.add('scrolled');
        } else {
            siteNav.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize GSAP scroll animations
 */
function initScrollAnimations() {
    // Register ScrollTrigger plugin if GSAP is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate hero content
        gsap.from('.hero-content', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animate scroll indicator
        gsap.from('.scroll-indicator', {
            y: -20,
            opacity: 0,
            duration: 1,
            delay: 1,
            ease: 'power3.out'
        });
        
        // Animate section headers on scroll
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
        
        // Animate gallery items on scroll
        gsap.utils.toArray('.gallery-item, .brand-item, .web-item, .catalog-item, .backstage-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1 % 0.5, // Stagger effect but reset after every 5 items
                ease: 'power3.out'
            });
        });
    }
}

/**
 * Initialize image loading with fade-in effect
 */
function initImageLoading() {
    // Add loading class to all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item, .brand-item, .web-item, .catalog-item, .backstage-item');
    
    galleryItems.forEach(item => {
        item.classList.add('loading');
        
        // Get the image inside the item
        const img = item.querySelector('img');
        
        if (img) {
            // Remove loading class and add fade-in class when image is loaded
            img.onload = function() {
                item.classList.remove('loading');
                item.classList.add('fade-in');
            };
            
            // If image is already cached, trigger onload manually
            if (img.complete) {
                img.onload();
            }
        }
    });
    
    // Use ImagesLoaded library if available
    if (typeof imagesLoaded !== 'undefined') {
        // Initialize main gallery with Masonry after images are loaded
        const galleries = document.querySelectorAll('.gallery');
        
        galleries.forEach(gallery => {
            imagesLoaded(gallery, function() {
                console.log('All gallery images loaded');
                
                // Initialize Masonry if available
                if (typeof Masonry !== 'undefined') {
                    new Masonry(gallery, {
                        itemSelector: '.gallery-item',
                        columnWidth: '.gallery-item',
                        percentPosition: true,
                        transitionDuration: '0.4s'
                    });
                }
                
                // Add loaded class to gallery
                gallery.classList.add('is-loaded');
                
                // Add loaded class to gallery container
                const container = gallery.closest('.gallery-container');
                if (container) {
                    container.classList.add('is-loaded');
                }
            });
        });
        
        // Initialize lazySizes if available
        if (window.lazySizes) {
            // lazySizes is already auto-initialized
            // Add event listener for lazySizes loaded images
            document.addEventListener('lazyloaded', function(e) {
                const img = e.target;
                const galleryItem = img.closest('.gallery-item');
                if (galleryItem) {
                    galleryItem.classList.remove('loading');
                    galleryItem.classList.add('fade-in');
                }
            });
        }
    }
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
