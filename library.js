class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  // static property belongs to the class 'Book' not the instances of it
  static myLibrary = [];

  // static constants to maintain no global variables
  static get form() {
    return document.querySelector("form");
  }

  static get newBook() {
    return document.getElementById("newbook");
  }

  static get cancelButton() {
    return document.getElementById("close");
  }

  static get inputTitle() {
    return document.getElementById("booktitle");
  }

  static get errorTitle() {
    return document.querySelector("#booktitle + span.error");
  }

  static get inputAuthor() {
    return document.getElementById("bookauthor");
  }

  static get errorAuthor() {
    return document.querySelector("#bookauthor + span.error");
  }

  static get inputPages() {
    return document.getElementById("bookpages");
  }

  static get errorPages() {
    return document.querySelector("#bookpages + span.error");
  }

  static displayBook() {
    for (let i = Book.myLibrary.length - 1; i < Book.myLibrary.length; i += 1) {
      const book = Book.myLibrary[i];
      console.log(Book.myLibrary[i]);

      const container = document.querySelector("#container");
      const content = document.createElement("div");
      const titlebook = document.createElement("div");
      const authorbook = document.createElement("div");
      const pagesbook = document.createElement("div");
      const delBook = document.createElement("button");
      const botBook = document.createElement("div");
      const readBook = document.createElement("button");

      titlebook.classList.add("titlebook");
      delBook.classList.add("delBook");
      content.classList.add("bookdisplay");
      botBook.classList.add("botBook");
      readBook.classList.add("readBook");

      content.setAttribute("id", i);

      titlebook.textContent = `${book.title}`;
      authorbook.textContent = `by ${book.author}`;
      pagesbook.textContent = `Pages: ${book.pages}`;
      delBook.textContent = "Delete";

      content.appendChild(titlebook);
      content.appendChild(authorbook);
      content.appendChild(pagesbook);
      container.appendChild(content);
      content.appendChild(botBook);
      botBook.appendChild(delBook);
      botBook.appendChild(readBook);

      readBook.addEventListener("click", () => {
        if (readBook.style.backgroundColor === "chartreuse") {
          readBook.style.backgroundColor = "Yellow";
          book.read = "In Progress";
          console.log(book.read);
          readBook.textContent = "In Progress";
        } else if (readBook.style.backgroundColor === "yellow") {
          readBook.style.backgroundColor = "white";
          book.read = "Not Read";
          console.log(book.read);
          readBook.textContent = "Not Read";
        } else if (readBook.style.backgroundColor === "white") {
          readBook.style.backgroundColor = "chartreuse";
          book.read = "Read";
          console.log(book.read);
          readBook.textContent = "Read";
        }
        console.log(readBook.style.backgroundColor);
      });

      switch (book.read) {
        case "Read":
          readBook.style.backgroundColor = "chartreuse";
          readBook.textContent = "Read";
          break;
        case "Not Read":
          readBook.style.backgroundColor = "white";
          readBook.textContent = "Not Read";
          break;
        case "In Progress":
          readBook.style.backgroundColor = "yellow";
          readBook.textContent = "In Progress";
          break;
        default:
      }

      delBook.addEventListener("click", () => {
        Book.myLibrary.splice(i, 1);
        content.textContent = "";
        content.replaceChildren();
        const attribute = content.getAttribute("id");
        const element = document.getElementById(attribute);
        element.remove();
      });
    }
  }

  static addBookToLibrary(event) {
    const booktitle = document.getElementById("booktitle").value;
    const bookauthor = document.getElementById("bookauthor").value;
    const bookpages = document.getElementById("bookpages").value;
    const bookread = document.getElementById("bookread").value;
    const book = new Book(booktitle, bookauthor, bookpages, bookread);
    Book.myLibrary.push(book);
    event.preventDefault();
    console.log(Book.myLibrary);
    Book.displayBook();
  }
}

// values from class static constants
Book.newBook.addEventListener("click", () => {
  Book.form.style.display = "block";
});

Book.cancelButton.addEventListener("click", () => {
  Book.form.style.display = "none";
});

Book.form.addEventListener("submit", (event) => {
  if (!Book.inputTitle.validity.valid) {
    event.preventDefault();
    Book.errorTitle.textContent = "Please enter a valid title";
  } else {
    Book.addBookToLibrary(event);
  }
});

function showError() {
  if (!Book.inputTitle.validity.valid) {
    // if field is empty, display this error message
    Book.errorTitle.textContent = `Title needs to be ${Book.inputTitle.minLength} characters long. There is only ${Book.inputTitle.value.length} characters typed.`;
  }
  if (!Book.inputAuthor.validity.valid) {
    Book.errorAuthor.textContent = "Please enter a valid author name.";
  }
  if (!Book.inputPages.validity.valid) {
    Book.errorPages.textContent = "Please enter a valid number of pages.";
  }
}

Book.inputTitle.addEventListener("input", (event) => {
  if (Book.inputTitle.validity.valid) {
    Book.errorTitle.textContent = "";
  } else {
    showError();
  }
});

Book.inputAuthor.addEventListener("input", (event) => {
  if (Book.inputAuthor.validity.valid) {
    Book.errorAuthor.textContent = "";
  } else {
    showError();
  }
});

Book.inputPages.addEventListener("input", (event) => {
  if (Book.inputPages.validity.valid) {
    Book.errorPages.textContent = "";
  } else {
    showError();
  }
});
