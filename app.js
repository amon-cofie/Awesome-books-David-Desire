const bookShelf = document.querySelector('#book-shelf');
const form = document.querySelector('#main-form');

// ensure that the existing storage in memory is loaded into the array
const collection = JSON.parse(localStorage.getItem('bookStorageArr')) || [];

// defining a dynamic update function for the local storage
function dynamicStorageUpdate(storeArr) {
  localStorage.setItem('bookStorageArr', JSON.stringify(storeArr));
}

// defining the constructor for new book objects to be added
function ReadBook(bTitle, bAuthor) {
  this.title = bTitle;
  this.author = bAuthor;
  this.Id = Math.floor(Math.random() * 1000000);
}

// the function that will remove the book from the screen
function removeBook(book) {
  bookShelf.removeChild(book);
}

// the function that will remove the book from the local storage
function removeLocal(bookId) {
  collection.forEach((e) => {
    if (e.Id === bookId) {
      const indexArr = collection.indexOf(e);
      collection.splice(indexArr, 1);
    }
  });
  dynamicStorageUpdate(collection);
}

// defining the function that creates the node and adds it to the bookShelf
function addToShelf(e) {
  const newAdd = document.createElement('div');
  const titleTag = document.createElement('p');
  const authorTag = document.createElement('p');
  const removeBtn = document.createElement('button');
  const lineSeparator = document.createElement('hr');
  titleTag.innerText = e.title;
  authorTag.innerText = e.author;
  removeBtn.innerText = 'Remove';
  newAdd.appendChild(titleTag);
  newAdd.appendChild(authorTag);
  newAdd.appendChild(removeBtn);
  newAdd.id = e.Id;
  bookShelf.appendChild(newAdd);
  bookShelf.appendChild(lineSeparator);

  // adding the event listener to the remove button of each book
  removeBtn.addEventListener('click', () => {
    removeBook(newAdd);
    bookShelf.removeChild(lineSeparator);
    removeLocal(e.Id);
    // dynamicStorageUpdate(collection);
  });
}

// function that will get from storage and add to the collection
function populateCollection() {
  collection.forEach((element) => {
    addToShelf(element);
  });
}

// invoking the function to display the books on screen
populateCollection();

// the function that creates the new book object from the constructor
const createNewBook = function () {
  const titleEntry = document.querySelector('#title').value;
  const authorEntry = document.querySelector('#author').value;
  const newBook = new ReadBook(titleEntry, authorEntry);
  collection.push(newBook);
  addToShelf(newBook);
  dynamicStorageUpdate(collection);
};

// adding the submit event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  createNewBook();

  form.reset();
});
