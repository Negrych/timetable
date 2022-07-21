import { days } from "../variable/listDays";
import { showRepeat } from "../functions/functions";
import { v4 } from "uuid";

export const teachers = [
  { id: 1, name: "Негрич П  М" },

  { id: 2, name: "Мілевська С Я" },

  { id: 3, name: "Перцович Г М" },

  { id: 4, name: "Геник Г В" },

  { id: 5, name: "Сулятицький С С" },

  { id: 6, name: "Геник Г А" },

  { id: 7, name: "Дрогомирецька М М" },

  { id: 8, name: "Арсенич М Я" },

  { id: 9, name: "Тарица М М" },

  { id: 10, name: "Кузич Л М" },

  { id: 11, name: "Склепович Н С" },

  { id: 12, name: "Мілевська Д С" },

  { id: 13, name: "Рижук І Д" },

  { id: 14, name: "Уруський М А" },
];

export const subjects = [
  { id: 1, name: "Фізика" },
  { id: 2, name: "Геометрія" },
  { id: 3, name: "Алгебра" },
  { id: 4, name: "Біологія" },
  { id: 5, name: "Географія" },
  { id: 6, name: "Хімія" },
  { id: 7, name: "Історія України" },
  { id: 8, name: "Всесвітня Історія" },
  { id: 9, name: "Математика" },
  { id: 10, name: "Інформатика" },
  { id: 11, name: "Українська мова" },
  { id: 12, name: "Українська література" },
  { id: 13, name: "Світова література" },
  { id: 14, name: "Англійська мова" },
  { id: 15, name: "Німецька мова" },
  { id: 16, name: "Фізкультура" },
  { id: 17, name: "Трудове навчання" },
  { id: 18, name: "Образотворче мистецтво" },
  { id: 19, name: "Мистецтво" },
  { id: 20, name: "Музика" },
];

export const classSchool = [
  {
    id: 1,
    name: "5A",
  },
  {
    id: 2,
    name: "5Б",
  },
  {
    id: 3,
    name: "6 А",
  },
  {
    id: 4,
    name: "6 Б",
  },
  {
    id: 5,
    name: "7",
  },
  {
    id: 6,
    name: "8А",
  },
  {
    id: 7,
    name: "8Б",
  },
  {
    id: 8,
    name: "9А",
  },
  {
    id: 9,
    name: "9Б",
  },
  {
    id: 10,
    name: "10",
  },
  {
    id: 11,
    name: "11",
  },
];

export const rooms = [
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 4 },
  { name: 5 },
  { name: 6 },
  { name: 7 },
  { name: 8 },
  { name: 9 },
  { name: 10 },
  { name: 11 },
  { name: 12 },
  { name: 13 },
  { name: 14 },
  { name: 15 },
  { name: 16 },
  { name: 17 },
  { name: 18 },
  { name: 19 },
  { name: 20 },
  { name: 21 },
  { name: 22 },
  { name: 23 },
  { name: 24 },
  { name: 25 },
  { name: 26 },
  { name: 27 },
  { name: 28 },
  { name: 29 },
  { name: 30 },
];

const teachersListWithSubject = teacher();

export function showTimeTable() {
  const timeTable = classSchool.map((value: { id: number; name: string }) => {
    return {
      ...value,
      timetable: days.map(() => randomSubject(subjects)),
    };
  });
  days.forEach((value, index) => showRepeat(timeTable, index));
  return timeTable;
}

function randomSubject(subjects: { id: number; name: string }[]) {
  const arr = [];
  for (let i = 1; i <= 7; i++) {
    const rand = Math.floor(Math.random() * (subjects.length - 1));
    const randRoom = Math.floor(Math.random() * (rooms.length - 1));
    const randLess = Math.floor(Math.random() * (7 - 1)) + 1;
    if (i === randLess) {
      arr.push({
        subject: undefined,
        id: v4(),
      });
    } else {
      arr.push({
        subject: subjects[rand].id,
        teacher: addTeacher(subjects[rand], teachersListWithSubject),
        room: rooms[randRoom].name,
        id: v4(),
      });
    }
  }
  return arr;
}

// add subjects for teacher
function teacher() {
  return teachers.map((value) => {
    return { ...value, subjectsTeacher: createSubjectForTeacher(subjects) };
  });
}

function createSubjectForTeacher(subjects: { id: number; name: string }[]) {
  const arr: { id: number; name: string }[] = [];
  // teacher should have min 1 and max 5 subjects
  const randLess = Math.floor(Math.random() * (5 - 1)) + 1;
  for (let i = 1; i <= randLess; i++) {
    const rand = Math.floor(Math.random() * (subjects.length - 1));
    arr.push(subjects[rand]);
  }
  return arr.filter((value, index) => index === arr.indexOf(value));
}

// add teacher for subject call in random subject function
function addTeacher(
  data: { id: number },
  teachersList: {
    id: number;
    name: string;
    subjectsTeacher: { id: number; name: string }[];
  }[]
) {
  const id = data.id;
  let arr = teachersList.map(
    (value: {
      id: number;
      name: string;
      subjectsTeacher: { id: number; name: string }[];
    }) => {
      // if teacher have this subject
      for (const i of value.subjectsTeacher) {
        if (id === i.id) {
          return value.id;
        }
      }
    }
  );
  arr = arr.filter((value: number | undefined) => value !== undefined);
  if (arr.length) {
    return arr[0];
  } else {
    return teachers[0].id;
  }
}
