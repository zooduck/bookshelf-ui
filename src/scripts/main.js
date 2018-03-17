import {loader} from "./loader.service.js";

if (location.search.match(/dev\=1/)) {
  const devOnlyEls = document.querySelectorAll("[developeronly]");
  for (let el of devOnlyEls) {
    el.removeAttribute("developeronly");
  }
}


// const apiUrl__getBooks = "http://localhost:4567";
// const apiUrl = "https://zoobooks-api.herokuapp.com/";
const apiUrls = {
  getBooks: "https://zoobooks-api.herokuapp.com/",
  addBook: "https://zoobooks-api.herokuapp.com/add_book/",
  deleteBook: "https://zoobooks-api.herokuapp.com/delete_book/"
};

const apiUrls__LOCAL = {
  getBooks: "http://localhost:4567",
  addBook: "http://localhost:4567/add_book/",
  deleteBook: "http://localhost:4567/delete_book/"
};

loader().setLoading();

const xhr = new XMLHttpRequest();
xhr.open("GET", apiUrls.getBooks);
xhr.send();
xhr.onload = () => {
  const books = JSON.parse(xhr.responseText);
  console.log(books);
  for (let book of books) {
    for (let i in book) {
      book[i] = book[i] || "N/A";
    }
    addBookToDOM(book);
  }
  loader().setLoaded();
}





const addBookToDOM = (data) => {
  const books = document.querySelector("books");
  const bookTemplate = document.getElementById("bookTemplate");
  const book__el = bookTemplate.cloneNode(true);

  const book__el__isbn = book__el.querySelector("[isbn]");
  const book__el__title = book__el.querySelector("[title]");
  const book__el__authors = book__el.querySelector("[authors]");
  const book__el__category = book__el.querySelector("[category]");
  const book__el__thumbnailanchor = book__el.querySelector("[thumbnailanchor]");
  const book__el__thumbnail = book__el.querySelector("[thumbnail]");
  const book__el__description = book__el.querySelector("[description]");

  book__el.removeAttribute("template");

  book__el__thumbnailanchor.setAttribute("href", data.previewLink);

  if (data.google_thumbnail !== "N/A") {
      book__el__thumbnail.style.backgroundImage = `url("${data.google_thumbnail}")`;
  }
  book__el__title.innerHTML = data.title;
  // book__el__isbn.innerHTML = data.isbn;

  book__el__authors.innerHTML = data.authors.map( (item) => item.name).join(", ");

  book__el__category.innerHTML = data.category;
  //
  // if (data.description) {
  //   book__el__description.value = data.description;
  //   book__el__description.rows = data.description.length < 200? "1" : data.description.length < 400? "2" : data.description.length < 600? "3" : "6";
  // } else book__el__description.hidden = true;

  books.appendChild(book__el);
}

// const mockAPI__books = () => {
//   const mock__books = require("../books.mock.json");
//   for (const book of mock__books) {
//     addBookToDOM(book);
//   }
// }
// mockAPI__books();
