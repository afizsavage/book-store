const addButton = document.querySelector(".add-btn");
const bookList = document.querySelector(".books-ul");
const storage = window.localStorage;

class handleBook {
  constructor() {
    this.book = "";
    this.books = [];
  }

  addBook = () => {
    const bookName = document.querySelector(".bookname").value;
    const bookTitle = document.querySelector(".author").value;

    const newBook = new Book(bookName, bookTitle);
    this.books.push(newBook);
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
    <span>${bookObj.name}</span> <span>${bookObj.title}</span>
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
}

const handlingBook = new handleBook();
const load = () => {
  handlingBook.loadBooks();
  handlingBook.showBooks();
};

window.onload = load;

class Book {
  constructor(name, title) {
    this.name = name;
    this.title = title;
  }
}

bookList.addEventListener("click", (e) => {
  if (e.target.classList.contains("rmv")) {
    console.log("got to rmv button");
    handlingBook.rmvBook(e);
    storage.setItem("books", JSON.stringify(handlingBook.books));
    handlingBook.showBooks();
  }
});

addButton.addEventListener("click", () => {
  console.log("add btn clicked");
  handlingBook.addBook();
  handlingBook.showBooks();
});
