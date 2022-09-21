const bookShelf = document.querySelector("#book-shelf");
const form = document.querySelector("#library-controls");
let collection = JSON.parse(localStorage.getItem("bookStorageArr")) || [];

// defining a dynamic update function for the local storage
function dynamicStorageUpdate(storeArr) {
  localStorage.setItem("bookStorageArr", JSON.stringify(storeArr));
}

// defining the constructor for new book objects to be added
function ReadBook(bTitle, bAuthor) {
  this.title = bTitle;
  this.author = bAuthor;
  this.Id = Math.floor(Math.random() * 1000000);
}

// the function that creates the node and adds it to the bookShelf
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

  // adding the event listener to the remove button of each book
  removeBtn.addEventListener("click", () => {
    removeBook(newAdd);
    bookShelf.removeChild(lineSeparator);
    removeLocal(e.Id);
    // dynamicStorageUpdate(collection);
  });
  // dynamicStorageUpdate();
  // console.log(collection);
}

// function that will get from storage and add to the collection
function populateCollection() {
  collection.forEach((element) => {
    addToShelf(element);
  });
}

populateCollection();
// checking if the bookStorageArr array is empty in local storage
// if (!localStorage.getItem("bookStorageArr")) {
//   dynamicStorageUpdate();
// } else {
//   populateCollection();
// }

// the function that creates the new book object from the constructor
const createNewBook = function () {
  const titleEntry = document.querySelector("#title").value;
  const authorEntry = document.querySelector("#author").value;
  const newBook = new ReadBook(titleEntry, authorEntry);
  collection.push(newBook);
  addToShelf(newBook);
  dynamicStorageUpdate(collection);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewBook();
});

// function filterArr(bookId) {
//   let filtrate = collection.filter((e) => {
//     e.Id != bookId;
//     console.log(e);
//     console.log(e.Id);
//     console.log(bookId);
//   });
//   console.log(filtrate);
//   return filtrate;
// }

function removeBook(book) {
  bookShelf.removeChild(book);
}

// localStorage.clear();
function removeLocal(bookId) {
  console.log("okay");
  console.log(bookId);
  // collection = collection.filter((e) => {
  //   e.Id != bookId;
  // });
  dynamicStorageUpdate(collection);
}
