let collection = [];
const bookShelf = document.querySelector("#book-shelf");

function ReadBook(bTitle, bAuthor) {
  this.title = bTitle;
  this.author = bAuthor;
}

// const permanentRemove = function () {};

function addToShelf() {
  collection.forEach((e) => {
    bookShelf.appendChild(e);
  });
}

const addBook = function () {
  const titleEntry = document.querySelector("#title").value;
  const authorEntry = document.querySelector("#author").value;
  const newAdd = document.createElement("li");
  const titleTag = document.createElement("p");
  const authorTag = document.createElement("p");
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  const newBook = new ReadBook(titleEntry, authorEntry);
  titleTag.innerText = newBook.title;
  authorTag.innerText = newBook.author;
  newAdd.appendChild(titleTag);
  newAdd.appendChild(authorTag);
  newAdd.appendChild(removeBtn);
  collection.push(newAdd);
  console.log(collection);
  addToShelf();
};

// const removeBook = function (unwantedBook) {
//   collection = collection.filter((e) => {
//     e.title != unwantedBook.title;
//     e.author != unwantedBook.author;
//   });
// };

//  removeBtn.addEventListener("click", () => {
//    removeBook(newAdd);
//    permanentRemove(newAdd);
//  });

document.querySelector("#library-controls").addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
});

console.log(bookShelf);
