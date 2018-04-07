import "./styles/main.scss";
import "./scripts/zoobooks";

// import {form__addBook, form__addBook__bookISBN, button__findBookByISBN, form__addBook__bookTitle, form__addBook__bookAuthors} from "./scripts/dom.service";
// import {findBookByISBN, updateGoogleApisBookInDOM, showBookInView} from "./scripts/googleApisBookLookup.service";
import {addBookToLibrary} from "./scripts/addBookToLibrary.service";
import {buttonHiddenStateToggle}  from "./scripts/dom.service";
import {loader} from "./scripts/loader.service";
import {alertService} from "./scripts/alert.service";
import {eventListeners} from "./scripts/events.service";

import "./scripts/main";




// const updateGoogleApisBookInDOM = (bookData) => {
//   const authorsCSV = [bookData.volumeInfo.author || bookData.volumeInfo.authors.toString()];
//
//   let category = null;
//   if (bookData.volumeInfo.categories) {
//     for (let key in zoobooks().categoriesMap()) {
//       if (bookData.volumeInfo.categories[0].match(new RegExp(key, "i"))) {
//         category = zoobooks().categoriesMap()[key];
//         break;
//       }
//     }
//   }
//
//   zoobooks().elements()["forms"]["addBook"]["bookThumbnail"].style.backgroundImage = `url("${bookData.volumeInfo.imageLinks.thumbnail}")`;
//   zoobooks().elements()["forms"]["addBook"]["bookISBN"].value = bookData.volumeInfo.industryIdentifiers[0].identifier;
//   zoobooks().elements()["forms"]["addBook"]["bookTitle"].value = bookData.volumeInfo.title;
//   zoobooks().elements()["forms"]["addBook"]["bookAuthors"].value = authorsCSV;
//   zoobooks().elements()["forms"]["addBook"]["bookCategory"].value = category || "Other";
//
//   zoobooks().elements()["forms"]["addBook"]["ctrls"]["totalItems"].innerHTML = `${zoobooks().bookSearchAPI().currentBook + 1} of ${zoobooks().bookSearchAPI().results.items.length}`;
// };
