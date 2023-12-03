import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDRiQbWnJ5zywtjlJop_-VgnOWvq2n_bf0",
    authDomain: "journal272-8d5d2.firebaseapp.com",
    databaseURL: "https://journal272-8d5d2-default-rtdb.firebaseio.com",
    projectId: "journal272-8d5d2",
    storageBucket: "journal272-8d5d2.appspot.com",
    messagingSenderId: "319546048347",
    appId: "1:319546048347:web:c0eda1244ad5194fbee47e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const form = document.getElementById("journalForm");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    write();
});

function write() {
    var title = document.getElementById("title").value;
    var entry = document.getElementById("entry").value;

    var today = new Date().toUTCString();

    set(ref(database, 'date/' + today), {
        title: title,
        entry: entry
    })
        .then(() => {
            alert("Submitted " + today);
        })
        .catch((error) => {
            alert(error);
        });
}