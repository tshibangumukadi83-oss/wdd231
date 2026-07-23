const spotlightContainer = document.querySelector("#spotlight-container");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        const qualified = members.filter(member =>
            member.membership === 2 ||
            member.membership === 3
        );

        const shuffled = qualified.sort(() => Math.random() - 0.5);

        const selected = shuffled.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selected.forEach(member => {

            const card = document.createElement("section");
            card.classList.add("spotlight-card");

            card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name}" loading="lazy">

    <h3>${member.name}</h3>

    <p>${member.address}</p>

    <p>${member.phone}</p>

    <a href="${member.website}" target="_blank">
        Visit Website
    </a>

    <p><strong>${
        member.membership === 3 ? "Gold Member" : "Silver Member"
    }</strong></p>
`;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight Error:", error);
    }
}

loadSpotlights();
