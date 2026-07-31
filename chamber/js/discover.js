// ======================================
// WDD 231 - Chamber Discover Page
// discover.js
// ======================================


import { places } from "../data/places.mjs";


// Select elements

const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");



// ======================================
// Create Place Cards
// ======================================


function displayPlaces(placeList) {


    placeList.forEach((place) => {


        const card = document.createElement("section");


        card.innerHTML = `

            <h2>${place.name}</h2>


            <figure>

                <img 
                src="${place.image}" 
                alt="${place.name}"
                width="300"
                height="200"
                loading="lazy">

            </figure>


            <address>
                ${place.address}
            </address>


            <p>
                ${place.description}
            </p>


            <button type="button">
                Learn More
            </button>

        `;


        cardsContainer.appendChild(card);


    });


}



displayPlaces(places);




// ======================================
// Visitor Message - Local Storage
// ======================================


const today = Date.now();

const lastVisit = localStorage.getItem("lastVisit");



if (lastVisit === null) {


    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";


}

else {


    const difference = today - Number(lastVisit);


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );



    if (days < 1) {


        visitMessage.textContent =
            "Back so soon! Awesome!";


    }


    else if (days === 1) {


        visitMessage.textContent =
            "You last visited 1 day ago.";


    }


    else {


        visitMessage.textContent =
            `You last visited ${days} days ago.`;

    }


}



// Save current visit

localStorage.setItem("lastVisit", today);





// ======================================
// Footer Information
// ======================================


const year = document.querySelector("#currentyear");

const modified = document.querySelector("#lastModified");


if (year) {

    year.textContent = new Date().getFullYear();

}


if (modified) {

    modified.textContent =
        `Last Modification: ${document.lastModified}`;

}
