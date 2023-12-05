import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    set, 
    get, 
    child } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


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


function updateDateLabel() {
    var today = new Date().toJSON().slice(0, 10);
    console.log(today);
    document.getElementById("dateLabel").innerHTML = today;
}

updateDateLabel();

const toDoListForm = document.getElementById("toDoListForm");
const toDoList = document.getElementById("toDoList");
let itemID = 1; 

const itemIDSpan = document.getElementById("itemID");

toDoListForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const time = document.getElementById("toDoTime").value;
    const thing = document.getElementById("toDoThing").value;
    
    const listItem = document.createElement("li");
    listItem.textContent = `ItemID_${itemID} => Thing: ${thing} @ Time: ${time}`;
    toDoList.appendChild(listItem);

    itemID++;
    itemIDSpan.textContent = itemID;

    document.getElementById("toDoTime").value = "";
    document.getElementById("toDoThing").value = "";
});


document.getElementById("uploadToDoListToFirebase").addEventListener('click', function() {
    const toDoListItems = [];
    document.querySelectorAll("#toDoList li").forEach((item) => {
        const text = item.textContent.split(' => ');
        const thingTime = text[1].split(' @ Time: ');

        const toDoItem = {
            time: thingTime[1],
            thing: thingTime[0].replace('Thing: ', '')
        };

        toDoListItems.push(toDoItem); 
    });

    const today = new Date().toJSON().slice(0, 10);

    set(ref(database, `DateID_${today}`), {
        toDoListItems
    })
        .then(() => {
            alert("ToDo List Uploaded to Firebase");
        })
        .catch((error) => {
            alert(error);
        });
});