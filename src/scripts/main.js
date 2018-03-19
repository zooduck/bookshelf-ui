import {loader} from "./loader.service.js";
import {addBookToDOM} from "./addBookToDOM.service";

if (location.search.match(/dev\=1/)) {
  const devOnlyEls = document.querySelectorAll("[developeronly]");
  for (let el of devOnlyEls) {
    el.removeAttribute("developeronly");
  }
}

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

// const mockAPI__books = () => {
//   const mock__books = require("../books.mock.json");
//   for (const book of mock__books) {
//     addBookToDOM(book);
//   }
// }
// mockAPI__books();
