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

export function changeSubject(arg) {
  const { day1, idFirstElement, idSecondElement, classItem, subjects, day2 } =
    arg;

  const json = JSON.stringify(subjects);
  const newArr = JSON.parse(json);

  const classIndex = newArr.findIndex((item) => item.name === classItem);
  const indexFirst = newArr[classIndex][day1].findIndex(
    (item) => item.id === idFirstElement
  );

  const indexSecond = newArr[classIndex][day2 ? day2 : day1].findIndex(
    (item) => item.id === idSecondElement
  );

  const temp = newArr[classIndex][day1][indexFirst];
  newArr[classIndex][day1][indexFirst] =
    newArr[classIndex][day2 ? day2 : day1][indexSecond];
  newArr[classIndex][day2 ? day2 : day1][indexSecond] = temp;
  changeRepeatAfterDrop(newArr, day1, indexFirst, day2, indexSecond);
  return newArr;
}

function changeRepeatAfterDrop(subjects, day1, less1, day2, less2) {
  let arr1 = [];
  let arr2 = [];
  subjects.map((value) => {
    if (value[day1][less1]["room"]) {
      value[day1][less1]["repeat"] = false;
      arr1.push(value[day1][less1]["room"]["name"]);
    }
  });
  subjects.map((value) => {
    if (value[day2 ? day2 : day1][less2]["room"]) {
      value[day2 ? day2 : day1][less2]["repeat"] = false;
      arr2.push(value[day2 ? day2 : day1][less2]["room"]["name"]);
    }
  });

  arr1 = arr1.filter((item, index) => {
    return arr1.indexOf(item) !== index;
  });

  arr2 = arr2.filter((item, index) => {
    return arr2.indexOf(item) !== index;
  });
  subjects.map((value) => {
    if (
      value[day1][less1].room &&
      arr1.includes(value[day1][less1].room.name)
    ) {
      value[day1][less1].repeat = true;
    }
  });

  subjects.map((value) => {
    if (
      value[day2 ? day2 : day1][less2].room &&
      arr2.includes(value[day2 ? day2 : day1][less2].room.name)
    ) {
      value[day2 ? day2 : day1][less2].repeat = true;
    }
  });
}
