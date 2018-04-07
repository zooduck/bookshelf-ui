import {$http} from "./http.service";
import {alertService} from "./alert.service";
import {deleteBookFromDOM} from "./deleteBookFromDom.service.js";
export const deleteBookFromLibrary = function deleteBookFromLibrary (isbn) {
  $http("POST", `https://zoobooks-api.herokuapp.com/delete_book/${isbn}`).then( (responseText) => {
    // remove book from DOM
    deleteBookFromDOM(isbn);
  }, err => {
    alertService().raise({key: err.status});
  });
}
