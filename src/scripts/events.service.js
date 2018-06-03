import {headerMenuToggle, headerMenuHide} from './dom.service';
import {alertService} from './alert.service';
import {loader} from './loader.service';
// import {findBookByISBN, updateGoogleApisBookInDOM, showBookInView} from "./scripts/googleApisBookLookup.service";
import {addBookToLibrary} from "./addBookToLibrary.service";
import * as googleApisBookLookup from "./googleApisBookLookup.service";
import {ctrlsService} from "./ctrls.service";
import {validationService} from "./validation.service";

export const eventListeners = (function eventListners () {

  zoobooks().elements()["header"]["ctrls"]["menuToggle"].addEventListener("click", () => {
    headerMenuToggle();
  });

  zoobooks().elements()["books"].addEventListener("click", () => {
    headerMenuHide();
  });

  zoobooks().elements()["forms"]["addBook"]["bookTitle"].addEventListener("keyup", function (e) {
    const validationPattern = /\w{1,}/;
    const vals = [];
    vals.push(this.value);
    vals.push(zoobooks().elements()["forms"]["addBook"]["bookISBN"].value);
    if (validationService().validate(vals, validationPattern)) {
      ctrlsService().enable(zoobooks().elements()["forms"]["addBook"]["ctrls"]["findBookByISBN"]);
      ctrlsService().enable(zoobooks().elements()["forms"]["addBook"]["ctrls"]["addBookToLibrary"]);
    } else {
      ctrlsService().disable(zoobooks().elements()["forms"]["addBook"]["ctrls"]["findBookByISBN"]);
      ctrlsService().disable(zoobooks().elements()["forms"]["addBook"]["ctrls"]["addBookToLibrary"]);
    }
  });

  zoobooks().elements()["forms"]["addBook"]["bookISBN"].addEventListener("keyup", function (e) {
    const validationPattern = /\w{5,}/;
    const vals = [];
    vals.push(this.value);
    vals.push(zoobooks().elements()["forms"]["addBook"]["bookTitle"].value);
    if (validationService().validate(vals, validationPattern)) {
      ctrlsService().enable(zoobooks().elements()["forms"]["addBook"]["ctrls"]["findBookByISBN"]);
      ctrlsService().enable(zoobooks().elements()["forms"]["addBook"]["ctrls"]["addBookToLibrary"]);
    } else {
      ctrlsService().disable(zoobooks().elements()["forms"]["addBook"]["ctrls"]["findBookByISBN"]);
      ctrlsService().disable(zoobooks().elements()["forms"]["addBook"]["ctrls"]["addBookToLibrary"]);
    }
  });

  // ======================
  // [FORM CTRLS]
  // CREATE BOOK
  // ======================
  zoobooks().elements()["forms"]["addBook"]["ctrls"]["createBook"].addEventListener("click", () => {
    const addBookFormElements = Array.from(zoobooks().elements()["forms"]["addBook"]["form"].elements);
    for (const formElement of addBookFormElements) {
      formElement.value = "";
    }
    zoobooks().bookSearchAPI__SET(null);
    googleApisBookLookup.showBookInView();
  });  
  // ======================
  // [FORM CTRLS]
  // ADD BOOK TO LIBRARY
  // ======================
  zoobooks().elements()["forms"]["addBook"]["ctrls"]["addBookToLibrary"].addEventListener("click", () => {
    const bookData = zoobooks().bookSearchAPI().results.length < 1? null : zoobooks().bookSearchAPI().results.items[zoobooks().bookSearchAPI().currentBook];
    if (bookData) {
       bookData.volumeInfo.category = zoobooks().elements()["forms"]["addBook"]["bookCategory"].value;
       addBookToLibrary(bookData);
    } else {
      alertService().raise({key: "NO_DATA"});
    }
  });
  // ======================
  // [FORM CTRLS]
  // CATEGORY DROPDOWN
  // ======================
  for (let cat of zoobooks().categories()) {
    const categoryOpt = document.createElement("OPTION");
    categoryOpt.value = cat;
    categoryOpt.innerHTML = cat;
    zoobooks().elements()["forms"]["addBook"]["bookCategory"].appendChild(categoryOpt);
  }
  // ======================
  // [FORM CTRLS]
  // NEXT BOOK
  // ======================
  zoobooks().elements()["forms"]["addBook"]["ctrls"]["nextBook"].addEventListener("click", () => {
    const currentBookIndex = zoobooks().bookSearchAPI().currentBook;
    googleApisBookLookup.showBookInView(currentBookIndex + 1);
  });
  // ======================
  // [FORM CTRLS]
  // PREVIOUS BOOK
  // ======================
  zoobooks().elements()["forms"]["addBook"]["ctrls"]["previousBook"].addEventListener("click", () => {
    const currentBookIndex = zoobooks().bookSearchAPI().currentBook;
    googleApisBookLookup.showBookInView(currentBookIndex - 1);
  });
  // ======================
  //  [FORM CTRLS]
  //  BOOK LOOKUP
  // ======================
  zoobooks().elements()["forms"]["addBook"]["ctrls"].findBookByISBN.addEventListener("click", function (e) {
    const isbn = zoobooks().elements()["forms"]["addBook"]["bookISBN"].value.replace(/\-/g, "");
    const title = zoobooks().elements()["forms"]["addBook"]["bookTitle"].value;
    const author = zoobooks().elements()["forms"]["addBook"]["bookAuthors"].value;
    if (!isbn && !title) {
      return alertService().raise({key: "ISBN_OR_TITLE_REQUIRED"});
    }
    loader().setLoading();
    googleApisBookLookup.findBookByISBN(isbn, title, author).then ( (result) => {
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
        zoobooks().bookSearchAPI__SET({
          query: {
            isbn: isbn,
            title: title,
            author: author
          },
          results: resultObj,
          currentBook: 0
        });

        zoobooks().importData__SET(bookData);

        console.log("zoobooks().bookSearchAPI()", zoobooks().bookSearchAPI());
        console.log("zoobooks().importData()", zoobooks().importData());

        const bookData = zoobooks().bookSearchAPI().results.items[zoobooks().bookSearchAPI().currentBook];

        googleApisBookLookup.showBookInView();

        alertService().raise({key: "BOOK_SEARCH_SUCCESS"});

        ctrlsService().enable(zoobooks().elements()["forms"]["addBook"]["ctrls"]["addBookToLibrary"]);

        loader().setLoaded();
      }
    }, err => {
      console.log(err);
    });
  });
})();
