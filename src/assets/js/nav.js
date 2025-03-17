// Wait for the DOM to be loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const bodyElement = document.querySelector("body");
    const navbarMenu = document.querySelector("#cs-navigation");
    const hamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
    const navList = document.querySelector("#cs-navigation .cs-ul");
    
    console.log("Mobile navigation initialization");
    
    // Debug: Check if navigation items exist
    const navItems = document.querySelectorAll("#cs-navigation .cs-li");
    console.log("Navigation items found:", navItems.length);
    navItems.forEach((item, index) => {
        console.log(`Nav item ${index}:`, item.textContent.trim());
    });
    
    // Function to toggle the menu open or closed
    function toggleMenu() {
        if (!hamburgerMenu || !navbarMenu || !bodyElement || !navList) {
            console.log("Some elements not found for toggle menu");
            return;
        }
        
        hamburgerMenu.classList.toggle("cs-active");
        navbarMenu.classList.toggle("cs-active");
        bodyElement.classList.toggle("cs-open");
        
        // Toggle the aria-expanded attribute
        const isExpanded = navList.getAttribute("aria-expanded") === "true";
        navList.setAttribute("aria-expanded", isExpanded ? "false" : "true");
        
        console.log("Menu toggled, aria-expanded set to:", navList.getAttribute("aria-expanded"));
    }
    
    // Add click event listener to the hamburger menu
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function(e) {
            e.preventDefault();
            console.log("Hamburger menu clicked");
            toggleMenu();
        });
    }

    // Add click event listener to the navbar menu to handle clicks on the pseudo-element
    if (navbarMenu) {
        navbarMenu.addEventListener("click", function (event) {
            if (
                event.target === navbarMenu &&
                navbarMenu.classList.contains("cs-active")
            ) {
                toggleMenu();
            }
        });
    }

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
