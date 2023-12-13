import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
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

// const today = new Date();
// const ystdy = new Date(today);
// ystdy.setDate(today.getDate() - 1);
// const yesterday = ystdy.toJSON().slice(0, 10);

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

toDoListForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const time = document.getElementById("toDoTime").value;
    const thing = document.getElementById("toDoThing").value;

    const listItem = document.createElement("li");
    listItem.textContent = `Thing: ${thing}${time ? ` @ Time: ${time}` : ''}`;
    toDoList.appendChild(listItem);

    document.getElementById("toDoTime").value = "";
    document.getElementById("toDoThing").value = "";
});


document.getElementById("uploadToDoListToFirebase").addEventListener('click', function () {
    const toDoListItems = [];
    document.querySelectorAll("#toDoList li").forEach((item) => {
        const text = item.textContent.split(' @ Time: ');
        const thing = text[0].replace('Thing: ', '');
        const time = text[1] ? text[1] : ''; // If time is not available, assign an empty string

        const toDoItem = {
            time,
            thing
        };

        toDoListItems.push(toDoItem);
    });

    const date = new Date();
    const estOffset = -5 * 60; // EST is UTC-5 hours
    const localOffset = date.getTimezoneOffset();
    const estDate = new Date(date.getTime() + (localOffset + estOffset) * 60000);
    const today = estDate.toJSON().slice(0, 10);
    
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

recapListForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const thing = document.getElementById("recapThing").value;

    const listItem = document.createElement("li");
    listItem.textContent = `Thing: ${thing}`;
    recapList.appendChild(listItem);

    document.getElementById("recapThing").value = "";
});

const recapList = document.getElementById("recapList");

document.getElementById("uploadRecapListToFirebase").addEventListener('click', function () {
    const recapListItems = [];
    document.querySelectorAll("#recapList li").forEach((item) => {
        const text = item.textContent;

        const recapItem = {
            thing: text.replace('Thing: ', '')
        };

        recapListItems.push(recapItem);
    });

    const date = new Date();
    const estOffset = -5 * 60; // EST is UTC-5 hours
    const localOffset = date.getTimezoneOffset();
    const estDate = new Date(date.getTime() + (localOffset + estOffset) * 60000);
    const today = estDate.toJSON().slice(0, 10);

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

document.getElementById("bookNotesForm").addEventListener('submit', function (e) {
    e.preventDefault();


    const bookName = document.getElementById("bookTitle").value;
    const chapterTitle = document.getElementById("chapterTitle").value;
    const pageNumber = document.getElementById("pageNumber").value;
    const note = JSON.stringify(document.getElementById("noteContent").value);

    const bookNotesList = document.getElementById("bookNotesList");

    document.getElementById("bookName").innerHTML = bookName;

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
document.getElementById("uploadBookNotesToFirebase").addEventListener('click', function () {

    const bookNotesList = document.getElementById('bookNotesList');
    const chaptersData = {};

    const bookTitle = document.getElementById("bookName").innerText

    if (bookNotesList) {
        let chapterID = 1;
        console.log(bookNotesList)
        bookNotesList.querySelectorAll('li').forEach((chapterItem) => {
            const chapterTitle = chapterItem.textContent.split(':')[0].trim() + " ~ " + bookTitle;

            if (chapterTitle.startsWith('- Chapter')) {
                const notesList = chapterItem.querySelector('ul');
                console.log(notesList)
                const notesData = {};
                if (notesList) {
                    notesList.querySelectorAll('li').forEach((noteItem) => {
                        // Split only at the first colon
                        const noteParts = noteItem.textContent.split(/:(.+)/);
                        const page = noteParts[0].replace('- page', '').trim();
                        const note = noteParts[1] ? noteParts[1].trim() : '';

                        const noteID = `NoteID_${Object.keys(notesData).length + 1}`;
                        notesData[noteID] = { page, note };
                    });
                }

                chaptersData[`ChapterID_${chapterID}`] = {
                    Title: chapterTitle,
                    Notes: notesData,
                };

                chapterID++;
            }
        });
    } else {
        console.log('bookNotesList is null or undefined.');
    }

    console.log(chaptersData);

    const date = new Date();
    const estOffset = -5 * 60; // EST is UTC-5 hours
    const localOffset = date.getTimezoneOffset();
    const estDate = new Date(date.getTime() + (localOffset + estOffset) * 60000);
    const today = estDate.toJSON().slice(0, 10);

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




// MISC NOTES FUNCTIONS



const miscThoughtsForm = document.getElementById("miscThoughtsForm");
const thoughtsList = document.getElementById("thoughtsList");

miscThoughtsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    

    const thought = JSON.stringify(document.getElementById("miscThoughts").value);
    
    const listItem = document.createElement("li");
    listItem.textContent = thought;
    thoughtsList.appendChild(listItem);

    document.getElementById("miscThoughts").value = "";
});



document.getElementById("uploadThoughtsListToFirebase").addEventListener('click', function () {
    const thoughtListItems = [];
    document.querySelectorAll("#thoughtsList li").forEach((item) => {
        const text = item.textContent;
        console.log(this.textContent)
        const thoughtItem = {
            thought: text.replace('Thought: ', '')
        };

        thoughtListItems.push(thoughtItem);
    });

    console.log(thoughtListItems)

    const date = new Date();
    const estOffset = -5 * 60; // EST is UTC-5 hours
    const localOffset = date.getTimezoneOffset();
    const estDate = new Date(date.getTime() + (localOffset + estOffset) * 60000);
    const today = estDate.toJSON().slice(0, 10);

    set(ref(database, `DateID_${today}/ThoughtsList`), {
        thoughtListItems
    })
        .then(() => {
            alert("Thoughts List Uploaded to Firebase");
        })
        .catch((error) => {
            alert(error);
        });
});


