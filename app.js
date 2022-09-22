// ensure that the existing storage in memory is loaded into the array
const collection = JSON.parse(localStorage.getItem("bookStorageArr")) || [];

const bookShelf = document.querySelector("#book-shelf");
const form = document.querySelector("#main-form");

// defining the constructor for new book objects to be added
class ReadBook {
  constructor(bTitle, bAuthor) {
    this.title = bTitle;
    this.author = bAuthor;
    this.Id = Math.floor(Math.random() * 1000000);
  }

  // defining a dynamic update function for the local storage
  static dynamicStorageUpdate(storeArr) {
    localStorage.setItem("bookStorageArr", JSON.stringify(storeArr));
  }

  // the function that creates the new book object from the constructor
  static createNewBook() {
    const titleEntry = document.querySelector("#title").value;
    const authorEntry = document.querySelector("#author").value;
    const newBook = new ReadBook(titleEntry, authorEntry);
    collection.push(newBook);
    this.addToShelf(newBook);
    this.dynamicStorageUpdate(collection);
  }

  // function that will get from storage and add to the collection
  static populateCollection() {
    collection.forEach((element) => {
      this.addToShelf(element);
    });
  }

  // the function that will remove the book from the screen
  static removeBook(book) {
    bookShelf.removeChild(book);
  }

  // the function that will remove the book from the local storage
  static removeLocal(bookId) {
    collection.forEach((e) => {
      if (e.Id === bookId) {
        const indexArr = collection.indexOf(e);
        collection.splice(indexArr, 1);
      }
    });
    this.dynamicStorageUpdate(collection);
  }

  // defining the function that creates the node and adds it to the bookShelf
  static addToShelf(e) {
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
      this.removeBook(newAdd);
      bookShelf.removeChild(lineSeparator);
      this.removeLocal(e.Id);
    });
  }
}

// invoking the function to display the books on screen
ReadBook.populateCollection();

// adding the submit event listener to the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  ReadBook.createNewBook();

  form.reset();
});
