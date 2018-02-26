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
  addBook: "",
  deleteBook: ""
};


let xhr = new XMLHttpRequest();
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
}









const addBookToDOM = (data) => {
  const books = document.querySelector("books");
  const bookTemplate = document.getElementById("bookTemplate");
  const book__el = bookTemplate.cloneNode(true);
  book__el.removeAttribute("template");
  const book__el__isbn = book__el.querySelector("[isbn]");
  const book__el__title = book__el.querySelector("[title]");
  const book__el__authors = book__el.querySelector("[authors]");
  const book__el__thumbnailanchor = book__el.querySelector("[thumbnailanchor]");
  const book__el__thumbnail = book__el.querySelector("[thumbnail]");
  const book__el__description = book__el.querySelector("[description]");
  book__el__thumbnailanchor.setAttribute("href", data.google_preview_link);
  if (data.google_thumbnail !== "N/A") {
      book__el__thumbnail.style.backgroundImage = `url("${data.google_thumbnail}")`;
  }
  book__el__isbn.innerHTML = `<strong>ISBN:</strong> ${data.isbn}`;
  book__el__title.innerHTML = data.title;
  book__el__authors.innerHTML = data.authors.length > 1? "<strong>Authors:</strong> " : "<strong>Author:</strong> ";
  book__el__authors.innerHTML += data.authors.map( (item) => item.name).join(", ");

  if (data.description) {
    book__el__description.innerHTML = data.description;
  } else book__el__description.hidden = true;


  books.appendChild(book__el);
}

// const mockAPI__books = () => {
//   const mock__books = require("../books.mock.json");
//   for (const book of mock__books) {
//     addBookToDOM(book);
//   }
// }
// mockAPI__books();
