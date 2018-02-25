import "./styles/main.scss";
import "./scripts/zoobooks.js";

// import {form__addBook, form__addBook__bookISBN, button__findBookByISBN, form__addBook__bookTitle, form__addBook__bookAuthors} from "./scripts/dom.service";
import {findBookByISBN} from "./scripts/bookLookup.service.js";
import {addBookToLibrary} from "./scripts/addBookToLibrary.service.js";
import {buttonHiddenStateToggle}  from "./scripts/dom.service.js";
import {loader} from "./scripts/loader.service.js";
import {alertService} from "./scripts/alert.service.js";

import "./scripts/main";




// ======================
//  [FORM CTRLS]
//  ADD BOOK TO LIBRARY
// ======================

zoobooks().elements()["forms"]["addBook"]["ctrls"].findBookByISBN.addEventListener("click", function (e) {
  const isbn = zoobooks().elements()["forms"]["addBook"]["keys"]["bookISBN"].value.replace(/\-/g, "");
  const title = zoobooks().elements()["forms"]["addBook"]["keys"]["bookTitle"].value;
  const author = zoobooks().elements()["forms"]["addBook"]["keys"]["bookAuthors"].value;
  if (!isbn && !title) {
    alertService().raise({key: "ISBN_OR_TITLE_REQUIRED"});
  }
  loader().setLoading();
  findBookByISBN(isbn, title, author).then ( (result) => {
    const resultObj = JSON.parse(result);
    if (resultObj.error || resultObj.totalItems == 0) {
      // ======
      // FAIL
      // ======
      alertService().raise({key: "BOOK_SEARCH_ERROR"});
      loader().setLoaded();
    } else {
      // =========
      // SUCCESS
      // =========
      const titlePattern = new RegExp(`${title}`, "i");
      const authorPattern = new RegExp(`${author}`, "i");
      let titleMatches = resultObj.items.reverse().filter( (item) => {
        return item.volumeInfo.title.match(titlePattern) && item.volumeInfo.authors && item.volumeInfo.authors.find( (item) => item.match(authorPattern));
      });
      const novelMatch = titleMatches.find( (item) => item.volumeInfo.subtitle && item.volumeInfo.subtitle.match(/a novel/i));
      titleMatches = titleMatches.filter( (item) => item.volumeInfo.imageLinks && item.volumeInfo.industryIdentifiers);

      const bookData = novelMatch || titleMatches[0] || resultObj.items[0];
      const authorsCSV = [bookData.volumeInfo.author || bookData.volumeInfo.authors.toString()];

      zoobooks().bookSearchAPI__SET({
        query: {
          isbn: isbn,
          title: title,
          author: author
        },
        results: resultObj,
        bookData: bookData
      });

      zoobooks().importData__SET(bookData);

      console.log("zoobooks().bookSearchAPI()", zoobooks().bookSearchAPI());
      console.log("zoobooks().importData()", zoobooks().importData());

      zoobooks().elements()["forms"]["addBook"]["keys"]["bookThumbnail"].style.backgroundImage = `url("${bookData.volumeInfo.imageLinks.thumbnail}")`;
      zoobooks().elements()["forms"]["addBook"]["keys"]["bookISBN"].value = bookData.volumeInfo.industryIdentifiers[0].identifier;
      zoobooks().elements()["forms"]["addBook"]["keys"]["bookTitle"].value = bookData.volumeInfo.title;
      zoobooks().elements()["forms"]["addBook"]["keys"]["bookAuthors"].value = authorsCSV;

      buttonHiddenStateToggle(this);
      buttonHiddenStateToggle(zoobooks().elements()["forms"]["addBook"]["ctrls"]["addBookToLibrary"]);

      alertService().raise({key: "BOOK_SEARCH_SUCCESS"});
      loader().setLoaded();
    }
  }, err => {
    console.log(err);
  });
});


zoobooks().elements()["forms"]["addBook"]["ctrls"]["addBookToLibrary"].addEventListener("click", function (e) {
  addBookToLibrary(zoobooks().importData());
});
