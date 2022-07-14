import { lessons } from "../variable/listDays";

export function showRepeat(data, day) {
  let arr = [];
  lessons.forEach((less) => {
    arr = [];
    data.map(
      (value) => value[day][less].room && arr.push(value[day][less].room.name)
    );
    arr = arr.filter((item, index) => {
      return arr.indexOf(item) !== index;
    });
    data.map((value) => {
      if (value[day][less].room && arr.includes(value[day][less].room.name)) {
        value[day][less].repeat = true;
      }
    });
  });
}
