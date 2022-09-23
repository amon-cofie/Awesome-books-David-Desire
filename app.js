const bookShelf = document.querySelector('#book-shelf');
const form = document.querySelector('#main-form');
const librarySection = document.querySelector('#library');
const addBookSection = document.querySelector('#add-new-book');
const contactUs = document.querySelector('#contact-us-section');
addBookSection.classList.add('hidden');
contactUs.classList.add('hidden');

// defining the constructor for new book objects to be added
class ReadBook {
  constructor(bTitle, bAuthor) {
    this.title = bTitle;
    this.author = bAuthor;
    this.Id = Math.floor(Math.random() * 1000000);
  }

  // ensure that the existing storage in memory is loaded into the array
  static collection = JSON.parse(localStorage.getItem('bookStorageArr')) || [];

  // defining a dynamic update function for the local storage
  static dynamicStorageUpdate(storeArr) {
    localStorage.setItem('bookStorageArr', JSON.stringify(storeArr));
  }

  // the function that creates the new book object from the constructor
  static createNewBook() {
    const titleEntry = document.querySelector('#title').value;
    const authorEntry = document.querySelector('#author').value;
    const newBook = new ReadBook(titleEntry, authorEntry);
    this.collection.push(newBook);
    this.addToShelf(newBook);
    this.dynamicStorageUpdate(this.collection);
  }

  // function that will get from storage and add to the collection
  static populateCollection() {
    this.collection.forEach((element) => {
      this.addToShelf(element);
    });
  }

  // the function that will remove the book from the screen
  static removeBook(book) {
    bookShelf.removeChild(book);
    // this.addDarkBg();
  }

  // the function that will remove the book from the local storage
  static removeLocal(bookId) {
    this.collection.forEach((e) => {
      if (e.Id === bookId) {
        const indexArr = this.collection.indexOf(e);
        this.collection.splice(indexArr, 1);
      }
    });
    this.dynamicStorageUpdate(this.collection);
  }

  // defining the function that creates the node and adds it to the bookShelf
  static addToShelf(e) {
    const newAdd = document.createElement('div');
    const bookTag = document.createElement('p');

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtnStyle');

    bookTag.innerText = `"${e.title}" by ${e.author}`;

    removeBtn.innerText = 'Remove';
    newAdd.appendChild(bookTag);
    newAdd.classList.add('book-shelf-layout');
    newAdd.appendChild(removeBtn);
    newAdd.id = e.Id;
    bookShelf.appendChild(newAdd);
    newAdd.classList.add('darker-background');

    // adding the event listener to the remove button of each book
    removeBtn.addEventListener('click', () => {
      this.removeBook(newAdd);

      this.removeLocal(e.Id);
    });
  }
}

// invoking the function to display the books on screen
ReadBook.populateCollection();

// adding the submit event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  ReadBook.createNewBook();

  form.reset();
});

const nav1 = document.querySelector('.nav-1 button');
const nav2 = document.querySelector('.nav-2 button');
const nav3 = document.querySelector('.nav-3 button');

function displayList() {
  librarySection.classList.remove('hidden');
  addBookSection.classList.add('hidden');
  contactUs.classList.add('hidden');
  nav1.classList.add('selected');
  nav2.classList.remove('selected');
  nav3.classList.remove('selected');
}

function displayForm() {
  librarySection.classList.add('hidden');
  addBookSection.classList.remove('hidden');
  contactUs.classList.add('hidden');
  nav1.classList.remove('selected');
  nav2.classList.add('selected');
  nav3.classList.remove('selected');
}

function displayContact() {
  librarySection.classList.add('hidden');
  addBookSection.classList.add('hidden');
  contactUs.classList.remove('hidden');
  nav1.classList.remove('selected');
  nav2.classList.remove('selected');
  nav3.classList.add('selected');
}

document.getElementById('library').onclick = displayList;
document.getElementById('add-new-book').onclick = displayForm;
document.getElementById('contact-us-section').onclick = displayContact;

const dateBox = document.querySelector('.date');
dateBox.innerText = new Date();
