/**
 * Enhanced Gallery JavaScript for Claude Marthe Portfolio
 * Implements Masonry, Isotope, Lazy Loading, and PhotoSwipe integration
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load all gallery images first
    loadGalleryImages();
    
    // Then initialize gallery components
    setTimeout(() => {
        initMasonryLayout();
        initIsotopeFiltering();
        initLazyLoading();
        initPhotoSwipe();
    }, 100);
});

/**
 * Load all gallery images dynamically
 */
function loadGalleryImages() {
    // Get the gallery images
    const galleryImages = [
        "Peinture Laure (1).jpeg",
        "Peinture Laure (2).jpeg",
        "Peinture Laure (3).jpeg",
        "Peinture Laure (4).jpeg",
        "Peinture Laure (5).jpeg",
        "Peinture Laure (6).jpeg",
        "Peinture Laure (7).jpeg",
        "Peinture Laure (8).jpeg",
        "Peinture Laure (9).jpeg",
        "Peinture Laure (10).jpeg",
        "Peinture Laure (11).jpeg",
        "Peinture Laure (12).jpeg",
        "Peinture Laure (13).jpeg",
        "Peinture Laure (14).jpeg",
        "Peinture Laure (15).jpeg",
        "Peinture Laure (16).jpeg",
        "Peinture Laure (17).jpeg"
    ];
    
    // Categories for the images (can be randomized or assigned by specific rules)
    const categories = ['paintings', 'drawings', 'prints'];
    
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    // Clear existing gallery content to prevent duplicates
    gallery.innerHTML = '';
    
    // Add each image to the gallery
    galleryImages.forEach((image, index) => {
        // Assign a category (you can customize this logic)
        const categoryIndex = index % categories.length;
        const category = categories[categoryIndex];
        
        // Create the gallery item
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${category}`;
        
        // Create the lightbox trigger link
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'lightbox-trigger';
        link.setAttribute('data-image', `assets/images/gallery/${image}`);
        
        // Create the image element
        const img = document.createElement('img');
        img.className = 'lazyload';
        img.setAttribute('data-src', `assets/images/gallery/${image}`);
        img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        img.alt = 'Artwork by Claude Marthe';
        
        // Assemble the elements
        link.appendChild(img);
        galleryItem.appendChild(link);
        gallery.appendChild(galleryItem);
    });
}

/**
 * Initialize Masonry layout
 */
function initMasonryLayout() {
    const galleries = document.querySelectorAll('.gallery');
    
    galleries.forEach(gallery => {
        // Initialize ImagesLoaded first to ensure proper display
        imagesLoaded(gallery, function() {
            // Set up Masonry for the gallery
            const masonryInstance = new Masonry(gallery, {
                itemSelector: '.gallery-item',
                percentPosition: true,
                transitionDuration: '0.3s',
                gutter: 20
            });
            
            // Reveal gallery after layout is calculated
            gallery.classList.add('is-loaded');
            
            // Add animation to gallery items
            const items = gallery.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, 50 * index);
            });
            
            // Force layout update after a short delay to ensure all images are positioned correctly
            setTimeout(() => {
                if (masonryInstance) {
                    masonryInstance.layout();
                }
            }, 500);
        });
    });
}

/**
 * Initialize Isotope filtering
 */
function initIsotopeFiltering() {
    const galleries = document.querySelectorAll('.gallery');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    galleries.forEach(gallery => {
        if (filterBtns.length > 0) {
            // Make sure all images are loaded before initializing Isotope
            imagesLoaded(gallery, function() {
                // Initialize Isotope
                const iso = new Isotope(gallery, {
                    itemSelector: '.gallery-item',
                    layoutMode: 'fitRows',
                    transitionDuration: '0.4s'
                });
                
                // Filter button click handlers
                filterBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        // Remove active class from all buttons
                        filterBtns.forEach(b => b.classList.remove('active'));
                        
                        // Add active class to clicked button
                        this.classList.add('active');
                        
                        // Get filter value
                        const filterValue = this.getAttribute('data-filter');
                        
                        // Filter items
                        iso.arrange({
                            filter: filterValue === '*' ? null : `.${filterValue}`
                        });
                        
                        // Update Masonry layout after filtering
                        if (gallery.masonryInstance) {
                            setTimeout(() => {
                                gallery.masonryInstance.layout();
                            }, 500);
                        }
                    });
                });
            });
        }
    });
}

/**
 * Initialize Lazy Loading for gallery images
 */
function initLazyLoading() {
    // Add lazyload class to all gallery images that don't already have it
    const galleryImages = document.querySelectorAll('.gallery-item img:not(.lazyload)');
    
    galleryImages.forEach(img => {
        // Store original src
        const originalSrc = img.getAttribute('src');
        
        // Change src to a small placeholder
        img.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
        
        // Set data-src to original src for lazy loading
        img.setAttribute('data-src', originalSrc);
        
        // Add lazyload class to trigger lazy loading
        img.classList.add('lazyload');
        
        // For browsers that support it, add srcset with responsive image sizes
        if (img.parentElement && img.parentElement.getAttribute('data-image')) {
            const fullSize = img.parentElement.getAttribute('data-image');
            img.setAttribute('data-srcset', `${originalSrc} 400w, ${fullSize} 800w`);
            img.setAttribute('data-sizes', 'auto');
        }
    });
    
    // Initialize lazySizes
    if (window.lazySizes) {
        // Already initialized via the lazysizes.min.js script
        // This is just for clarity
        console.log('Lazy loading initialized');
    }
}

/**
 * Initialize PhotoSwipe for lightbox functionality
 */
function initPhotoSwipe() {
    // Add PhotoSwipe HTML to the page if it doesn't exist
    if (!document.querySelector('.pswp')) {
        const pswpHTML = `
            <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="pswp__bg"></div>
                <div class="pswp__scroll-wrap">
                    <div class="pswp__container">
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                    </div>
                    <div class="pswp__ui pswp__ui--hidden">
                        <div class="pswp__top-bar">
                            <div class="pswp__counter"></div>
                            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                            <button class="pswp__button pswp__button--share" title="Share"></button>
                            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                            <div class="pswp__preloader">
                                <div class="pswp__preloader__icn">
                                    <div class="pswp__preloader__cut">
                                        <div class="pswp__preloader__donut"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                            <div class="pswp__share-tooltip"></div>
                        </div>
                        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                        <div class="pswp__caption">
                            <div class="pswp__caption__center"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Append PhotoSwipe HTML to body
        const pswpElement = document.createElement('div');
        pswpElement.innerHTML = pswpHTML;
        document.body.appendChild(pswpElement.firstElementChild);
    }
    
    // Get the gallery element
    const galleryElement = document.querySelector('.gallery');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    
    if (galleryElement && lightboxTriggers.length > 0) {
        // Prepare PhotoSwipe items array
        const items = [];
        
        // Populate items array
        lightboxTriggers.forEach((trigger, index) => {
            const img = trigger.querySelector('img');
            const fullSizeUrl = trigger.getAttribute('data-image');
            
            // Get image dimensions
            const tempImg = new Image();
            tempImg.src = fullSizeUrl;
            
            const item = {
                src: fullSizeUrl,
                w: 0,
                h: 0,
                title: img ? img.getAttribute('alt') : 'Image ' + (index + 1)
            };
            
            items.push(item);
            
            // Once the image is loaded, update the dimensions
            tempImg.onload = function() {
                item.w = this.width;
                item.h = this.height;
            };
            
            // Handle click on each gallery item
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the clicked index
                const clickedIndex = Array.from(lightboxTriggers).indexOf(this);
                
                // Initialize PhotoSwipe
                const pswpElement = document.querySelector('.pswp');
                const options = {
                    index: clickedIndex,
                    bgOpacity: 0.9,
                    showHideOpacity: true,
                    shareButtons: [
                        {id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
                        {id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
                        {id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
                    ],
                    getThumbBoundsFn: function(index) {
                        // Find thumbnail element
                        const thumbnail = lightboxTriggers[index].querySelector('img');
                        if (!thumbnail) return;
                        
                        // Get thumbnail position
                        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        const rect = thumbnail.getBoundingClientRect();
                        
                        // Return coordinates and sizes
                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    }
                };
                
                // Initialize PhotoSwipe
                const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                
                // Update image size when it's loaded
                gallery.listen('gettingData', function(index, item) {
                    if (item.w < 1 || item.h < 1) {
                        const img = new Image();
                        img.onload = function() {
                            item.w = this.width;
                            item.h = this.height;
                            gallery.updateSize(true);
                        };
                        img.src = item.src;
                    }
                });
                
                // Open PhotoSwipe
                gallery.init();
            });
        });
    }
}

/**
 * Add Alpine data binding for reactive gallery features
 */
document.addEventListener('alpine:init', () => {
    Alpine.data('galleryFilter', () => ({
        activeFilter: '*',
        
        setFilter(filter) {
            this.activeFilter = filter;
            
            // Trigger Isotope filtering
            const filterBtns = document.querySelectorAll('.filter-btn');
            const targetBtn = Array.from(filterBtns).find(btn => btn.getAttribute('data-filter') === filter);
            
            if (targetBtn) {
                targetBtn.click();
            }
        },
        
        isActive(filter) {
            return this.activeFilter === filter;
        }
    }));
});
