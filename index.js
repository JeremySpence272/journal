// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const db = getDatabase();

// Function to handle form submission
document.getElementById("journalForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form
    const title = document.getElementById("title").value;
    const text = document.getElementById("entry").value;

    // Reference to a new entry in the database
    const entriesRef = ref(db, 'entries');
    const newEntryRef = push(entriesRef);

    // Set the data in the database
    set(newEntryRef, {
        title: title,
        text: text
    }).then(() => {
        // Data successfully written
        alert("Entry added successfully!");
        // Clear the form fields after submission
        document.getElementById("title").value = "";
        document.getElementById("entry").value = "";
    }).catch((error) => {
        // Handle any errors
        console.error("Error adding entry: ", error);
        alert("Failed to add entry. Please try again.");
    });
});
