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

// TO DO LIST FUNCTIONS
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

    set(ref(database, `DateID_${today}/ToDoList`), {
        toDoListItems
    })
        .then(() => {
            alert("ToDo List Uploaded to Firebase");
        })
        .catch((error) => {
            alert(error);
        });
});


// RECAP LIST FUNCTIONS

const recapListForm = document.getElementById("dailyRecapForm");

recapListForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const thing = document.getElementById("recapThing").value;
    
    const listItem = document.createElement("li");
    listItem.textContent = `Thing: ${thing}`;
    recapList.appendChild(listItem);

    document.getElementById("recapThing").value = "";
});

const recapList = document.getElementById("recapList");

document.getElementById("uploadRecapListToFirebase").addEventListener('click', function() {
    const recapListItems = [];
    document.querySelectorAll("#recapList li").forEach((item) => {
        const text = item.textContent;

        const recapItem = {
            thing: text.replace('Thing: ', '')
        };

        recapListItems.push(recapItem);
    });

    const today = new Date().toJSON().slice(0, 10);

    set(ref(database, `DateID_${today}/RecapList`), {
        recapListItems
    })
        .then(() => {
            alert("Recap List Uploaded to Firebase");
        })
        .catch((error) => {
            alert(error);
        });
});

// BOOK NOTES FUNCTIONS

document.getElementById("bookNotesForm").addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const chapterTitle = document.getElementById("chapterTitle").value;
    const pageNumber = document.getElementById("pageNumber").value;
    const note = document.getElementById("noteContent").value;
    
    const bookNotesList = document.getElementById("bookNotesList");
    let chapterFound = false;

    Array.from(bookNotesList.children).forEach((chapter) => {
        if (chapter.textContent.startsWith(`- ${chapterTitle}:`)) {
            const subList = chapter.querySelector('ul');

            const noteItem = document.createElement("li");
            noteItem.textContent = `- page ${pageNumber}: ${note}`;
            subList.appendChild(noteItem);

            chapterFound = true;
        }
    });

    if (!chapterFound) {
        const listItem = document.createElement("li");
        const subList = document.createElement("ul");
        const noteItem = document.createElement("li");

        listItem.textContent = `- ${chapterTitle}:`;
        noteItem.textContent = `- page ${pageNumber}: ${note}`;

        subList.appendChild(noteItem);
        listItem.appendChild(subList);
        bookNotesList.appendChild(listItem);
    }

    document.getElementById("pageNumber").value = "";
    document.getElementById("noteContent").value = "";
});

// Function to handle upload of book notes to Firebase
document.getElementById("uploadBookNotesToFirebase").addEventListener('click', function() {
    console.log("button cicked")
    const bookNotesList = document.getElementById("bookNotesList");

    const chaptersData = {};
    if (bookNotesList) {
        bookNotesList.querySelectorAll("li").forEach((chapterItem) => {
            const chapterTitle = chapterItem.textContent.split(':')[1].trim();
            const notesList = chapterItem.querySelector("ul");
    
            const notesData = {};
    
            notesList.querySelectorAll("li").forEach((noteItem) => {
                const pageNote = noteItem.textContent.split(':');
                const page = pageNote[0].replace('page', '').trim();
                const note = pageNote[1].trim();
    
                const noteID = `NoteID_${Object.keys(notesData).length + 1}`;
                notesData[noteID] = { page, note };
            });
    
            const chapterID = `ChapterID_${Object.keys(chaptersData).length + 1}`;
            chaptersData[chapterID] = {
                Title: chapterTitle,
                Notes: notesData
            };
        });
    } else {
        console.log("bookNotesList is null or undefined.");
    }
    

    const today = new Date().toJSON().slice(0, 10);

    set(ref(database, `DateID_${today}/BookNotes`), {
        chaptersData
    })
        .then(() => {
            alert("Book Notes Uploaded to Firebase");
        })
        .catch((error) => {
            alert(error);
        });
});





