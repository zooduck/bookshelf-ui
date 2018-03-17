export const addBookToLibrary = (bookData) => {
  //alert(`add title: ${bookData.title} isbn: ${bookData.industryIdentifiers[0].identifier} to library`);
  // alert(`TODO!\nADD ${bookData.volumeInfo.title} TO LIBRARY`);
  const xhr = new XMLHttpRequest();
  console.log("bookData",bookData.volumeInfo);
  xhr.open("POST", "https://zoobooks-api.herokuapp.com/add_book");
  xhr.send(JSON.stringify(bookData.volumeInfo));
  xhr.onload = function () {
    alert(`${bookData.volumeInfo.title} added to library`);
    console.log(xhr.responseText);
  }
  xhr.onerror = function (e) {
    console.error(e)
  }
}
