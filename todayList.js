import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
    child
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


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

document.getElementById("getToDoList").addEventListener('click', function () {
    const today = new Date();
    const ystdy = new Date(today);
    ystdy.setDate(today.getDate() - 1);
    const yesterday = ystdy.toJSON().slice(0, 10);

    console.log(yesterday)

    const dbRef = ref(database);
    get(child(dbRef, `DateID_${yesterday}/ToDoList`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            printToDoList(snapshot.val())
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


});

function printToDoList(data) {
    const todayList = document.getElementById('todayList');

    data.toDoListItems.forEach(item => {
        const listItem = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        let textContent = "  " + item.thing;
        if (item.time !== '') {
            textContent += ` @ ${item.time}`;
        }

        listItem.textContent = textContent;

        listItem.insertBefore(checkbox, listItem.firstChild);
        todayList.appendChild(listItem);

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                listItem.style.textDecoration = 'line-through'; // Apply strikethrough
            } else {
                listItem.style.textDecoration = 'none'; // Remove strikethrough
            }
        });
    });
}
