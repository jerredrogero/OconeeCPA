//
//    The Dark Mode System
//

// helper functions to toggle dark mode
function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
}
function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
}

// determines a new users dark mode preferences
function detectColorScheme() {
    // default to dark theme
    let theme = "dark";

    // check localStorage for a saved 'theme' variable
    if (localStorage.getItem("theme")) {
        theme = localStorage.getItem("theme");
    }
    // if no saved preference, keep dark mode as default
    
    // apply the theme
    theme === "light" ? disableDarkMode() : enableDarkMode();
}

// run on page load
detectColorScheme();

// add event listener to the dark mode button toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
    // on click, check localStorage for the dark mode value, use to apply the opposite of what's saved
    localStorage.getItem("theme") === "light"
        ? enableDarkMode()
        : disableDarkMode();
});
