import {$http} from "./http.service.js";
import {alertService} from "./alert.service.js";

export const findBookByISBN = (isbn, title, author) => {
  const maxResults = 40; // 1 to 40
  const ISBNQueryUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=${maxResults}`;
  const titleQueryUrl = `https://www.googleapis.com/books/v1/volumes?q=${title} ${author}&maxResults=${maxResults}`;
  return new Promise( (resolve, reject) => {
    const type = "GET";
    $http(type, ISBNQueryUrl).then( (result) => {
      const resultObj = JSON.parse(result);
      if (!isbn || resultObj.totalItems == 0 && title) {
        // const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
        $http(type, titleQueryUrl).then( (result) => {
          resolve(result);
        }, err => {
          console.log(err);
        });
      } else resolve(result);
    }, err => {
      reject(err);
      console.log(err);
    });
  });
}

export const updateGoogleApisBookInDOM = (bookData) => {
  const authors = [bookData.volumeInfo.author || bookData.volumeInfo.authors || "N/A"];
  const authorsCSV = authors.toString();
  // =======================================================
  // set category on book by map to pre-defined categories
  // =======================================================
  let category = null;
  if (bookData.volumeInfo.categories) {
    for (let key in zoobooks().categoriesMap()) {
      if (bookData.volumeInfo.categories[0].match(new RegExp(key, "i"))) {
        category = zoobooks().categoriesMap()[key];
        break;
      }
    }
  }

  let thumbnailUrl = "";
  if (bookData.volumeInfo.imageLinks && bookData.volumeInfo.imageLinks.thumbnail) thumbnailUrl = bookData.volumeInfo.imageLinks.thumbnail;
  zoobooks().elements()["forms"]["addBook"]["bookThumbnail"].style.backgroundImage = `url("${thumbnailUrl}")`;
  if (bookData.volumeInfo.industryIdentifiers) zoobooks().elements()["forms"]["addBook"]["bookISBN"].value = bookData.volumeInfo.industryIdentifiers[0].identifier;
  zoobooks().elements()["forms"]["addBook"]["bookTitle"].value = bookData.volumeInfo.title;
  zoobooks().elements()["forms"]["addBook"]["bookAuthors"].value = authorsCSV;
  zoobooks().elements()["forms"]["addBook"]["bookCategory"].value = category || "Other";
  zoobooks().elements()["forms"]["addBook"]["ctrls"]["totalItems"].innerHTML = `${zoobooks().bookSearchAPI().currentBook + 1} of ${zoobooks().bookSearchAPI().results.items.length}`;
};


export const showBookInView = (itemsIndex = 0) => {
  const data = zoobooks().bookSearchAPI();
  if (!data.results.items || itemsIndex < 0 || itemsIndex >= data.results.items.length) {
    return alertService().raise({key: "OUT_OF_RANGE_ERROR"});
  }
  data.currentBook = itemsIndex;
  zoobooks().bookSearchAPI__SET(data);
  // alert(zoobooks().bookSearchAPI().currentBook);
  // alert(itemsIndex);
  const bookData = zoobooks().bookSearchAPI().results.items[itemsIndex];
  updateGoogleApisBookInDOM(bookData);
};
