// Enhanced photo gallery interactions

document.addEventListener('DOMContentLoaded', function() {
    enhancePhotoGallery();
    setupPhotoZoom();
    addMobileSupport();
});

function enhancePhotoGallery() {
    const frames = document.querySelectorAll('.photo-frame');
    
    // Add flip functionality on double click
    frames.forEach(frame => {
        frame.addEventListener('dblclick', () => {
            frame.classList.toggle('flip');
        });
    });
    
    // Add smooth transitions between photos
    function smoothTransition(fromIndex, toIndex) {
        const frames = document.querySelectorAll('.photo-frame');
        frames[fromIndex].classList.add('transitioning-out');
        
        setTimeout(() => {
            frames[fromIndex].classList.remove('active', 'transitioning-out');
            frames[toIndex].classList.add('transitioning-in', 'active');
            
            setTimeout(() => {
                frames[toIndex].classList.remove('transitioning-in');
            }, 500);
        }, 500);
    }
    
    // Use smooth transition when rotating photos
    const originalSetupPhotoGallery = window.setupPhotoGallery;
    if (typeof originalSetupPhotoGallery === 'function') {
        window.setupPhotoGallery = function() {
            const frames = document.querySelectorAll('.photo-frame');
            let currentActive = 0;
            let autoRotation;
            
            // Start auto rotation with smooth transitions
            startAutoRotation();
            
            function startAutoRotation() {
                autoRotation = setInterval(() => {
                    const prevActive = currentActive;
                    currentActive = (currentActive + 1) % frames.length;
                    smoothTransition(prevActive, currentActive);
                }, 5000);
            }
            
            // Add click event to each frame with enhanced effects
            frames.forEach((frame, index) => {
                frame.addEventListener('click', () => {
                    // Clear auto rotation when manually clicking
                    clearInterval(autoRotation);
                    
                    // Apply animation only if this isn't already the active frame
                    if (currentActive !== index) {
                        const prevActive = currentActive;
                        currentActive = index;
                        smoothTransition(prevActive, currentActive);
                        
                        // Add pulse effect
                        frame.classList.add('pulse-effect');
                        setTimeout(() => {
                            frame.classList.remove('pulse-effect');
                        }, 1000);
                    }
                    
                    // Show a heart when clicking on a photo
                    createHeartEffect(frame);
                    
                    // Restart auto rotation after interaction
                    setTimeout(() => {
                        startAutoRotation();
                    }, 8000);
                });
            });
        };
        
        // Call the original function to initialize
        originalSetupPhotoGallery();
    } else {
        console.warn('Original setupPhotoGallery function not found');
    }
}

function createHeartEffect(element) {
    const heart = document.createElement('div');
    heart.className = 'heart-effect';
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '30px';
    heart.style.top = '50%';
    heart.style.left = '50%';
    heart.style.transform = 'translate(-50%, -50%) scale(0)';
    heart.style.opacity = '0';
    heart.style.transition = 'all 0.5s ease';
    heart.style.zIndex = '10';
    
    element.appendChild(heart);
    
    setTimeout(() => {
        heart.style.transform = 'translate(-50%, -50%) scale(1.5)';
        heart.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        heart.style.transform = 'translate(-50%, -150%) scale(0.5)';
        heart.style.opacity = '0';
    }, 800);
    
    setTimeout(() => {
        heart.remove();
    }, 1500);
}

function setupPhotoZoom() {
    // Optional: Add zoom functionality when clicking on a photo
    document.body.addEventListener('click', function(e) {
        const target = e.target;
        if (target.tagName === 'IMG' && target.closest('.photo-front')) {
            const img = target;
            const photoFrame = img.closest('.photo-frame');
            
            // Don't zoom if we're in the middle of flipping
            if (photoFrame.classList.contains('flip')) return;
            
            // Create zoom overlay if it doesn't exist
            if (!document.querySelector('.photo-zoom-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'photo-zoom-overlay';
                
                const closeBtn = document.createElement('div');
                closeBtn.className = 'close-zoom';
                closeBtn.innerHTML = '&times;';
                
                const zoomedImg = document.createElement('img');
                zoomedImg.className = 'zoomed-image';
                
                overlay.appendChild(zoomedImg);
                overlay.appendChild(closeBtn);
                document.body.appendChild(overlay);
                
                // Close when clicking outside image or on close button
                overlay.addEventListener('click', function(e) {
                    if (e.target === overlay || e.target === closeBtn) {
                        overlay.classList.remove('active');
                    }
                });
            }
            
            // Set image and show overlay
            const overlay = document.querySelector('.photo-zoom-overlay');
            const zoomedImg = overlay.querySelector('.zoomed-image');
            zoomedImg.src = img.src;
            overlay.classList.add('active');
        }
    });
}

function addMobileSupport() {
    // Add double tap functionality for mobile
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        const frameElements = document.querySelectorAll('.photo-frame');
        frameElements.forEach(frame => {
            let lastTap = 0;
            frame.addEventListener('touchend', function(e) {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                if (tapLength < 500 && tapLength > 0) {
                    frame.classList.toggle('flip');
                    e.preventDefault();
                }
                lastTap = currentTime;
            });
        });
    }
}
