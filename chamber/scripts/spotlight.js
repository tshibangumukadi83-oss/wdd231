const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        // Garder uniquement les membres Gold (3) et Silver (2)
        const qualifiedMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        // Mélanger les membres
        qualifiedMembers.sort(() => Math.random() - 0.5);

        // Afficher 3 membres
        const selectedMembers = qualifiedMembers.slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {

    spotlightContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        const membership =
            member.membership === 3 ? "Gold Member" : "Silver Member";

        card.innerHTML = `
            <img src="images/${member.image}"
                 alt="${member.name} logo"
                 loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.description}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p>
                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            </p>

            <p><strong>${membership}</strong></p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlights();
