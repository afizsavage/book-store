const books = [];
const addButton = document.querySelector('.add-btn');

function Book(name, title) {
  this.name = name;
  this.title = title;
}

function addBook() {
  const bookName = document.querySelector('.bookname').value;
  const bookTitle = document.querySelector('.author').value;

  const book = new Book(bookName, bookTitle);
  books.push(book);
}

function showBooks() {
  let book = '';
  const bookList = document.querySelector('.books-ul');
  books.forEach((bookObj) => {
    book += `<li class="book-li">
    <span>${bookObj.name}</span><span>${bookObj.title}</span>
    <input type="button" class="btn" value="Remove" />
  </li>`;
    bookList.innerHTML = book;
  });
}

addButton.addEventListener('click', () => {
  addBook();
  showBooks();
});
