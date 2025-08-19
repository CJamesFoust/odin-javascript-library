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

export function Book(title, author, numOfPages, isRead) {
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

export function addBookToLibrary(title, author, numOfPages, isRead) {
    return new Book(title, author, numOfPages, isRead);
}

export function addBookToShelf(book, shelf) {
    let newBookDiv = document.createElement("div")
    newBookDiv.classList = "book";
    newBookDiv.textContent = book.title;
    shelf.appendChild(newBookDiv);
}

export function resetFieldValues(titleInput, authorInput, pagesInput, isReadInput) {
    titleInput.value = null;
    authorInput.value = null;
    pagesInput.value = null;
    isReadInput.value = 'false';
}

export function booksFromLocal() {
    let unreadBooks = JSON.parse(localStorage.getItem('UnreadBooks'));
    let readBooks = JSON.parse(localStorage.getItem('ReadBooks'));
    console.log(readBooks)
    console.log(unreadBooks)


    //         if (matchPages) {
    //             newBook["pages"] = parseInt(matchPages[1].trim());
    //         }
    //         if (matchRead) {
    //             newBook["isRead"] = JSON.parse(matchRead[1].trim())
    //         }

}