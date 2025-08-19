import { Book, addBookToLibrary, addBookToShelf, resetFieldValues, booksFromLocal } from "./helpers.js";

window.onload = booksFromLocal();

var readBooks = [];
var unreadBooks = [];

var readBookshelf = document.querySelector(".read")
var unreadBookshelf = document.querySelector(".unread")
var addBookButton = document.querySelector("#add-book-btn")
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input')
const isReadInput = document.querySelector('#is-read');

addBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    let newBook = addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, isReadInput.value)

    if (isReadInput.value == 'true') {
        readBooks.push(newBook);
        addBookToShelf(newBook, readBookshelf);
        localStorage.setItem('ReadBooks', JSON.stringify(readBooks));
    } else {
        // unreadBooks.push(`{"title": ${newBook.title};"author": ${newBook.author};"pages": ${newBook.numOfPages};"isRead": ${newBook.isRead}}`);
        unreadBooks.push(newBook)
        addBookToShelf(newBook, unreadBookshelf);
        localStorage.setItem('UnreadBooks', JSON.stringify(unreadBooks));
    }

    resetFieldValues(titleInput, authorInput, pagesInput, isReadInput);
})


var TheHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
