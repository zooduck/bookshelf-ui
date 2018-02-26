import {$http} from "./http.service.js";
export const findBookByISBN = (isbn, title, author) => {
  const maxResults = 20; // 1 to 40
  const ISBNQueryUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&maxResults=${maxResults}`;
  const titleQueryUrl = `https://www.googleapis.com/books/v1/volumes?q=${title} ${author}&maxResults=${maxResults}`;
  return new Promise( (resolve, reject) => {
    const type = "GET";
    $http(type, ISBNQueryUrl).then( (result) => {
      const resultObj = JSON.parse(result);
      if (!isbn || resultObj.totalItems == 0 && title) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
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
