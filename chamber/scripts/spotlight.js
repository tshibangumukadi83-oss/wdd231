const spotlightContainer = document.querySelector("#spotlight-container");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        const qualified = members.filter(member =>
            member.membership === "Gold" ||
            member.membership === "Silver"
        );

        const shuffled = qualified.sort(() => Math.random() - 0.5);

        const selected = shuffled.slice(0, 3);

        spotlightContainer.innerHTML = "";

        selected.forEach(member => {

            const card = document.createElement("section");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p>
                    <a href="${member.website}" target="_blank">
                        Visit Website
                    </a>
                </p>
                <p><strong>Membership:</strong> ${member.membership}</p>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight Error:", error);
    }
}

loadSpotlights();
