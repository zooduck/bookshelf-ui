import {$http} from "./http.service";
export const deleteBookFromLibrary = function deleteBookFromLibrary (isbn) {
  $http("POST", `https://zoobooks-api.herokuapp.com/delete_book/${isbn}/`).then( (responseText) => {
    return alert(`TODO! DELETE BOOK WITH ISBN: ${isbn} FROM LIBRARY!`);
    const responseObj = JSON.parse(responseText);
    console.log("responseObj", responseObj);
  }, err => {
    console.error(err);
  });
}
