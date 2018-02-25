export const alertService = (function alertService () {
  return function () {
    return {
      raise(data = {key: "GENERIC_ERROR", msg: ""}) {
        // alert(data.key);
        console.warn(`ALERT => ${data.key}`);
      }
    }
  }
})();
