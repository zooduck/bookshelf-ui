import {$http} from "./http.service";
import {alertService} from "./alert.service";
import {addBookToDOM} from "./addBookToDOM.service";
import {headerMenuToggle} from "./dom.service";

export const addBookToLibrary = (bookData) => {
  // validation...
  let formValid = true;
  for (const formControl of Array.from(zoobooks().elements()["forms"]["addBook"]["form"].elements)) {
    console.log("formControl.value", formControl.name, formControl.value);
    if (!formControl.value) {
      alertService().raise({key: `VALUE_REQUIRED_FOR ${formControl.name}`});
      alert(`VALUE_REQUIRED_FOR ${formControl.name}`);
      formValid = false;
      break;
    } else {
      bookData.volumeInfo[formControl.name] = formControl.value;
    }
  }
  if (!formValid) {
    return;
  }
  console.log(bookData.volumeInfo);
  $http("POST", "https://zoobooks-api.herokuapp.com/add_book", JSON.stringify(bookData.volumeInfo)).then( (responseText) => {
    const responseObj = JSON.parse(responseText);
    if (responseObj.title) {
      addBookToDOM(responseObj, {isNew: true});
      headerMenuToggle();
      alertService().raise({key: `${responseObj.title} added to library`});
    } else {
      alertService().raise({key: responseText});
    }
  }, err => {
    console.error(err);
  });
}
