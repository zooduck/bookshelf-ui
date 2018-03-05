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
  const categoriesMap = {
    "communication": "Communication",
    "agile": "Agile & Tech",
    "tech": "Agile & Tech",
    "computers": "Agile & Tech",
    "customer": "Customer Centricity",
    "leadership": "Leadership & Culture",
    "culture": "Leadership & Culture",
    "startup": "Start-up & Entrepreneurial",
    "start-up": "Start-up & Entrepreneurial",
    "entrepreneur": "Start-up & Entrepreneurial",
    "work":  "Work & Wellbeing",
    "wellbeing": "Work & Wellbeing",
    "other": "Other",
    "fiction": "Other"
  };
  const bookSearchAPI = {
    query: {
      isbn: "",
      title: "",
      author: ""
    },
    results: []
  }
  return function () {
    return {
      categories() {
        return categories;
      },
      categoriesMap() {
        return categoriesMap;
      },
      bookSearchAPI__SET(data) {
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
          loader: document.getElementById("loader"),
          forms: {
            addBook: {
              form: document.getElementById("form__addBook"),
              bookISBN: document.querySelector("[form__add-book__book-isbn]"),
              bookTitle: document.querySelector("[form__add-book__book-title]"),
              bookAuthors: document.querySelector("[form__add-book__book-authors]"),
              bookThumbnail: document.querySelector("[form__add-book__book-thumbnail]"),
              bookCategory: document.querySelector("[form__add-book__book-category]"),
              ctrls: {
                findBookByISBN: document.getElementById("ctrl__findBookByISBN"),
                addBookToLibrary: document.getElementById("ctrl__addBookToLibrary"),
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
