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

export var library = [];

export function Book(title, author, numOfPages, isRead, color) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.color = color
    this.id = 'i' + crypto.randomUUID()
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.isRead ? 'read' : 'not read yet'}`
}

export function addBookToLibrary(book) {
    library.push(book);
}

export function deleteBookFromLibrary(bookID, isRead) {
    library.splice(library.findIndex(i => i.id === bookID), 1)
}

export function addBookToShelf(book, shelf) {
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

        if (HEXToL(book.color) >= 50) {
            newBookDiv.style.color = "#000000"
        } else {
            newBookDiv.style.color = "#FFFFFF"
        }
    }

    newBookDiv.addEventListener("click", (e) => {
        openBook(e.target);
    })

    shelf.appendChild(newBookDiv);
}

export function deleteBookFromShelf(bookID) {
    let bookToDelete = document.querySelector(`#${bookID}`)
    bookToDelete.remove();
}

export function resetFieldValues(titleInput, authorInput, pagesInput, isReadInput, colorInput) {
    titleInput.value = null;
    authorInput.value = null;
    pagesInput.value = null;
    isReadInput.value = 'false';
    colorInput.value = "#000000";
}

export function booksFromLocal() {
    let parsedBooks = JSON.parse(localStorage.getItem('UnreadBooks'));
    let books = parsedBooks.concat(JSON.parse(localStorage.getItem('ReadBooks')));

    let readShelf = document.querySelector(".read");
    let unreadShelf = document.querySelector(".unread");



    books.map((book) => {
        let bookObject = new Book(book.title, book.author, book.numOfPages, book.isRead, book.color)
        addBookToLibrary(bookObject);
        addBookToShelf(book, JSON.parse(book.isRead) ? readShelf : unreadShelf)
    })
}

export function deleteBookFromLocal(bookID, isRead) {
    let bookRead = JSON.parse(isRead) ? 'ReadBooks' : 'UnreadBooks'
    let lStorage = JSON.parse(localStorage.getItem(bookRead))

    lStorage.splice(lStorage.findIndex(i => i.id === bookID), 1)
    localStorage.setItem(bookRead, JSON.stringify(lStorage));
}

export function setLocalStorage(shelf, item) {
    let lStorage = JSON.parse(localStorage.getItem(shelf))
    localStorage.setItem(shelf, JSON.stringify(lStorage.concat(item)))
}

export function closeBook() {
    let bookModal = document.querySelector("dialog");
    bookModal.close()
}

export function openBook(book) {
    let bookModal = document.querySelector("dialog");
    let bookTitle = document.querySelector("#title");
    let bookAuthor = document.querySelector("#author");
    let bookRead = document.querySelector("#radio-read")
    bookTitle.textContent = book.getAttribute('title');
    bookAuthor.textContent = book.getAttribute('author');

    if (JSON.parse(book.getAttribute('isRead'))) {
        bookRead.checked = true;
    } else {
        bookRead.checked = false;
    }

    bookModal.style.backgroundColor = book.getAttribute('data-color');
    bookModal.style.boxShadow = `2px 6px 40px 0px ${book.getAttribute('data-color')}`;
    bookModal.setAttribute('bookID', book.id);
    bookModal.showModal();
}

export function deleteBook(book) {
    let bookModal = document.querySelector("dialog");
    deleteBookFromLibrary(book.id, book.getAttribute('isRead'));
    deleteBookFromLocal(book.id, book.getAttribute('isRead'));
    deleteBookFromShelf(bookModal.getAttribute('bookID'));
    closeBook();
}