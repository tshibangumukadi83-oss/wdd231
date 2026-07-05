// scripts/courses.js

const courseContainer = document.querySelector("#courses");
const creditsContainer = document.querySelector("#credits");

// Afficher les cours
function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p>${course.completed ? "✅ Completed" : "📖 In Progress"}</p>
        `;

        courseContainer.appendChild(card);
    });

    displayCredits(courseList);
}

// Calcul du nombre total de crédits
function displayCredits(courseList) {
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);

    creditsContainer.textContent = `Total Credits: ${totalCredits}`;
}

// Affichage initial
displayCourses(courses);

// Boutons de filtrage
document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.querySelector("#cse").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});
