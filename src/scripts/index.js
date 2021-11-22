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

addButton.addEventListener('click', () => {
  addBook();
});
