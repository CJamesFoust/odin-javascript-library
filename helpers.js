export var library = [];

export var currentBook = {};

const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input')
const isReadInput = document.querySelector('#is-read');
const colorInput = document.querySelector('#color-selector');
const bookModal = document.querySelector("dialog");
const radioRead = document.querySelector("#radio-read");
const readShelf = document.querySelector('.read');
const unreadShelf = document.querySelector('.unread');
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookRead = document.querySelector("#radio-read");

export function HEXToL(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
        throw new Error("Could not parse Hex Color");
    }

    const rHex = parseInt(result[1], 16);
    const gHex = parseInt(result[2], 16);
    const bHex = parseInt(result[3], 16);

    const r = rHex / 255;
    const g = gHex / 255;
    const b = bHex / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    return Math.round(((max + min) / 2) * 100);
}

export function getShelf(book) {
    if(JSON.parse(book.isRead) === true) {
        return readShelf;
    } else if(JSON.parse(book.isRead) === false) {
        return unreadShelf;
    } else {
        console.error('Something went wrong finding correct shelf.')
    }
}

export function Book(title, author, numOfPages, isRead, color, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.color = color
    this.id = id ? id : 'i' + crypto.randomUUID();
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.isRead ? 'read' : 'not read yet'}`
}

export function addBookToLibrary(book) {
    library.push(book);
}

export function addBookToLocalLibrary(book) {
    console.log(library)
    library.push(book);
    console.log(library)
    localStorage.setItem('Books', JSON.stringify(library));
}

export function createBookElement(book) {
    let newBookDiv = document.createElement("div")
    newBookDiv.classList = "book";
    newBookDiv.textContent = book.title;
    newBookDiv.id = book.id;
    newBookDiv.setAttribute('isRead', book.isRead);
    newBookDiv.setAttribute('title', book.title);
    newBookDiv.setAttribute('author', book.author);

    if (book.color && book.color !== null && book.color !== "") {
        newBookDiv.style.backgroundColor = book.color;
        newBookDiv.setAttribute('data-color', book.color)
        HEXToL(book.color) >= 50 ? newBookDiv.style.color = "#000000" : newBookDiv.style.color = "#FFFFFF";
    }

    newBookDiv.addEventListener("click", (e) => {
        openBook(e.target);
    })

    return newBookDiv;
}

export function addBookToShelf(bookElement, shelf) {
    shelf.appendChild(bookElement);
}

export function resetFieldValues() {
    titleInput.value = null;
    authorInput.value = null;
    pagesInput.value = null;
    isReadInput.value = 'false';
    colorInput.value = "#000000";
}

export function booksFromLocal() {
    // This seems complicated but isn't too bad. We're conditionally setting this variable based on what is in the local storage. First we check to see if there is even a record, if not (null), we set it as an empty array.
    // If there is a record, we then check if the record is in the format of an array already, or if it's an object. If it's already in an Array format, we do Array.from, otherwise we create an array with the object record inside.
    let booksInLibrary = localStorage.getItem('Books') === null ? [] : (Array.isArray(JSON.parse(localStorage.getItem('Books'))) ? Array.from(JSON.parse(localStorage.getItem('Books'))) : [JSON.parse(localStorage.getItem('Books'))]);

    if (booksInLibrary.length > 0) {
        instantiateLibrary(booksInLibrary);
    }
}

export function deleteBookFromShelf(bookID) {
    let bookToDelete = document.querySelector(`#${bookID}`)
    bookToDelete.remove();
}

export function deleteBookFromLibrary(bookID) {
    library.splice(library.findIndex(i => i.id === bookID), 1)
    localStorage.setItem('Books', JSON.stringify(library));
}

export function closeBook() {
    let bookModal = document.querySelector("dialog");
    currentBook = {};
    bookModal.close()
    bookModal.style.backgroundColor = "#F33139";
    bookModal.style.boxShadow = `2px 6px 40px 0px #F33139`;
}

export function openBook(book) {
    let indexOfBook = library.findIndex(i => i.id === book.id, 1);
    currentBook = library[indexOfBook]

    bookTitle.textContent = currentBook.title;
    bookAuthor.textContent = currentBook.author;
    bookRead.checked = JSON.parse(currentBook.isRead) ? true : false;
    bookModal.style.backgroundColor = currentBook.color;
    bookModal.style.boxShadow = `2px 6px 40px 0px ${currentBook.color}`;
    bookModal.showModal();
}

export function deleteBook() {
    deleteBookFromLibrary(currentBook.id);
    deleteBookFromShelf(currentBook.id);
    closeBook();
}

export function createBook() {
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput.value, colorInput.value)
    addBookToLocalLibrary(book);
    addBookToShelf(createBookElement(book), getShelf(book));
    resetFieldValues();
}

export function saveBook() {
    if((radioRead.checked === true && currentBook.isRead === true) || (radioRead.checked === false && currentBook.isRead === false) ) {
        return;
    } else {
        updateLibraryBook();
    }
}

export function updateLibraryBook() {
    let indexOfBook = library.findIndex(i => i.id === currentBook.id, 1);
    library[indexOfBook].isRead = !JSON.parse(library[indexOfBook].isRead);
    refreshLibrary();
}

export function instantiateLibrary(booksInLibrary) {
    booksInLibrary.map((book) => {
        let bookObject = new Book(book.title, book.author, book.numOfPages, book.isRead, book.color, book.id);
        addBookToLibrary(bookObject);
        addBookToShelf(createBookElement(book), getShelf(book));
    })
}

export function refreshLibrary() {
    localStorage.setItem('Books', JSON.stringify(library));
   
    readShelf.replaceChildren();
    unreadShelf.replaceChildren();
    
    library.map((book) => {
        addBookToShelf(createBookElement(book), getShelf(book));
    })

    closeBook();
}
