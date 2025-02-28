// Wait for the DOM to be loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const bodyElement = document.querySelector("body");
    const navbarMenu = document.querySelector("#cs-navigation");
    const hamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
    const expandedMenu = document.querySelector("#cs-expanded");

    // Function to toggle the aria-expanded attribute
    function toggleAriaExpanded(element) {
        if (!element) return;
        const isExpanded = element.getAttribute("aria-expanded");
        element.setAttribute(
            "aria-expanded",
            isExpanded === "false" ? "true" : "false",
        );
    }

    // Function to toggle the menu open or closed
    function toggleMenu() {
        if (!hamburgerMenu || !navbarMenu || !bodyElement || !expandedMenu) return;
        
        hamburgerMenu.classList.toggle("cs-active");
        navbarMenu.classList.toggle("cs-active");
        bodyElement.classList.toggle("cs-open");
        toggleAriaExpanded(hamburgerMenu);
        toggleAriaExpanded(expandedMenu);
    }

    // Add click event listener to the hamburger menu
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", toggleMenu);
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
            toggleAriaExpanded(dropdownButton);
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
