export const ctrlsService = (function ctrlsService () {

  return function () {
    return {
        disable(el) {
          el.setAttribute("disabled", "disabled");
        },
        enable(el) {
          el.removeAttribute("disabled");
        }
    }
  }
})();
