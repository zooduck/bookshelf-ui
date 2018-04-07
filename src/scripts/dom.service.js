export const buttonHiddenStateToggle = (el) => {
  el.classList.toggle("hidden");
};
export const headerMenuToggle = () => {
  zoobooks().elements()["maintenance"].classList.toggle("active");
};
export const headerMenuHide = () => {
  zoobooks().elements()["maintenance"].classList.remove("active");
};
