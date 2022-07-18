import { lessons } from "../variable/listDays";
import { IData } from "../interfaces/interfaces";

export function showRepeat(data: IData[], day: number) {
  lessons.forEach((less) => {
    let arr = data.map((value) => {
      if (value.timetable[day][less].room) {
        return value.timetable[day][less].room?.name;
      }
    });
    arr = arr.filter((item, index) => {
      return arr.indexOf(item) !== index && item !== undefined;
    });
    data.forEach((value) => {
      if (
        value.timetable[day][less].room &&
        arr.includes(value.timetable[day][less].room?.name)
      ) {
        value.timetable[day][less].repeat = true;
      }
    });
  });
}

export function handleDrop(
  result: {
    draggableId: string;
    type: string;
    source: {
      index: number;
      droppableId: string;
    };
    destination: {
      droppableId: string;
      index: number;
    };
  },
  subjects: IData[]
) {
  const classItem = result.source.droppableId.split("=")[2];
  const day1 = +result.source.droppableId.split("=")[0];
  const day2 = +result.destination.droppableId.split("=")[0];
  const idFirstElement = result.source.droppableId.split("=")[3];
  const idSecondElement = result.destination.droppableId.split("=")[3];

  if (day1 === day2) {
    return changeSubject({
      day1,
      idFirstElement,
      idSecondElement,
      classItem,
      subjects,
    });
  } else {
    return changeSubject({
      day1,
      day2,
      idFirstElement,
      idSecondElement,
      classItem,
      subjects,
    });
  }
}

function changeSubject(arg: {
  day1: number;
  idFirstElement: string;
  idSecondElement: string;
  classItem: string;
  subjects: IData[];
  day2?: number;
}) {
  const { day1, day2, idFirstElement, idSecondElement, classItem, subjects } =
    arg;
  const json = JSON.stringify(subjects);
  const newArr = JSON.parse(json);

  const classIndex = newArr.findIndex(
    (item: { name: string }) => item.name === classItem
  );
  const indexFirst = newArr[classIndex]["timetable"][day1].findIndex(
    (item: { id: string }) => item.id === idFirstElement
  );

  const indexSecond = newArr[classIndex]["timetable"][day2 ?? day1].findIndex(
    (item: { id: string }) => item.id === idSecondElement
  );

  const temp = newArr[classIndex]["timetable"][day1][indexFirst];
  newArr[classIndex]["timetable"][day1][indexFirst] =
    newArr[classIndex]["timetable"][day2 ?? day1][indexSecond];
  newArr[classIndex]["timetable"][day2 ?? day1][indexSecond] = temp;
  changeRepeatAfterDrop(newArr, day1, indexFirst, indexSecond, day2);
  return newArr;
}

function changeRepeatAfterDrop(
  subjects: IData[],
  day1: number,
  less1: number,
  less2: number,
  day2?: number
) {
  let arr1 = subjects.map((value) => {
    if (value["timetable"][day1][less1]["room"]) {
      value["timetable"][day1][less1]["repeat"] = false;
      return value["timetable"][day1][less1]["room"]?.name;
    }
  });
  let arr2 = subjects.map((value) => {
    if (value["timetable"][day2 ?? day1][less2]["room"]) {
      value["timetable"][day2 ?? day1][less2]["repeat"] = false;
      return value["timetable"][day2 ?? day1][less2]["room"]?.name;
    }
  });

  arr1 = arr1.filter((item, index) => {
    return arr1.indexOf(item) !== index;
  });

  arr2 = arr2.filter((item, index) => {
    return arr2.indexOf(item) !== index;
  });

  subjects.forEach((value) => {
    if (
      value["timetable"][day1][less1].room &&
      arr1.includes(value["timetable"][day1][less1].room?.name)
    ) {
      value["timetable"][day1][less1].repeat = true;
    }
  });

  subjects.forEach((value) => {
    if (
      value["timetable"][day2 ?? day1][less2].room &&
      arr2.includes(value["timetable"][day2 ?? day1][less2].room?.name)
    ) {
      value["timetable"][day2 ?? day1][less2].repeat = true;
    }
  });
}
