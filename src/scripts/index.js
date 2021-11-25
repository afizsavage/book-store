const addButton = document.querySelector(".add-btn");
const bookList = document.querySelector(".books-ul");
const storage = window.localStorage;
const elem = document.querySelector(".main");

class BookHandler {
  constructor() {
    this.book = "";
    this.books = [];
    this.newBook = {
      name: "",
      title: "",
    };
  }

  addBook = () => {
    const bookName = document.querySelector(".bookname").value;
    const bookTitle = document.querySelector(".author").value;

    this.newBook = {
      name: bookName,
      title: bookTitle,
    };
    this.books.push(this.newBook);
    storage.setItem("books", JSON.stringify(this.books));
  };

  showBooks = () => {
    if (this.books.length === 0) {
      bookList.innerHTML =
        "<p>Sorry you have no book left. Kindly add some</p>";
    } else {
      this.book = "";
      this.books.forEach((bookObj, ind) => {
        this.book += `<li class="book-li">
    <span>${bookObj.name} ${bookObj.title}</span>
    <input type="button" class="btn rmv" data-target=${ind} value="Remove" />
  </li>`;
        bookList.innerHTML = this.book;
      });
    }
  };

  rmvBook = (e) => {
    this.books = this.books.filter(
      (book, index) => index !== Number(e.target.attributes[2].value)
    );
  };

  loadBooks = () => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    this.books = [...storedBooks];
  };

  getDateandTime = () => {
    const date = new Date();
    // get the date as a string
    const n = date.toDateString();
    // get the time as a string
    const time = date.toLocaleTimeString();

    // find the html element with the id of time
    // set the innerHTML of that element to the date a space the time
    document.getElementById("time").innerHTML = n + " " + time;
  };

  displayMain = (e) => {
    if (e.target?.classList?.contains("nav-link")) {
      switch (e?.target?.hash) {
        case "#lists":
          document.getElementById("form").classList.add("d-none");
          document.getElementById("Contact").classList.add("d-none");
          document.getElementById("lists").classList.remove("d-none");
          break;
        case "#form":
          document.getElementById("form").classList.remove("d-none");
          document.getElementById("Contact").classList.add("d-none");
          document.getElementById("lists").classList.add("d-none");
          break;
        case "#Contact":
          document.getElementById("form").classList.add("d-none");
          document.getElementById("Contact").classList.remove("d-none");
          document.getElementById("lists").classList.add("d-none");
          break;
        default:
          console.log("default");
      }
    }
  };
}

const HandlingBook = new BookHandler();
const load = () => {
  HandlingBook.loadBooks();
  HandlingBook.showBooks();
  HandlingBook.getDateandTime();
};

window.onload = load;

bookList.addEventListener("click", (e) => {
  if (e.target.classList.contains("rmv")) {
    HandlingBook.rmvBook(e);
    storage.setItem("books", JSON.stringify(HandlingBook.books));
    HandlingBook.showBooks();
  }
});

addButton.addEventListener("click", () => {
  HandlingBook.addBook();
  HandlingBook.showBooks();
});

elem.addEventListener("click", (e) => {
  HandlingBook.displayMain(e);
});
