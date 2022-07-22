import { lessons } from "../variable/listDays";
import { IData } from "../interfaces/interfaces";

export function showRepeat(data: IData[], day: number) {
  lessons.forEach((less) => {
    let arr = data.map((value) => {
      if (value.timetable[day][less].room) {
        return value.timetable[day][less].room;
      } else if (Array.isArray(value.timetable[day][less])) {
        value.timetable[day][less].map((data: { room: number }) => {
          if (data.room) {
            return data.room;
          }
        });
      }
    });
    arr = arr.filter((item, index) => {
      return arr.indexOf(item) !== index && item !== undefined;
    });
    data.forEach((value) => {
      if (Array.isArray(value.timetable[day][less])) {
        value.timetable[day][less].forEach(
          (value: { repeat?: boolean; room: number }) => {
            if (value.room && arr.includes(value.room)) {
              value.repeat = true;
            }
          }
        );
      } else if (
        value.timetable[day][less].room &&
        arr.includes(value.timetable[day][less].room)
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
  const arr1 = result.source.droppableId.split("=");
  const arr2 = result.destination.droppableId.split("=");
  const classItem = +arr1[0];
  const day1 = +arr1[1];
  const indexFirstElement = +arr1[2];
  const isArr1 = +arr1[3];

  const day2 = +arr2[1];
  const indexSecondElement = +arr2[2];
  const isArr2 = +arr2[3];

  if (day1 === day2) {
    return changeSubject(
      subjects,
      day1,
      indexFirstElement,
      indexSecondElement,
      classItem,
      isArr1,
      isArr2
    );
  } else {
    return changeSubject(
      subjects,
      day1,
      indexFirstElement,
      indexSecondElement,
      classItem,
      isArr1,
      isArr2,
      day2
    );
  }
}

function changeSubject(
  subject: IData[],
  day1: number,
  indexFirstElement: number,
  indexSecondElement: number,
  classItem: number,
  isArr1: number,
  isArr2: number,
  day2?: number
) {
  const json = JSON.stringify(subject);
  const parse = JSON.parse(json);

  if (isNaN(isArr1) && isNaN(isArr2)) {
    const temp = parse[classItem]["timetable"][day1][indexFirstElement];

    parse[classItem]["timetable"][day1][indexFirstElement] =
      parse[classItem]["timetable"][day2 ?? day1][indexSecondElement];
    parse[classItem]["timetable"][day2 ?? day1][indexSecondElement] = temp;

    return changeRepeatAfterDrop(
      parse,
      day1,
      indexFirstElement,
      indexSecondElement,
      day2
    );
  } else
    return handleDropInGroup(
      classItem,
      day1,
      day2,
      indexFirstElement,
      indexSecondElement,
      isArr1,
      isArr2,
      parse
    );
}

export function handleDropInGroup(
  classItem: number,
  day1: number,
  day2: number | undefined,
  indexFirstElement: number,
  indexSecondElement: number,
  isArr1: number,
  isArr2: number,
  subject: IData[]
) {
  if (!isNaN(isArr1) && !isNaN(isArr2)) {
    const temp =
      subject[classItem]["timetable"][day1][indexFirstElement][isArr1];

    subject[classItem]["timetable"][day1][indexFirstElement][isArr1] =
      subject[classItem]["timetable"][day2 ?? day1][indexSecondElement][isArr2];
    subject[classItem]["timetable"][day2 ?? day1][indexSecondElement][isArr2] =
      temp;
  } else if (isNaN(isArr1) && !isNaN(isArr2)) {
    const temp = subject[classItem]["timetable"][day1][indexFirstElement];

    subject[classItem]["timetable"][day1][indexFirstElement] =
      subject[classItem]["timetable"][day2 ?? day1][indexSecondElement][isArr2];
    subject[classItem]["timetable"][day2 ?? day1][indexSecondElement][isArr2] =
      temp;
  } else if (!isNaN(isArr1) && isNaN(isArr2)) {
    const temp =
      subject[classItem]["timetable"][day1][indexFirstElement][isArr1];

    subject[classItem]["timetable"][day1][indexFirstElement][isArr1] =
      subject[classItem]["timetable"][day2 ?? day1][indexSecondElement];
    subject[classItem]["timetable"][day2 ?? day1][indexSecondElement] = temp;
  }
  return changeRepeatAfterDrop(
    subject,
    day1,
    indexFirstElement,
    indexSecondElement,
    day2,
    isArr1,
    isArr2
  );
}

export function changeRepeatAfterDrop(
  subjects: IData[],
  day1: number,
  less1: number,
  less2: number,
  day2?: number,
  isArr1?: number,
  isArr2?: number
) {
  let arr1 = subjects.map((value) => {
    if (Array.isArray(value["timetable"][day1][less1])) {
      return value["timetable"][day1][less1].map(
        (item: { repeat: boolean; room: number }) => {
          if (item.room) {
            item.repeat = false;
            return item.room;
          }
        }
      );
    } else if (value["timetable"][day1][less1]["room"]) {
      value["timetable"][day1][less1]["repeat"] = false;
      return value["timetable"][day1][less1]["room"];
    }
  });
  let arr2 = subjects.map((value) => {
    if (Array.isArray(value["timetable"][day2 ?? day1][less2])) {
      return value["timetable"][day2 ?? day1][less2].map(
        (item: { repeat: boolean; room: number }) => {
          if (item.room) {
            item.repeat = false;
            return item.room;
          }
        }
      );
    } else if (value["timetable"][day2 ?? day1][less2]["room"]) {
      value["timetable"][day2 ?? day1][less2]["repeat"] = false;
      return value["timetable"][day2 ?? day1][less2]["room"];
    }
  });

  arr1 = arr1.flat();
  arr1 = arr1.filter((item, index) => {
    return arr1.indexOf(item) !== index;
  });
  arr2 = arr2.flat();
  arr2 = arr2.filter((item, index) => {
    return arr2.indexOf(item) !== index;
  });

  subjects.forEach((value) => {
    if (Array.isArray(value["timetable"][day1][less1])) {
      value["timetable"][day1][less1].map(
        (item: { room: number; repeat: boolean }) => {
          if (item.room && arr1.includes(item.room)) {
            item.repeat = true;
          }
        }
      );
    } else if (
      value["timetable"][day1][less1].room &&
      arr1.includes(value["timetable"][day1][less1].room)
    ) {
      value["timetable"][day1][less1].repeat = true;
    }
  });

  subjects.forEach((value) => {
    if (Array.isArray(value["timetable"][day2 ?? day1][less2])) {
      value["timetable"][day2 ?? day1][less2].map(
        (item: { room: number; repeat: boolean }) => {
          if (item.room && arr2.includes(item.room)) {
            item.repeat = true;
          }
        }
      );
    } else if (
      value["timetable"][day2 ?? day1][less2].room &&
      arr2.includes(value["timetable"][day2 ?? day1][less2].room)
    ) {
      value["timetable"][day2 ?? day1][less2].repeat = true;
    }
  });

  return subjects;
}
