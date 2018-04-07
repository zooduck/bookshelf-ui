export const validationService = (function validationService () {

  return function () {
    return {
      validate(vals, validationPattern) {
        for (const val of vals) {
          if (val.match(validationPattern)) {
            return true;
          }
        }
        return false;
      }
    }
  }
})();
