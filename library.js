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

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

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

/*
function samplesubmit(event) {
  console.log(myLibrary[0]);
  container.textContent = "Hello World!";
  event.preventDefault();
}

form.addEventListener("submit", samplesubmit);
*/

/*
- create a for loop that searches through the myLibrary array
and displays each book. (JS)
- create form asking for user input (HTML/CSS/JS)
- add userinput for title, author, pages, read for form (JS)
- create button on HTML to access open up form (HTML/CSS)
- on click form will open up to a set size card centered to 
the webpage (HTML/CSS/JS)
- create form submit button (HTML)
- on form submission, create new object for the book with the
properties of title, author, pages, read. (JS)
- on form submission, create a card 1/5 of screen, that has two 
layers. The card layer and a smaller centered card with the
book title, author and pages. (HTML / CSS)
- card layer has two buttons, one at top right corner and one
at top left corner. Top right button changes read/unread. Top
left deletes book from array. (HTML/CSS/JS)
- on click delete book button, remove book from array. (JS)
*/

/* SAMPLE BOOKS
const book1 = new Book( // turn this book into user input
  "Chartreuse Eggs and Ham",
  "Dr.Suess",
  "50 pages",
  "not read yet"
);

const book2 = new Book( // turn this book into user input
  "Harry Potter",
  "J.K. Rowling",
  "500 pages",
  "not read yet"
); */
