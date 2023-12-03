import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


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
    var title = document.getElementById("title").value;
    var entry = document.getElementById("entry").value;

    var today = new Date().toJSON().slice(0, 10);

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
});

document.getElementById('populateData').addEventListener('click', (e) => {
    const dataTitle = document.getElementById("dataTitle");
    const dataEntry = document.getElementById("dataEntry");
    var today = new Date().toJSON().slice(0, 10);

    const dbRef = ref(database);

    get(child(dbRef, 'date/' + today)).then((snapshot)=>{
        if(snapshot.exists()) {
            console.log(snapshot.val());
            let dataTitleVal = snapshot.val().title;
            let dataEntryVal = snapshot.val().entry;
            dataTitle.innerHTML = dataTitleVal;
            dataEntry.innerHTML = dataEntryVal;
        }
    })
    .catch((error) => {
        alert(error);
    });
});