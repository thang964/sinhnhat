// Fallback script for YouTube button
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Fallback YouTube button script loaded');
        setupYouTubeButtonFallback();
    });

    function setupYouTubeButtonFallback() {
        // Add a fallback click handler for the music button
        const musicBtn = document.getElementById('playMusic');
        
        if (!musicBtn) {
            console.error('YouTube button not found in fallback script');
            return;
        }
        
        console.log('Setting up fallback YouTube button handler');
        
        // Add direct inline onclick attribute as an additional fallback
        musicBtn.setAttribute('onclick', "window.open('https://www.youtube.com/watch?v=Wu8NeFXaoOc', '_blank')");
        
        // Add direct event listener as a fallback
        musicBtn.addEventListener('click', function(event) {
            console.log('YouTube button clicked via fallback handler');
            event.preventDefault();
            window.open('https://www.youtube.com/watch?v=Wu8NeFXaoOc', '_blank');
        });
    }
})();
