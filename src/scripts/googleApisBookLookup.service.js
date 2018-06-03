import {$http} from "./http.service.js";
import {alertService} from "./alert.service.js";

export const findBookByISBN = (isbn, title, author, options = {maxResults: 40}) => {
  const maxResults = options.maxResults || 40; // 1 to 40
  const ISBNQueryUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=${maxResults}`;
  const titleQueryUrl = `https://www.googleapis.com/books/v1/volumes?q=${title} ${author}&maxResults=${maxResults}`;
  return new Promise( (resolve, reject) => {
    const type = "GET";
    $http(type, ISBNQueryUrl).then( (result) => {
      const resultObj = JSON.parse(result);
      if (!isbn || resultObj.totalItems == 0 && title) {
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

export const showBookInView = (itemsIndex = 0) => {
  const data = zoobooks().bookSearchAPI();

  console.log('data', data);

  if (!data.results.items || data.results.items.length === 0) {
    zoobooks().elements()["forms"]["addBook"]["ctrls"]["totalItems"].innerHTML = "0 of 0";
    zoobooks().elements()["forms"]["addBook"]["bookThumbnail"].removeAttribute("src");
  }

  if (!data.results.items || itemsIndex < 0 || itemsIndex >= data.results.items.length) {
    return alertService().raise({key: "OUT_OF_RANGE_ERROR"});
  }

  data.currentBook = itemsIndex;

  zoobooks().bookSearchAPI__SET(data);

  const bookData = zoobooks().bookSearchAPI().results.items[itemsIndex];
  const authors = [bookData.volumeInfo.author || bookData.volumeInfo.authors || ""];
  const authorsCSV = authors.toString();
  const thumbnailUrl = bookData.volumeInfo.google_thumbnail;

  if (thumbnailUrl) {
    zoobooks().elements()["forms"]["addBook"]["bookThumbnail"].classList.remove("missing");
  } else zoobooks().elements()["forms"]["addBook"]["bookThumbnail"].classList.add("missing");

  // zoobooks().elements()["forms"]["addBook"]["bookThumbnail"].style.backgroundImage = `url("${thumbnailUrl}")`;
  zoobooks().elements()["forms"]["addBook"]["bookThumbnail"].setAttribute("src", thumbnailUrl);
  zoobooks().elements()["forms"]["addBook"]["bookISBN"].value = bookData.volumeInfo.isbn;
  zoobooks().elements()["forms"]["addBook"]["bookTitle"].value = bookData.volumeInfo.title;
  zoobooks().elements()["forms"]["addBook"]["bookAuthors"].value = authorsCSV;
  zoobooks().elements()["forms"]["addBook"]["ctrls"]["totalItems"].innerHTML = `${zoobooks().bookSearchAPI().currentBook + 1} of ${zoobooks().bookSearchAPI().results.items.length}`;
};
