const addButton = document.querySelector('.add-btn');
const bookList = document.querySelector('.books-ul');
const storage = window.localStorage;
// const elem = document.querySelector('.main');
const navLinks = document.querySelectorAll('.nav-ul a');
const list = document.querySelector('section#list');
const form = document.querySelector('section#form');
const contact = document.querySelector('section#contact');

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
      bookList.innerHTML =
        '<p>Sorry you have no book left. Kindly add some</p>';
    } else {
      this.book = '';
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
    const storedBooks = JSON.parse(localStorage.getItem('books'));
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
    document.getElementById('time').innerHTML = n + ' ' + time;
  };
}

const displaySection = (arg) => {
  if (arg === '#form') {
    form.classList.add('show');
    list.classList.remove('show');
    contact.classList.remove('show');
  } else if (arg === '#contact') {
    contact.classList.add('show');
    form.classList.remove('show');
    list.classList.remove('show');
  } else {
    list.classList.add('show');
    contact.classList.remove('show');
    form.classList.remove('show');
  }
};

const HandlingBook = new BookHandler();
const load = () => {
  HandlingBook.loadBooks();
  HandlingBook.showBooks();
  HandlingBook.getDateandTime();
  list.classList.add('show');
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

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    displaySection(link.getAttribute('href'));
  });
});
