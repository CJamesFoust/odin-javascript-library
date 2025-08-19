import { HEXToL } from "./helpers";

function Book(title, author, numOfPages, isRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.id = crypto.randomUUID()
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.isRead ? 'read' : 'not read yet'}`
}

var library = []

function addBookToLibrary(title, author, numOfPages, isRead) {
    library.push(Book(title, author, numOfPages, isRead))
}

var TheHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
