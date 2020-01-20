let allNotes = [];
let index = 1;


// load note when refreshing or reentering the page.
function loadNotes() {

    let str = localStorage.getItem("noteDetails");
    if (str === null) {
        return;
    }
    allNotes = JSON.parse(str);
    for (let i = 0; i < allNotes.length; i++) {
        createNote(allNotes[i]);
    }
}

//save note in the local storage.
function saveNotes() {

    let descriptionObject = window.document.getElementById("description");
    let dateObject = window.document.getElementById("date");
    let timeObject = window.document.getElementById("time");


    let note = {

        dateObject: dateObject.value,
        descriptionObject: descriptionObject.value,
        timeObject: timeObject.value,
        id: index
    };
    id = index++;
    allNotes.push(note);


    localStorage.setItem("noteDetails", JSON.stringify(allNotes));
    return note;
}


// required fields.
function getInfo() {
    let descriptionObject = window.document.getElementById("description");
    let dateObject = window.document.getElementById("date");
    let timeObject = window.document.getElementById("time");
    // console.log(dateObject.value , "hello")


    if (descriptionObject.value.length < 1) {
        alert("Insert a description");
    }

    else if (dateObject.value.length < 1) {
        alert("Insert the date");

    }

    else {
        let note = saveNotes();
        createNote(note);
        descriptionObject.value = "";
        dateObject.value = "";
        timeObject.value = "";
    }
}


//create dynamic element in the DOM.
function createNote(note) {

    let container = document.getElementById("container");

    let div = document.createElement("div");
    div.id = note.id;
    container.appendChild(div);

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute('class', 'glyphicon glyphicon-remove');
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", function () {
        deleteNote(div);
    });
    div.appendChild(deleteButton);

    let description = document.createElement("p");
    description.innerHTML = note.descriptionObject;
    description.classList.add("description");
    div.appendChild(description);

    let date = document.createElement("p");
    date.innerHTML = note.dateObject
    date.classList.add("date");
    div.appendChild(date);

    let time = document.createElement("p");
    time.innerHTML = note.timeObject;
    time.classList.add("time");
    div.appendChild(time);
}



// delete note from the local storage.
function deleteNote(div) {
    for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i].id == div.id) {
            allNotes.splice(i, 1);
        }
    } localStorage.setItem("noteDetails", JSON.stringify(allNotes));
    //remove the note itself.
    div.remove();
}

//past date not allowed function

function pastDate() {
    let input = document.getElementById("date");
    let date = new Date();
    // Set month and day to string to add leading 0
    let day = new String(date.getDate());
    let mon = new String(date.getMonth() + 1); //January is 0!
    let yr = date.getFullYear();

    if (day.length < 2) { day = "0" + day; }
    if (mon.length < 2) { mon = "0" + mon; }

    let newDate = new String(yr + '-' + mon + '-' + day);

    input.setAttribute('min', newDate);
}
