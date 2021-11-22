let books = [];
const addButton = document.querySelector('.add-btn');
const bookList = document.querySelector('.books-ul');
const storage = window.localStorage;

function Book(name, title) {
  this.name = name;
  this.title = title;
}

function addBook() {
  const bookName = document.querySelector('.bookname').value;
  const bookTitle = document.querySelector('.author').value;

  const book = new Book(bookName, bookTitle);
  books.push(book);
  storage.setItem('books', JSON.stringify(books));
}

function showBooks() {
  let book = '';
  if (books.length === 0) {
    bookList.innerHTML = '<p>Sorry you have no book left. Kindly add some</p>';
  } else {
    books.forEach((bookObj, ind) => {
      book += `<li class="book-li">
    <span>${bookObj.name}</span> <span>${bookObj.title}</span>
    <input type="button" class="btn rmv" data-target=${ind} value="Remove" />
  </li>`;
      bookList.innerHTML = book;
    });
  }
}
bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('rmv')) {
    books = books.filter(
      (book, index) => index !== Number(e.target.attributes[2].value),
    );
    storage.setItem('books', JSON.stringify(books));
    showBooks();
  }
});

addButton.addEventListener('click', () => {
  addBook();
  showBooks();
});

const load = () => {
  const storedBooks = JSON.parse(localStorage.getItem('books'));
  storedBooks.forEach((book) => {
    books.push(book);
  });
  showBooks();
};
window.onload = load;
