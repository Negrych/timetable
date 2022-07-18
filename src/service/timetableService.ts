import { showTimeTable } from "../back-end/data";
import { IData } from "../interfaces/interfaces";

export const getData = () => {
  return new Promise<IData[]>(function (resolve) {
    setTimeout(() => resolve(showTimeTable()), 1000);
  });
};
