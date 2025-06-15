document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles around active photo
    createFloatingParticles();
    
    // Add glitter effect to photos on special events
    addGlitterEffect();
});

function createFloatingParticles() {
    // Create a container for particles
    const container = document.createElement('div');
    container.className = 'particle-container';
    container.style.position = 'absolute';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '2';
    container.style.overflow = 'hidden';
    
    // Get the photo gallery
    const photoGallery = document.querySelector('.photo-gallery');
    if (photoGallery) {
        photoGallery.style.position = 'relative';
        photoGallery.appendChild(container);
        
        // Create particles
        const particleCount = 15;
        const colors = ['#FF5252', '#FFD740', '#40C4FF', '#69F0AE', '#E040FB'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            // Random size
            const size = Math.random() * 8 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random color
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.position = 'absolute';
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0.7';
            particle.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Add floating animation
            const duration = Math.random() * 10 + 10;
            particle.style.animation = `floatingParticle ${duration}s linear infinite`;
            
            container.appendChild(particle);
        }
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes floatingParticle {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 30}px, ${Math.random() * 30}px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * -30}px, ${Math.random() * 30}px) rotate(180deg);
                }
                75% {
                    transform: translate(${Math.random() * -30}px, ${Math.random() * -30}px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function addGlitterEffect() {
    // Add a glitter effect when the active frame changes
    setInterval(() => {
        const activeFrame = document.querySelector('.photo-frame.active');
        if (activeFrame) {
            // Create 5 glitter particles
            for (let i = 0; i < 5; i++) {
                createGlitterParticle(activeFrame);
            }
        }
    }, 2000);
}

function createGlitterParticle(parent) {
    const glitter = document.createElement('div');
    glitter.className = 'glitter-particle';
    
    // Random size
    const size = Math.random() * 6 + 2;
    glitter.style.width = `${size}px`;
    glitter.style.height = `${size}px`;
    
    // Random position within the element
    const rect = parent.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    glitter.style.position = 'absolute';
    glitter.style.left = `${x}px`;
    glitter.style.top = `${y}px`;
    glitter.style.backgroundColor = 'white';
    glitter.style.borderRadius = '50%';
    glitter.style.boxShadow = '0 0 5px white, 0 0 10px gold';
    glitter.style.zIndex = '10';
    glitter.style.animation = 'glitterFade 1.5s ease-out forwards';
    
    parent.appendChild(glitter);
    
    // Add animation keyframes if they don't exist
    if (!document.querySelector('style[data-glitter]')) {
        const style = document.createElement('style');
        style.setAttribute('data-glitter', 'true');
        style.innerHTML = `
            @keyframes glitterFade {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 0;
                }
                20% {
                    transform: scale(1) rotate(90deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) rotate(180deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove the glitter particle after animation
    setTimeout(() => {
        glitter.remove();
    }, 1500);
}
