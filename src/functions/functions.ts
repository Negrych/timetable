import { lessons } from "../variable/listDays";
import { IData } from "../interfaces/interfaces";

export function showRepeat(data: IData[], day: number) {
  lessons.forEach((less) => {
    let arr = data.map((value) => {
      if (value.timetable[day][less].room) {
        return value.timetable[day][less].room;
      }
    });
    arr = arr.filter((item, index) => {
      return arr.indexOf(item) !== index && item !== undefined;
    });
    data.forEach((value) => {
      if (
        value.timetable[day][less].room &&
        arr.includes(value.timetable[day][less].room)
      ) {
        value.timetable[day][less].repeat = true;
      }
    });
  });
}

export function handleDrop(result: {
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
}) {
  const arr1 = result.source.droppableId.split("=");
  const arr2 = result.destination.droppableId.split("=");

  const classItem = +arr1[0];
  const day1 = +arr1[1];
  const indexFirstElement = +arr1[2];

  const day2 = +arr2[1];
  const indexSecondElement = +arr2[2];

  if (day1 === day2) {
    return {
      day1,
      indexFirstElement,
      indexSecondElement,
      classItem,
    };
  } else {
    return {
      day1,
      day2,
      indexFirstElement,
      indexSecondElement,
      classItem,
    };
  }
}

export function changeRepeatAfterDrop(
  subjects: IData[],
  day1: number,
  less1: number,
  less2: number,
  day2?: number
) {
  let arr1 = subjects.map((value) => {
    if (value["timetable"][day1][less1]["room"]) {
      value["timetable"][day1][less1]["repeat"] = false;
      return value["timetable"][day1][less1]["room"];
    }
  });
  let arr2 = subjects.map((value) => {
    if (value["timetable"][day2 ?? day1][less2]["room"]) {
      value["timetable"][day2 ?? day1][less2]["repeat"] = false;
      return value["timetable"][day2 ?? day1][less2]["room"];
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
      arr1.includes(value["timetable"][day1][less1].room)
    ) {
      value["timetable"][day1][less1].repeat = true;
    }
  });

  subjects.forEach((value) => {
    if (
      value["timetable"][day2 ?? day1][less2].room &&
      arr2.includes(value["timetable"][day2 ?? day1][less2].room)
    ) {
      value["timetable"][day2 ?? day1][less2].repeat = true;
    }
  });
  return subjects;
}
