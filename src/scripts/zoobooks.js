const zoobooks = (function zoobooks () {
  let bookDataForImport = {}
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
              keys: {
                bookISBN: document.querySelector("[form__add-book__book-isbn]"),
                bookTitle: document.querySelector("[form__add-book__book-title]"),
                bookAuthors: document.querySelector("[form__add-book__book-authors]"),
                bookThumbnail: document.querySelector("[form__add-book__book-thumbnail]")
              },
              ctrls: {
                findBookByISBN: document.getElementById("ctrl__findBookByISBN"),
                addBookToLibrary: document.getElementById("ctrl__addBookToLibrary"),
              }
            }
          }
        }
      }
    }
  }
})();
window.zoobooks = zoobooks;
