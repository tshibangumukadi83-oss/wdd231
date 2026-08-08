/* =========================================================
   DISCOVER DR CONGO
   Main JavaScript
   Author: Mukadi Tshibangu
   ========================================================= */


/* ---------- MOBILE NAVIGATION ---------- */

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close Navigation"
                : "Open Navigation"
        );

    });

}


/* ---------- CURRENT YEAR ---------- */

const yearElement = document.querySelector("#year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* ---------- LOCAL STORAGE ---------- */

/*
   Save the visitor's last visit.
*/

const visitKey = "drCongoLastVisit";

const currentVisit = new Date().toISOString();

const previousVisit = localStorage.getItem(visitKey);

localStorage.setItem(
    visitKey,
    currentVisit
);


/* ---------- WELCOME MESSAGE ---------- */

const welcomeMessage = document.querySelector(".about");

if (welcomeMessage && previousVisit) {

    const previousDate = new Date(previousVisit);

    const daysSinceVisit = Math.floor(
        (Date.now() - previousDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const visitInfo = document.createElement("p");

    visitInfo.classList.add("visit-info");

    if (daysSinceVisit === 0) {

        visitInfo.textContent =
            "Welcome back! We are glad to see you again today.";

    } else if (daysSinceVisit === 1) {

        visitInfo.textContent =
            "Welcome back! You visited us yesterday.";

    } else {

        visitInfo.textContent =
            `Welcome back! It has been ${daysSinceVisit} days since your last visit.`;

    }

    welcomeMessage.appendChild(visitInfo);

}


/* ---------- CONTACT FORM ---------- */

const contactForm = document.querySelector("form");

if (contactForm && window.location.pathname.endsWith("contact.html")) {

    contactForm.addEventListener("submit", () => {

        localStorage.setItem(
            "formSubmitted",
            "true"
        );

    });

}


/* ---------- THANK YOU PAGE ---------- */

/*
   Read GET parameters from the URL
   and display submitted form data.
*/

if (window.location.pathname.endsWith("thanks.html")) {

    const parameters = new URLSearchParams(
        window.location.search
    );

    const firstName =
        parameters.get("firstName") || "";

    const lastName =
        parameters.get("lastName") || "";

    const email =
        parameters.get("email") || "";

    const province =
        parameters.get("province") || "Not provided";

    const subject =
        parameters.get("subject") || "";

    const message =
        parameters.get("message") || "";

    const nameElement =
        document.querySelector("#display-name");

    const emailElement =
        document.querySelector("#display-email");

    const provinceElement =
        document.querySelector("#display-province");

    const subjectElement =
        document.querySelector("#display-subject");

    const messageElement =
        document.querySelector("#display-message");


    if (nameElement) {

        nameElement.textContent =
            `${firstName} ${lastName}`.trim();

    }


    if (emailElement) {

        emailElement.textContent = email;

    }


    if (provinceElement) {

        provinceElement.textContent = province;

    }


    if (subjectElement) {

        subjectElement.textContent = subject;

    }


    if (messageElement) {

        messageElement.textContent = message;

    }

}


/* ---------- ACTIVE NAVIGATION ---------- */

const currentPage =
    window.location.pathname.split("/").pop() ||
    "index.html";

const navigationLinks =
    document.querySelectorAll("#navigation a");

navigationLinks.forEach((link) => {

    const linkPage =
        link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});
