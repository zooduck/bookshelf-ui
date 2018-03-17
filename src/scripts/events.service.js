import {ctrl__headerMenuToggle} from './ctrls.service.js';
export const eventListeners = function () {
  zoobooks().elements()["header"]["ctrls"]["menuToggle"].addEventListener("click", () => {
    ctrl__headerMenuToggle();
  });
}
