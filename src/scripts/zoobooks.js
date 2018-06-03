import {Book} from "./models/book.model";
const zoobooks = (function zoobooks () {
  let bookDataForImport = {}
  const categories = [
    "Communication",
    "Agile & Tech",
    "Customer Centricity",
    "Leadership & Culture",
    "Start-up & Entrepreneurial",
    "Work & Wellbeing",
    "Other"
  ];
  const bookSearchAPIDefaults = {
    query: {
      isbn: "",
      title: "",
      author: ""
    },
    results: {
      items: []
    },
    kind: "",
    totalItems: 0
  };
  let bookSearchAPI = Object.assign({}, bookSearchAPIDefaults);
  return function () {
    return {
      categories() {
        return categories;
      },
      bookSearchAPI__SET(data) {
        if (!data) {
          bookSearchAPI = Object.assign({}, bookSearchAPIDefaults);
          return;
        }
        let items = data.results.items.map( (item) => {
          return new Book(item);
        });
        data.results.items = items;
        for (let key in data) {
          bookSearchAPI[key] = data[key];
        }
      },
      bookSearchAPI() {
        return bookSearchAPI;
      },
      importData() {
        return bookDataForImport;
      },
      importData__SET(data) {
        bookDataForImport = data;
      },
      elements() {
        return {
          loader: document.querySelector("#loader"),
          maintenance: document.querySelector('maintenance'),
          header: {
            ctrls: {
              menuToggle: document.querySelector("#ctrl__menuToggle"),
            }
          },
          books: document.querySelector("books"),
          forms: {
            addBook: {
              form: document.querySelector("#form__addBook"),
              bookISBN: document.querySelector("[form__add-book__book-isbn]"),
              bookTitle: document.querySelector("[form__add-book__book-title]"),
              bookAuthors: document.querySelector("[form__add-book__book-authors]"),
              bookThumbnail: document.querySelector("[form__add-book__book-thumbnail]"),
              bookCategory: document.querySelector("[form__add-book__book-category]"),
              ctrls: {
                createBook: document.querySelector("#ctrl__createBook"),
                findBookByISBN: document.querySelector("#ctrl__findBookByISBN"),
                addBookToLibrary: document.querySelector("#ctrl__addBookToLibrary"),
                totalItems: document.querySelector("[form__add-book__ctrls__total-items]"),
                nextBook: document.querySelector("[form__add-book__ctrls__next-book]"),
                previousBook: document.querySelector("[form__add-book__ctrls__previous-book]")
              }
            }
          }
        }
      }
    }
  }
})();
window.zoobooks = zoobooks;
