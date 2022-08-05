let searchBar = document.getElementById("search-bar");
let notesContainer = document.getElementById("notes-container")
let note = document.getElementsByClassName("note");
let noteTitle = document.getElementById("note-title")
let noteDescription = document.getElementById("note-description");
let searchReset = document.getElementById("reset-search");
let searchButton = document.getElementById("search-btn");


function noteAlreadyExist() {
    if (notesContainer.children.length == 0) {
        let nothingToShow = document.createElement("p");
        let nothingToShowText = document.createTextNode(`Oops! Nothing to show :) Use "Add a Note" section to add notes.`);

        nothingToShow.appendChild(nothingToShowText);

        notesContainer.appendChild(nothingToShow);
    }
}

noteAlreadyExist();

function showNotes() {
    for (const [key, value] of Object.entries(localStorage)) {
        addNote(key, value);
    }
}

showNotes();


function addNote(title, description) {
    // Creating the Note Container
    let div = document.createElement("div");
    div.className = "note";

    let heading = document.createElement("h1");
    let headingText = document.createTextNode(title);
    heading.appendChild(headingText);

    // Creating element to add text from textarea Element
    let para = document.createElement("p");
    let paraText = document.createTextNode(description);
    para.appendChild(paraText);

    // Creating Delete button for Note
    let button = document.createElement("button");
    button.className = "del-btn";
    button.setAttribute("type", "button")

    // Creating iframe element as icon for Delete button
    let iFrame = document.createElement("i");
    iFrame.className = "fa-solid fa-trash-can white"

    // Creating span Element as text for Delete button
    let span = document.createElement("span");
    let spanText = document.createTextNode("Delete Note")
    span.appendChild(spanText);

    button.appendChild(iFrame);
    button.appendChild(span);

    div.appendChild(heading);
    div.appendChild(para);
    div.appendChild(button);

    if (note.length == 0) {
        document.querySelector("#notes-container > p").replaceWith(div);
    }
    else {
        notesContainer.insertAdjacentElement("afterbegin", div)
    }
}

function deleteNote(parent, child) {
    let key = child.children[0].innerText;
    if (confirm("Are you sure want to delete?")) {
        parent.removeChild(child);
        localStorage.removeItem(key);
        noteAlreadyExist();
    }
}


document.addEventListener("keyup", (e) => {
    if (e.key == "/") {
        searchBar.focus();
    }
});

searchBar.addEventListener("keyup", () => {
    if (searchBar.value == "") {
        searchReset.classList.add("hide")
    } else {
        searchReset.classList.remove("hide")
    }

    searchNote();
});

searchReset.addEventListener("click", () => {
    searchBar.value = "";
    searchReset.classList.add("hide");
    searchBar.blur();
    searchNote();
});

function searchNote() {
    Array.from(note).forEach((element) => {
        let noteText = element.innerText.slice(0, -13).toLowerCase();
        let searchBarValue = searchBar.value.toLowerCase();

        if (noteText.includes(searchBarValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

searchButton.addEventListener("click", () => {
    searchBar.classList.add("active");
    searchBar.focus();
});

notesContainer.addEventListener("click", (e) => {
    if (e.target.nodeName.toLowerCase() == "button") {
        deleteNote(e.target.parentNode.parentNode, e.target.parentNode)
    }
    else if (e.target.nodeName.toLowerCase() == "span" || e.target.nodeName.toLowerCase() == "svg") {
        deleteNote(e.target.parentNode.parentNode.parentNode, e.target.parentNode.parentNode);
    }
    else if (e.target.nodeName.toLowerCase() == "path") {
        deleteNote(e.target.parentNode.parentNode.parentNode.parentNode, e.target.parentNode.parentNode.parentNode);
    }
});


searchBar.addEventListener("click", (e) => {
    hideNavItem();
});

searchBar.addEventListener("mouseeneter", (e) => {
    hideNavItem();
})

searchBar.addEventListener("focus", (e) => {
    hideNavItem();
});

searchBar.addEventListener("mouseleave", (e) => {
    if (searchBar.value == "") {
        setTimeout(() => {
            searchBar.classList.remove("active");
            showNavItem();
        }, 500)
    }
    else {
        searchBar.focus();
    }
})

searchBar.addEventListener("blur", (e) => {
    if (searchBar.value == "") {
        setTimeout(() => {
            searchBar.classList.remove("active");
            showNavItem();
        }, 500)
    }
    else {
        searchBar.focus();
    }
})

function hideNavItem() {
    document.querySelectorAll("a.nav-item").forEach(element => {
        element.classList.add("hide");
    });
}

function showNavItem() {
    document.querySelectorAll("a.nav-item").forEach(element => {
        element.classList.remove("hide");
    });
}