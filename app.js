const collection = [];
const bookShelf = document.querySelector("#book-shelf");
const form = document.querySelector("#library-controls");

// defining a dynamic update function for the local storage
function dynamicStorageUpdate() {
  localStorage.setItem("bookStorageArr", JSON.stringify(collection));
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
  });
  // dynamicStorageUpdate();
  // console.log(collection);
}

// function that will get from storage and add to the collection
function populateCollection() {
  const storage = localStorage.getItem(JSON.parse("bookStorageArr"));
  storage.forEach((element) => {
    collection.push(element);
    addToShelf(element);
  });
}

// checking if the bookStorageArr array is empty in local storage
if (!localStorage.getItem("bookStorageArr")) {
  dynamicStorageUpdate();
} else {
  populateCollection();
}

// the function that creates the new book object from the constructor
const createNewBook = function () {
  const titleEntry = document.querySelector("#title").value;
  const authorEntry = document.querySelector("#author").value;
  const newBook = new ReadBook(titleEntry, authorEntry);
  collection.push(newBook);
  addToShelf(newBook);
  dynamicStorageUpdate();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewBook();
});

const removeBook = function (book) {
  collection = collection.filter((e) => {
    e.Id != book.id;
  });
  dynamicStorageUpdate();
  bookShelf.removeChild(book);
};
