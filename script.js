const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
    const htmlGrid = document.getElementById("grid");
    htmlGrid.innerHTML = "";

    const addBook = document.createElement('div');
    addBook.classList.add('add-book-card');
    addBook.innerHTML = `<img src="add.svg">`;

    addBook.addEventListener("click", function() {
        document.getElementById("sidebar").classList.add('show');
    });

    htmlGrid.appendChild(addBook);

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add("display-card");
        card.setAttribute("data-id", index);

        card.innerHTML = `
        <img src="delete.svg" class="delete">
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p>${book.pages} pages</p>
        <button class="toggle-read ${book.read ? "read" : "not-read"}" data-id="${index}">${book.read ? "read" : "not read"}</button>
        `;

        htmlGrid.appendChild(card);
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener("click", function () {
            const bookId = this.getAttribute("data-id");
            removeBook(bookId);          
        });     
    });

    document.querySelectorAll(".toggle-read").forEach(button => {
        button.addEventListener("click", function () {
            const bookId = this.getAttribute("data-id");
            myLibrary[bookId].toggleRead();
            displayBooks();
        });
    });
};

function removeBook(bookId) {
    const bookIndex = parseInt(bookId);
    myLibrary.splice(bookIndex, 1);
    displayBooks();
};

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("sidebar");
    const close = document.querySelector(".close");
    const htmlGrid = document.getElementById("grid");
    const form = document.getElementById("book-form")

    close.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        modal.classList.remove("show");
        form.reset();
    });
});

document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages= document.getElementById("pages").value;
    const read = document.getElementById("read").value === "true";

    addBookToLibrary(title, author, pages, read);

    document.getElementById("book-form").reset();
});

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

displayBooks();