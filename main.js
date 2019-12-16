var allNotes = [];
var index = 1;


// load note when refreshing or reentering the page.
function loadNotes() {

    var str = localStorage.getItem("noteDetails");
    if(str === null) {
        return;
    }
    allNotes = JSON.parse(str);
    for (var i = 0; i < allNotes.length; i++) {
        createNote(allNotes[i]);
    }
}

//save note in the local storage.
function saveNotes() {

    var descriptionObject = window.document.getElementById("description");
    var dateObject = window.document.getElementById("date");
    var timeObject = window.document.getElementById("time");


    var note = {

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
    var descriptionObject = window.document.getElementById("description");
    var dateObject = window.document.getElementById("date");
    var timeObject = window.document.getElementById("time");


    if (descriptionObject.value.length < 1) {
        alert("Insert a description");
    }

    else if (dateObject.value.length < 1) {
        alert("Insert the date");

    }

    else {
        var note = saveNotes();
        createNote(note);
        descriptionObject.value = "";
        dateObject.value = "";
        timeObject.value = "";
    }
}


//create dynamic element in the DOM.
function createNote(note) {

    var container = document.getElementById("container");

    var div = document.createElement("div");
    div.id = note.id;
    container.appendChild(div);

    var x = document.createElement("button");
    x.setAttribute('class', 'glyphicon glyphicon-remove');
    x.classList.add("x");
    x.addEventListener("click", function () {
        deleteNote(div);
    });
    div.appendChild(x);

    var description = document.createElement("p");
    description.innerHTML = note.descriptionObject;
    description.classList.add("description");
    div.appendChild(description);

    var date = document.createElement("p");
    date.innerHTML = note.dateObject
    date.classList.add("date");
    div.appendChild(date);

    var time = document.createElement("p");
    time.innerHTML = note.timeObject;
    time.classList.add("time");
    div.appendChild(time);
}



// delete note from the local storage.
function deleteNote(div) {
    for (var i = 0; i < allNotes.length; i++) {
        if (allNotes[i].id == div.id) {
            allNotes.splice(i, 1);
        }
    }localStorage.setItem("noteDetails", JSON.stringify(allNotes));
//remove the note itself.
    div.remove(); 
}
