// REFRACTOR CODE TO USE CLASS INSTEAD OF PLAIN CONSTRUCTORS

const container = document.querySelector("#container");
const form = document.querySelector("form");
const newbook = document.getElementById("newbook");
const cancelbutton = document.getElementById("close");

const myLibrary = [];

newbook.addEventListener("click", () => {
  form.style.display = "block";
});

cancelbutton.addEventListener("click", () => {
  form.style.display = "none";
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// function displays most recent book added
function displayBook() {
  for (let i = myLibrary.length - 1; i < myLibrary.length; i += 1) {
    const book = myLibrary[i]; // storing myLibrary[i] properties inside book variable
    console.log(myLibrary[i]);

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
      myLibrary.splice(i, 1);
      content.textContent = "";
      content.replaceChildren();
      const attribute = content.getAttribute("id");
      const element = document.getElementById(attribute);
      element.remove();
    });
  }
}

function addBookToLibrary(event) {
  const booktitle = document.getElementById("booktitle").value;
  const bookauthor = document.getElementById("bookauthor").value;
  const bookpages = document.getElementById("bookpages").value;
  const bookread = document.getElementById("bookread").value;
  const book = new Book(booktitle, bookauthor, bookpages, bookread);
  myLibrary.push(book); // add book to myLibrary Array
  event.preventDefault();
  displayBook();
}

form.addEventListener("submit", addBookToLibrary);
