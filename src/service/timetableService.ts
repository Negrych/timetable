import { showTimeTable } from "../back-end/data";

export const getData = () => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(showTimeTable()), 1000);
  });
};
