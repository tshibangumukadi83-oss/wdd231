// Set current date and time in hidden timestamp field

const timestamp = document.querySelector("#timestamp");

if (timestamp) {

    const now = new Date();

    timestamp.value = now.toLocaleString();

}
