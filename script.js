import { Book, library, addBookToShelf, resetFieldValues, booksFromLocal, setLocalStorage, addBookToLibrary, closeBook, deleteBook } from "./helpers.js";

window.onload = booksFromLocal();

var readBooks = [];
var unreadBooks = [];

var readBookshelf = document.querySelector(".read")
var unreadBookshelf = document.querySelector(".unread")
var addBookButton = document.querySelector("#add-book-btn")
var closeBookButton = document.querySelector("#close-book")
var deleteBookButton = document.querySelector("#delete-book")
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input')
const isReadInput = document.querySelector('#is-read');
const colorInput = document.querySelector('#color-selector');

addBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput.value, colorInput.value)
    addBookToLibrary(newBook);

    if (isReadInput.value == 'true') {
        readBooks.push(newBook);
        addBookToShelf(newBook, readBookshelf);
        setLocalStorage('ReadBooks', newBook);
    } else {
        unreadBooks.push(newBook)
        addBookToShelf(newBook, unreadBookshelf);
        setLocalStorage('UnreadBooks', newBook);
    }

    resetFieldValues(titleInput, authorInput, pagesInput, isReadInput, colorInput);
});

closeBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    closeBook();
})

deleteBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteBook(e.target);
})