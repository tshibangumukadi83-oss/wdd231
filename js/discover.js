// js/discover.js

import { places } from "../data/places.mjs";

const cardsContainer = document.querySelector("#discover-cards");

// Générer les cartes
places.forEach((place) => {
    const card = document.createElement("section");

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="${place.image}"
                alt="${place.name}"
                loading="lazy"
                width="300"
                height="200">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button type="button">${place.button}</button>
    `;

    cardsContainer.appendChild(card);
});

// ===== Local Storage =====

const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");

const now = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const milliseconds = now - Number(lastVisit);

    const days = Math.floor(milliseconds / 86400000);

    if (days < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else if (days === 1) {

        visitMessage.textContent =
            "You last visited 1 day ago.";

    } else {

        visitMessage.textContent =
            `You last visited ${days} days ago.`;

    }

}

localStorage.setItem("lastVisit", now);
