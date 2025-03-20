// Wait for the DOM to be loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const bodyElement = document.querySelector("body");
    const navbarMenu = document.querySelector("#cs-navigation");
    const hamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
    const navList = document.querySelector("#cs-navigation .cs-ul");
    const mobileWrapper = document.querySelector("#cs-navigation .cs-ul-wrapper");
    
    console.log("Mobile navigation initialization");
    
    // Directly insert navigation links into mobile menu
    function injectMobileLinks() {
        // Check if we already injected links
        if (mobileWrapper.querySelector('.mobile-nav-links')) {
            console.log("Mobile links already injected");
            return;
        }
        
        // Create a container for mobile links
        const mobileLinks = document.createElement('div');
        mobileLinks.className = 'mobile-nav-links';
        mobileLinks.style.display = 'flex';
        mobileLinks.style.flexDirection = 'column';
        mobileLinks.style.padding = '120px 2rem 2rem 4rem';
        mobileLinks.style.gap = '1.5rem';
        
        // Create links
        const links = [
            { text: 'Home', url: '/' },
            { text: 'About Us', url: '/about/' },
            { text: 'Services', url: '/services/' },
            { text: 'Projects', url: '/projects/' },
            { text: 'Reviews', url: '/reviews/' },
            { text: 'Contact Us', url: '/contact/' }
        ];
        
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.text;
            a.style.color = 'white';
            a.style.fontSize = '1.5rem';
            a.style.fontWeight = 'bold';
            a.style.textDecoration = 'none';
            a.style.display = 'block';
            a.style.padding = '0.5rem 0';
            
            // Highlight active link
            if (window.location.pathname === link.url || 
                (link.url !== '/' && window.location.pathname.startsWith(link.url))) {
                a.style.textDecoration = 'underline';
                a.style.textDecorationThickness = '2px';
                a.style.textUnderlineOffset = '5px';
            }
            
            // Hover effect
            a.addEventListener('mouseover', () => {
                a.style.color = '#FCBA19';
            });
            a.addEventListener('mouseout', () => {
                a.style.color = 'white';
            });
            
            mobileLinks.appendChild(a);
        });
        
        // Add the mobile links to the wrapper
        mobileWrapper.innerHTML = '';
        mobileWrapper.appendChild(mobileLinks);
        
        console.log("Mobile links injected:", links.length);
    }
    
    // Debug: Check if navigation items exist
    const navItems = document.querySelectorAll("#cs-navigation .cs-li");
    console.log("Navigation items found:", navItems.length);
    navItems.forEach((item, index) => {
        console.log(`Nav item ${index}:`, item.textContent.trim());
    });
    
    // Function to toggle the menu open or closed
    function toggleMenu() {
        if (!hamburgerMenu || !navbarMenu || !bodyElement) {
            console.log("Some elements not found for toggle menu");
            return;
        }
        
        // Make sure mobile links are injected
        injectMobileLinks();
        
        hamburgerMenu.classList.toggle("cs-active");
        navbarMenu.classList.toggle("cs-active");
        bodyElement.classList.toggle("cs-open");
        
        // Update mobile wrapper visibility
        if (mobileWrapper) {
            const isActive = navbarMenu.classList.contains("cs-active");
            mobileWrapper.style.display = isActive ? 'block' : 'none';
            mobileWrapper.style.position = 'fixed';
            mobileWrapper.style.top = '0';
            mobileWrapper.style.left = '0';
            mobileWrapper.style.width = '100%';
            mobileWrapper.style.height = '100vh';
            // More transparent dark background
            mobileWrapper.style.backgroundColor = 'rgba(23, 31, 45, 0.9)';
            mobileWrapper.style.zIndex = '1000';
            
            // Style the X button
            if (isActive && hamburgerMenu) {
                // Position the X button in the top right
                hamburgerMenu.style.position = 'fixed';
                hamburgerMenu.style.top = '1.5rem';
                hamburgerMenu.style.right = '1.5rem';
                hamburgerMenu.style.zIndex = '10001';
                hamburgerMenu.style.background = 'transparent';
                
                // Change the lines to an X - adjusted values
                const lines = hamburgerMenu.querySelectorAll('.cs-line');
                if (lines.length >= 3) {
                    lines[0].style.transform = 'rotate(45deg) translate(3px, 6px)';
                    lines[1].style.opacity = '0';
                    lines[2].style.transform = 'rotate(-45deg) translate(3px, -6px)';
                }
            } else if (hamburgerMenu) {
                // Reset hamburger button
                hamburgerMenu.style.position = '';
                hamburgerMenu.style.top = '';
                hamburgerMenu.style.right = '';
                hamburgerMenu.style.zIndex = '';
                hamburgerMenu.style.background = '';
                
                // Reset lines
                const lines = hamburgerMenu.querySelectorAll('.cs-line');
                if (lines.length >= 3) {
                    lines[0].style.transform = '';
                    lines[1].style.opacity = '1';
                    lines[2].style.transform = '';
                }
            }
            
            console.log("Mobile wrapper visibility set to:", isActive ? 'visible' : 'hidden');
        }
        
        console.log("Menu toggled, active state:", navbarMenu.classList.contains("cs-active"));
    }
    
    // Add click event listener to the hamburger menu
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("Hamburger menu clicked");
            toggleMenu();
        });
    }

    // Close menu when clicking outside or pressing escape
    document.addEventListener('click', function(e) {
        if (navbarMenu && navbarMenu.classList.contains("cs-active") && 
            e.target !== navbarMenu && 
            !navbarMenu.contains(e.target) && 
            e.target !== hamburgerMenu) {
            toggleMenu();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarMenu && navbarMenu.classList.contains("cs-active")) {
            toggleMenu();
        }
    });

    // Function to handle dropdown toggle
    function toggleDropdown(element) {
        if (!element) return;
        element.classList.toggle("cs-active");
        const dropdownButton = element.querySelector(".cs-dropdown-button");
        if (dropdownButton) {
            const isExpanded = dropdownButton.getAttribute("aria-expanded") === "true";
            dropdownButton.setAttribute("aria-expanded", isExpanded ? "false" : "true");
        }
    }

    // Add event listeners to each dropdown element for accessibility
    const dropdownElements = document.querySelectorAll(".cs-dropdown");
    dropdownElements.forEach((element) => {
        let escapePressed = false;

        element.addEventListener("focusout", function (event) {
            // If the focus is leaving the dropdown, close it
            if (!element.contains(event.relatedTarget)) {
                toggleDropdown(element);
            }
        });

        element.addEventListener("keydown", function (event) {
            // If the escape key is pressed, close the dropdown
            if (event.key === "Escape") {
                escapePressed = true;
                toggleDropdown(element);
                const dropdownButton = element.querySelector(".cs-dropdown-button");
                if (dropdownButton) {
                    dropdownButton.focus();
                }
            }
        });
    });

    // Click event listener for dropdown buttons
    const dropdownButtons = document.querySelectorAll(".cs-dropdown-button");
    dropdownButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const parent = button.parentElement;
            if (parent && parent.classList.contains("cs-dropdown")) {
                toggleDropdown(parent);
            }
        });
    });
});
