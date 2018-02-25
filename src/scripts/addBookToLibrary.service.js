export const addBookToLibrary = (bookData) => {
  alert(`add title: ${bookData.title} isbn: ${bookData.industryIdentifiers[0].identifier} to library`);
  console.log(bookData);
}
