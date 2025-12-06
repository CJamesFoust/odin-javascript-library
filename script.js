import { booksFromLocal, closeBook, deleteBook, createBook, saveBook } from "./helpers.js";

window.onload = booksFromLocal();

var addBookButton = document.querySelector("#add-book-btn");
var closeBookButton = document.querySelector("#close-book");
var deleteBookButton = document.querySelector("#delete-book");
var saveBookButton = document.querySelector("#save-book");
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');

var titleValid = false;
var authorValid = false;

const checkValidation = (input, validState) => {
    input.reportValidity();

    if(input.validity.valid) {
        validState = true;
    } else {
        validState = false;
    }

    return validState;

}

titleInput.addEventListener("input", () => {
    titleValid = checkValidation(titleInput, titleValid);

    if(titleValid && authorValid) {
        addBookButton.classList.remove("disabled");
    } else {
        addBookButton.classList.add("disabled");
    }
})

authorInput.addEventListener("input", () => {
    authorValid = checkValidation(authorInput, authorValid);
    
    if(titleValid && authorValid) {
        addBookButton.classList.remove("disabled");
    } else {
        addBookButton.classList.add("disabled");
    }
})

addBookButton.addEventListener("click", (e) => {
    // e.preventDefault();
    if(!titleInput.validity.valid) {
        titleInput.setCustomValidity("Nope");
        return
    }
    createBook();
    authorValid, titleValid = false;
    addBookButton.classList.add("disabled");
});

closeBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    closeBook();
})

deleteBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteBook(e.target);
})

saveBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    saveBook();
})