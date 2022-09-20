// const books = JSON.parse(localStorage.setItem(''))

/*Set the item in the local storage*/
let collection = [];
const bookShelf = document.querySelector("#book-shelf");
form = document.querySelector("#library-controls");

function ReadBook(bTitle, bAuthor) {
  this.title = bTitle;
  this.author = bAuthor;
  this.Id = Math.floor(Math.random() * 1000000);
}

// const permanentRemove = function () {};

function addToShelf(e) {
  const newAdd = document.createElement("div");
  const titleTag = document.createElement("p");
  const authorTag = document.createElement("p");
  const removeBtn = document.createElement("button");
  const lineSeparator = document.createElement("hr");
  titleTag.innerText = e.title;
  authorTag.innerText = e.author;
  removeBtn.innerText = "Remove";

  newAdd.appendChild(titleTag);
  newAdd.appendChild(authorTag);
  newAdd.appendChild(removeBtn);
  newAdd.id = e.Id;
  bookShelf.appendChild(newAdd);
  bookShelf.appendChild(lineSeparator);
  collection.push(newAdd);
  // console.log(collection);
  removeBtn.addEventListener("click", () => {
    removeBook(newAdd);
    bookShelf.removeChild(lineSeparator);
  });
}

const createNewBook = function () {
  const titleEntry = document.querySelector("#title").value;
  const authorEntry = document.querySelector("#author").value;
  const newBook = new ReadBook(titleEntry, authorEntry);
  // collection.push(newBook);
  addToShelf(newBook);
  // form.reset();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewBook();
});

const removeBook = function (book) {
  console.log(book.id);
  collection = collection.filter((e) => {
    e.Id != book.id;
  });
  bookShelf.removeChild(book);
};
