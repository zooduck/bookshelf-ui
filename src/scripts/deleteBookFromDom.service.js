export const deleteBookFromDOM = (isbn) => {
  const el = document.getElementById(isbn);
  if (el) el.parentNode.removeChild(el);
}
