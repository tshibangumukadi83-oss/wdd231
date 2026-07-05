// scripts/dates.js

// Afficher automatiquement l'année actuelle
const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Afficher la date de dernière modification de la page
const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}
