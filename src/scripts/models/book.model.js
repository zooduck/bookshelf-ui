export function Book(data) {
  let _this = this;
  for (let i in data) {
    _this[i] = data[i];
  }
  try {
    const isbns = Array.from(this.volumeInfo.industryIdentifiers);
    const isbn13 = isbns.find( (item) => item.type == "ISBN_13");
    const isbn = isbn13? isbn13.identifier : isbns[0].identifier;
    _this.volumeInfo.isbn = isbn;
  } catch (e) {
    _this.volumeInfo.isbn = "";
  }

  try {
    _this.volumeInfo.google_thumbnail = _this.volumeInfo.imageLinks.thumbnail;
  } catch (e) {
    _this.volumeInfo.google_thumbnail = "";
  }
}
