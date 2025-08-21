import { booksFromLocal, closeBook, deleteBook, createBook, saveBook } from "./helpers.js";

window.onload = booksFromLocal();

var addBookButton = document.querySelector("#add-book-btn");
var closeBookButton = document.querySelector("#close-book");
var deleteBookButton = document.querySelector("#delete-book");
var saveBookButton = document.querySelector("#save-book");

addBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    createBook();
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