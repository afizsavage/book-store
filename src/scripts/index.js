const addButton = document.querySelector('.add-btn');
const bookList = document.querySelector('.books-ul');
const storage = window.localStorage;

class BookHandler {
  constructor() {
    this.book = '';
    this.books = [];
    this.newBook = {
      name: '',
      title: '',
    };
  }

  addBook = () => {
    const bookName = document.querySelector('.bookname').value;
    const bookTitle = document.querySelector('.author').value;

    this.newBook = {
      name: bookName,
      title: bookTitle,
    };
    this.books.push(this.newBook);
    storage.setItem('books', JSON.stringify(this.books));
  };

  showBooks = () => {
    if (this.books.length === 0) {
      bookList.innerHTML = '<p>Sorry you have no book left. Kindly add some</p>';
    } else {
      this.book = '';
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
      (book, index) => index !== Number(e.target.attributes[2].value),
    );
  };

  loadBooks = () => {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    this.books = [...storedBooks];
  };
}

const HandlingBook = new BookHandler();
const load = () => {
  HandlingBook.loadBooks();
  HandlingBook.showBooks();
};

window.onload = load;

bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('rmv')) {
    HandlingBook.rmvBook(e);
    storage.setItem('books', JSON.stringify(HandlingBook.books));
    HandlingBook.showBooks();
  }
});

addButton.addEventListener('click', () => {
  HandlingBook.addBook();
  HandlingBook.showBooks();
});
