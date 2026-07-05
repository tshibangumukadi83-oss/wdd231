// scripts/navigation.js

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.innerHTML = "&times;";
        menuButton.setAttribute("aria-label", "Close Navigation Menu");
    } else {
        menuButton.innerHTML = "&#9776;";
        menuButton.setAttribute("aria-label", "Open Navigation Menu");
    }
});
