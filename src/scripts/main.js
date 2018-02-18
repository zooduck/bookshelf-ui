let xhr = new XMLHttpRequest();
xhr.open("GET", "http://dbe20230.ngrok.io/bookshelf/");
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
  book__el__isbn.innerHTML = `ISBN: ${data.isbn}`;
  book__el__title.innerHTML = data.title;
  book__el__authors.innerHTML = data.authors.map( (item) => item.name).join(",");
  book__el__description.innerHTML = data.description;
  books.appendChild(book__el);
}
