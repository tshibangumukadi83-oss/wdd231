/* =========================================================
   DISCOVER DR CONGO
   Places JavaScript Module
   Author: Mukadi Tshibangu
   ========================================================= */


/* ---------- SELECT DOM ELEMENTS ---------- */

const placesContainer =
    document.querySelector("#places-container");

const modal =
    document.querySelector("#place-modal");

const modalContent =
    document.querySelector("#modal-content");

const closeModal =
    document.querySelector("#close-modal");


/* ---------- DATA URL ---------- */

const dataUrl = "../data/places.json";


/* ---------- FETCH DESTINATIONS ---------- */

async function getPlaces() {

    try {

        const response = await fetch(dataUrl);

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }

        const places = await response.json();

        displayPlaces(places);

        setupModal(places);

    } catch (error) {

        console.error(
            "Unable to load destination data:",
            error
        );

        if (placesContainer) {

            placesContainer.innerHTML = `
                <div class="error-message">
                    <h2>Unable to Load Destinations</h2>
                    <p>
                        We could not load the destination information.
                        Please try again later.
                    </p>
                </div>
            `;

        }

    }

}


/* ---------- DISPLAY DESTINATIONS ---------- */

function displayPlaces(places) {

    if (!placesContainer) {
        return;
    }

    placesContainer.innerHTML = places
        .map((place) => {

            return `
                <article class="place-card">

                    <img
                        src="${place.image}"
                        alt="${place.alt}"
                        width="600"
                        height="400"
                        loading="lazy">

                    <div class="place-card-content">

                        <span class="place-category">
                            ${place.category}
                        </span>

                        <h2>
                            ${place.name}
                        </h2>

                        <p>
                            <strong>Province:</strong>
                            ${place.province}
                        </p>

                        <p>
                            ${place.description}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            ${place.address}
                        </p>

                        <button
                            class="button details-button"
                            data-id="${place.id}"
                            type="button">
                            More Details
                        </button>

                    </div>

                </article>
            `;

        })
        .join("");

}


/* ---------- MODAL SETUP ---------- */

function setupModal(places) {

    const detailButtons =
        document.querySelectorAll(".details-button");

    detailButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const placeId =
                Number(button.dataset.id);

            const selectedPlace =
                places.find(
                    (place) => place.id === placeId
                );

            if (selectedPlace) {

                openModal(selectedPlace);

            }

        });

    });

}


/* ---------- OPEN MODAL ---------- */

function openModal(place) {

    if (!modal || !modalContent) {
        return;
    }

    modalContent.innerHTML = `

        <img
            src="${place.image}"
            alt="${place.alt}"
            width="600"
            height="400">

        <span class="place-category">
            ${place.category}
        </span>

        <h2>
            ${place.name}
        </h2>

        <p>
            <strong>Province:</strong>
            ${place.province}
        </p>

        <p>
            <strong>Location:</strong>
            ${place.address}
        </p>

        <p>
            ${place.description}
        </p>

    `;

    modal.showModal();

}


/* ---------- CLOSE MODAL ---------- */

if (closeModal && modal) {

    closeModal.addEventListener("click", () => {

        modal.close();

    });


    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            modal.close();

        }

    });

}


/* ---------- ESCAPE KEY ---------- */

if (modal) {

    modal.addEventListener("cancel", () => {

        modal.close();

    });

}


/* ---------- START APPLICATION ---------- */

getPlaces();
