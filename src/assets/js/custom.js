// Custom scripts for the site

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make the logo larger on mobile
    function resizeLogo() {
        const logoImg = document.querySelectorAll('#cs-navigation .cs-logo img');
        if (logoImg.length > 0) {
            logoImg.forEach(img => {
                // Apply direct inline styles (highest priority)
                img.style.width = '250px';
                img.style.height = 'auto';
                img.style.maxWidth = '60vw';
                img.style.transform = 'scale(1.1)';
                img.style.transformOrigin = 'left center';
                img.style.transition = 'none';
            });
            
            console.log('Logo resized by JavaScript');
        } else {
            console.log('Logo images not found');
        }
    }
    
    // Call immediately and also after a short delay to ensure it applies
    resizeLogo();
    setTimeout(resizeLogo, 100);
    
    // Also call on window resize
    window.addEventListener('resize', resizeLogo);
}); 