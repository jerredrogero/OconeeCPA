// Wait for the DOM to be loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const bodyElement = document.querySelector("body");
    const navbarMenu = document.querySelector("#cs-navigation");
    const hamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
    const expandedMenu = document.querySelector("#cs-expanded");
    const ulWrapper = document.querySelector("#cs-navigation .cs-ul-wrapper");
    
    console.log("Mobile navigation initialization:");
    console.log("- hamburgerMenu found:", !!hamburgerMenu);
    console.log("- expandedMenu found:", !!expandedMenu);
    console.log("- ulWrapper found:", !!ulWrapper);
    console.log("- expandedMenu current value:", expandedMenu ? expandedMenu.getAttribute("aria-expanded") : "not found");

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
        if (!hamburgerMenu || !navbarMenu || !bodyElement) {
            console.log("Some elements not found for toggle menu");
            return;
        }
        
        hamburgerMenu.classList.toggle("cs-active");
        navbarMenu.classList.toggle("cs-active");
        bodyElement.classList.toggle("cs-open");
        
        if (expandedMenu) {
            toggleAriaExpanded(expandedMenu);
            // Force the menu to display by adding a style
            if (expandedMenu.getAttribute("aria-expanded") === "true") {
                expandedMenu.style.display = "flex";
            } else {
                expandedMenu.style.removeProperty("display");
            }
            console.log("Menu toggled, aria-expanded set to:", expandedMenu.getAttribute("aria-expanded"));
        } else {
            console.log("expandedMenu element not found");
        }
        
        // Also toggle the ul-wrapper visibility
        if (ulWrapper) {
            if (navbarMenu.classList.contains("cs-active")) {
                ulWrapper.style.opacity = "1";
                ulWrapper.style.visibility = "visible";
                ulWrapper.style.transform = "scaleX(1)";
            } else {
                ulWrapper.style.opacity = "0";
                ulWrapper.style.visibility = "hidden";
                ulWrapper.style.transform = "scaleX(0)";
            }
        }
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
