
const url = "data/members.json";
const membersContainer = document.querySelector("#members");

async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error(error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>${member.description}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p><strong>Membership:</strong> ${member.membership}</p>
        `;

        membersContainer.appendChild(card);
    });
}

getMembers();

// Grid and List buttons
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});
