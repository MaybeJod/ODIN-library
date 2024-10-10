let library = [
    new book("Atomic Habits", "James Clear", 306, true), 
    new book("Project Hail Mary", "Andy Weir", 496, true),
    new book("Fahrenheit 451", "Ray Bradbury", 192, false)
];

/* object */
function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    this.readCheck = function() {
        return this.read ? "Read" : "Have not read";
    }

    this.printInfo = function() {
        return `${this.title} by ${this.author}, ${this.pages}. ${this.readCheck()}`;
    }
}

const dialog = document.querySelector(".add-window");

function openAddWindow() {
    const showBtn = document.querySelector(".add-btn");
    const cancelBtn = document.querySelector("#cancel-btn");

    showBtn.addEventListener("click", () => {
        dialog.show();
    });

    cancelBtn.addEventListener("click", () => {
        dialog.close();
    });
}

function addBookToLibrary() {
    const bookTitle = document.querySelector(".title");
    let bookTitleValue = bookTitle.value; 

    const bookAuthor = document.querySelector(".author");
    let bookAuthorValue = bookAuthor.value; 

    const bookPages = document.querySelector(".pages");
    let bookPagesValue = bookPages.value;

    const bookRead = document.querySelector(".read");
    let bookReadValue = bookRead.checked;

    let newBook = new book(bookTitleValue, bookAuthorValue, bookPagesValue, bookReadValue);
    library.push(newBook);
}

function printLibrary() {
    let cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = ''; // Clear the container before printing

    for (let i = 0; i < library.length; i++) {
        // Create a card element
        let card = document.createElement("div");
        card.classList.add("card");

        // Create and append the title
        let title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = library[i].title;
        card.appendChild(title);

        // Create and append the author
        let author = document.createElement("p");
        author.classList.add("author");
        author.textContent = `Author: ${library[i].author}`;
        card.appendChild(author);

        // Create and append the pages
        let pages = document.createElement("p");
        pages.classList.add("pages");
        pages.textContent = `Pages: ${library[i].pages}`;
        card.appendChild(pages);

        // Create and append the button
        let readButton = document.createElement("button");
        readButton.textContent = library[i].read ? "Read" : "Not read";
        card.appendChild(readButton);

        // Create and append delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn")
        deleteBtn.textContent = `Delete`;
        card.appendChild(deleteBtn);

        // Append the card to the card container
        cardContainer.appendChild(card);
    }

    deleteBtn();
}

function deleteBtn() {
    const removeButtons = document.querySelectorAll(".delete-btn");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.currentTarget.getAttribute("data-index"); // Get the correct index from the button
            removeBookFromLibrary(index);
        });
    });
}

function removeBookFromLibrary(index) {
    library.splice(index, 1);
    printLibrary();
    console.log(library);
}

function handleData() {
    let submitBook = document.querySelector("#book-form");

    submitBook.addEventListener("submit", (e) => {
        e.preventDefault();

        addBookToLibrary();
        dialog.close();
        printLibrary();

        submitBook.reset();
    })
}

function init() {
    printLibrary();
    openAddWindow();
    handleData();
    console.log(library);
}

init();