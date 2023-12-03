// Your Firebase configuration and import statements
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, set, push, child } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRiQbWnJ5zywtjlJop_-VgnOWvq2n_bf0",
    authDomain: "journal272-8d5d2.firebaseapp.com",
    databaseURL: "https://journal272-8d5d2-default-rtdb.firebaseio.com",
    projectId: "journal272-8d5d2",
    storageBucket: "journal272-8d5d2.appspot.com",
    messagingSenderId: "319546048347",
    appId: "1:319546048347:web:c0eda1244ad5194fbee47e"
};

// Your Firebase initialization code
const app = initializeApp(firebaseConfig);
const database = getDatabase();

// Add a submit event listener to the form
const form = document.getElementById('journalForm');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    const titleInput = document.getElementById('title');
    const entryInput = document.getElementById('entry');

    if (titleInput && entryInput) {

        var today = new Date().toUTCString();

        set(ref(database, 'date/' + today), {
            title: titleInput.value,
            entry: entryInput.value
        })
            .then(() => {
                alert("Data submitted! " + today);
            })
            .catch((error) => {
                alert(error);
            });
    } else {
        console.error('Form elements not found');
    }

    document.getElementById("journalForm").reset()
});