export const addBookToDOM = (data, options = {isNew: false}) => {
  const books = document.querySelector("books");
  const bookTemplate = document.querySelector("#bookTemplate");
  const book__el = bookTemplate.cloneNode(true);

  const book__el__isbn = book__el.querySelector("[isbn]");
  const book__el__title = book__el.querySelector("[title]");
  const book__el__authors = book__el.querySelector("[authors]");
  const book__el__category = book__el.querySelector("[category]");
  const book__el__thumbnailanchor = book__el.querySelector("[thumbnailanchor]");
  const book__el__thumbnail = book__el.querySelector("[thumbnail]");
  const book__el__description = book__el.querySelector("[description]");

  book__el.removeAttribute("template");

  if (data.google_thumbnail != "N/A") {
      book__el__thumbnail.setAttribute("src", data.google_thumbnail);
      // book__el__thumbnail.style.backgroundImage = `url("${data.google_thumbnail}")`;
  } else book__el__thumbnail.classList.add("missing");

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

  if (options.isNew) {
    book__el.classList.add("new");
    window.scroll(0, document.body.scrollHeight);
  }
}
