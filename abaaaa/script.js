document.addEventListener('DOMContentLoaded', function() {
    // Create confetti animation
    createConfetti();
    
    // Create snowflakes
    createSnowflakes();
    
    // Photo gallery rotation
    setupPhotoGallery();
    
    // Handle music button
    setupMusicButton();
    
    // Add click on candle to make a wish
    setupCakeInteraction();
    
    // Add special effect for relationship text
    animateRelationshipText();
});

// Create colorful confetti elements
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#FF5252', '#FFD740', '#40C4FF', '#69F0AE', '#E040FB'];
    const confettiCount = 70; // Reduced count for better performance
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = color;
        confetti.style.position = 'absolute';
        confetti.style.top = '-10%';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.zIndex = '-1';
        
        // Add falling animation
        const duration = Math.random() * 3 + 3;
        const delay = Math.random() * 5;
        
        confetti.style.animation = `fall ${duration}s ease-in ${delay}s infinite`;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Add keyframes for falling animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            0% {
                top: -10%;
                transform: translateX(0) rotate(0deg);
                opacity: 0.7;
            }
            70% {
                opacity: 0.7;
            }
            100% {
                top: 100%;
                transform: translateX(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 100}px) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Animate relationship text
function animateRelationshipText() {
    const relationshipText = document.querySelector('.relationship');
    if (relationshipText) {
        const text = relationshipText.textContent;
        relationshipText.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === ' ' ? ' ' : text[i];
            span.style.display = 'inline-block';
            span.style.animation = `charAppear 0.5s ease forwards ${0.1 * i}s`;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            relationshipText.appendChild(span);
        }
        
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes charAppear {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create snowflakes
function createSnowflakes() {
    const confettiContainer = document.querySelector('.confetti-container');
    const snowflakeCount = 30;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        const size = Math.random() * 5 + 3;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.position = 'absolute';
        snowflake.style.top = '-10%';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.zIndex = '-1';
        
        // Add falling animation
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        snowflake.style.animation = `snowfall ${duration}s linear ${delay}s infinite`;
        
        confettiContainer.appendChild(snowflake);
    }
    
    // Add keyframes for snowfall animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes snowfall {
            0% {
                top: -10%;
                transform: translateX(0) rotate(0deg);
                opacity: 0.8;
            }
            50% {
                transform: translateX(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 50}px) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                top: 100%;
                transform: translateX(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Setup photo gallery rotation
function setupPhotoGallery() {
    const frames = document.querySelectorAll('.photo-frame');
    let currentActive = 0;
    let autoRotation;
    
    // Start auto rotation
    startAutoRotation();
    
    function startAutoRotation() {
        autoRotation = setInterval(() => {
            frames[currentActive].classList.remove('active');
            currentActive = (currentActive + 1) % frames.length;
            frames[currentActive].classList.add('active');
        }, 4000); // Slightly longer interval for better viewing
    }
    
    // Add flip functionality
    frames.forEach(frame => {
        frame.addEventListener('dblclick', () => {
            frame.classList.toggle('flip');
        });
    });
    
    // Add click event to each frame
    frames.forEach((frame, index) => {
        frame.addEventListener('click', () => {
            // Clear auto rotation when manually clicking
            clearInterval(autoRotation);
            
            // Apply animation only if this isn't already the active frame
            if (currentActive !== index) {
                frames[currentActive].classList.remove('active');
                currentActive = index;
                frame.classList.add('active');
                
                // Add pulse effect
                frame.classList.add('pulse-effect');
                setTimeout(() => {
                    frame.classList.remove('pulse-effect');
                }, 1000);
                
                // Add a dancing effect
                const img = frame.querySelector('img');
                frame.querySelector('.photo-frame-inner').classList.add('dancing');
                setTimeout(() => {
                    frame.querySelector('.photo-frame-inner').classList.remove('dancing');
                }, 1000);
            }
            
            // Show a heart when clicking on a photo
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
            
            frame.appendChild(heart);
            
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
                // Restart auto rotation after interaction
                startAutoRotation();
            }, 1500);        });
    }
    
    // Optimize for mobile
    if (window.innerWidth <= 768) {
        // Add double tap functionality for mobile
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
        
        // Reduce animation intensity on mobile
        document.querySelectorAll('.balloon').forEach(balloon => {
            balloon.style.opacity = '0.4';
        });
        
        // Make snowflakes more subtle
        document.querySelectorAll('.snowflake').forEach(snowflake => {
            snowflake.style.opacity = '0.3';
        });
    }
    
    // Add smooth transitions between photos
    function smoothTransition(fromIndex, toIndex) {
        frames[fromIndex].classList.add('transitioning-out');
        
        setTimeout(() => {
            frames[fromIndex].classList.remove('active', 'transitioning-out');
            frames[toIndex].classList.add('transitioning-in', 'active');
            
            setTimeout(() => {
                frames[toIndex].classList.remove('transitioning-in');
            }, 500);
        }, 500);
    }
    
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

// Set up music button
function setupMusicButton() {
    const musicBtn = document.getElementById('playMusic');
    
    if (!musicBtn) {
        console.error('Music button not found in the document!');
        return;
    }
    
    console.log('Setting up music button click handler');
    
    musicBtn.onclick = function() {
        console.log('Music button clicked, opening YouTube link');
        
        // Add click animation
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        // Open YouTube link in a new tab
        window.open('https://www.youtube.com/watch?v=Wu8NeFXaoOc', '_blank');
    };
    
    // Thêm hiệu ứng âm thanh khi hover
    musicBtn.addEventListener('mouseover', () => {
        musicBtn.style.transform = 'translateY(-5px)';
    });
    
    musicBtn.addEventListener('mouseout', () => {
        musicBtn.style.transform = 'translateY(0)';
    });
    
    console.log('Music button setup completed');
}

// Set up cake interaction
function setupCakeInteraction() {
    const flame = document.querySelector('.flame');
    const cake = document.querySelector('.cake');
    
    if (flame && cake) {
        flame.addEventListener('click', () => {
            // Blow out the candle
            flame.style.opacity = '0';
            flame.style.boxShadow = 'none';
            
            // Show a wish message
            const wishPopup = document.createElement('div');
            wishPopup.className = 'wish-popup';
            wishPopup.textContent = 'Chúc mừng sinh nhật bác Đại Hải! Ước nguyện của bác sẽ thành hiện thực!';
            wishPopup.style.position = 'absolute';
            wishPopup.style.top = '50%';
            wishPopup.style.left = '50%';
            wishPopup.style.transform = 'translate(-50%, -50%)';
            wishPopup.style.background = 'rgba(255, 255, 255, 0.9)';
            wishPopup.style.padding = '20px';
            wishPopup.style.borderRadius = '10px';
            wishPopup.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            wishPopup.style.zIndex = '100';
            wishPopup.style.animation = 'fadeIn 0.5s ease forwards';
            
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -70%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; transform: translate(-50%, -50%); }
                    to { opacity: 0; transform: translate(-50%, -70%); }
                }
            `;
            document.head.appendChild(style);
            
            document.querySelector('.birthday-card').appendChild(wishPopup);
            
            // Remove the message after 3 seconds
            setTimeout(() => {
                wishPopup.style.animation = 'fadeOut 0.5s ease forwards';
                setTimeout(() => {
                    wishPopup.remove();
                    // Relight the candle
                    flame.style.opacity = '1';
                    flame.style.boxShadow = '0 0 10px #ff9800, 0 0 20px #ff9800, 0 0 30px #ff9800';
                }, 500);
            }, 3000);
        });
    }
}

// Add sparkle effect to the title
window.addEventListener('load', function() {
    const title = document.querySelector('.title');
    
    if (title) {
        setInterval(() => {
            // Create sparkle element
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position around title
            const rect = title.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            sparkle.style.position = 'absolute';
            sparkle.style.width = '5px';
            sparkle.style.height = '5px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.background = 'white';
            sparkle.style.boxShadow = '0 0 10px 2px #FFD740';
            sparkle.style.animation = 'sparkle 1s ease forwards';
            
            title.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, 300);
        
        // Add sparkle animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes sparkle {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1); opacity: 1; }
                100% { transform: scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});