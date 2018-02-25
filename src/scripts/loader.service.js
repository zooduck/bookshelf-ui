export const loader = (function loader () {
  return function () {
    return {
      setLoading() {
        zoobooks().elements().loader.removeAttribute("hidden");
      },
      setLoaded() {
        zoobooks().elements().loader.setAttribute("hidden", "hidden");
      }
    }
  }
})();
