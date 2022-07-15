import { showRepeat } from "../functions/functions";

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
    id: "1",
    name: "5A",
  },
  {
    id: "2",
    name: "5Б",
  },
  {
    id: "3",
    name: "6 А",
  },
  {
    id: "4",
    name: "6 Б",
  },
  {
    id: "5",
    name: "7",
  },
  {
    id: "6",
    name: "8А",
  },
  {
    id: "7",
    name: "8Б",
  },
  {
    id: "8",
    name: "9А",
  },
  {
    id: "9",
    name: "9Б",
  },
  {
    id: "10",
    name: "10",
  },
  {
    id: "11",
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

// create timetable for all classes
// example {name:"5A", "Понеділок":[subjects],"Вівторок":...]}
export function showTimeTable() {
  teacher();
  const days = ["Понеділок", "Вівторок", "Середа", "Четвер", "Пятниця"];
  classSchool.map((value: any) =>
    days.map((item: string) => (value[item] = randomSubject()))
  );
  days.map((day) => showRepeat(classSchool, day));
  return classSchool;
}

// create random subject for function show Timetable
function randomSubject() {
  const arr = [];
  for (let i = 1; i <= 7; i++) {
    const rand = Math.floor(Math.random() * (subjects.length - 1));
    const randRoom = Math.floor(Math.random() * (rooms.length - 1));
    const randLess = Math.floor(Math.random() * (7 - 1)) + 1;
    if (i === randLess) {
      arr.push({
        subject: { name: "" },
        id: setTimeout(() => new Date().getMilliseconds(), 1),
      });
    } else {
      arr.push({
        subject: subjects[rand],
        teacher: addTeacher(subjects[rand]),
        room: rooms[randRoom],
        id: setTimeout(() => new Date().getMilliseconds(), 1),
      });
    }
  }
  return arr;
}

// add subjects for teacher
function teacher() {
  teachers.map((value: any) => {
    value.subjects = [];
    // teacher should hav min 1 and max 5 subjects
    const randLess = Math.floor(Math.random() * (5 - 1)) + 1;
    for (let i = 1; i <= randLess; i++) {
      const rand = Math.floor(Math.random() * (subjects.length - 1));
      value.subjects.push(subjects[rand]);
    }
    value.subjects = new Set(value.subjects);
  });
}

// add teacher for subject call in random subject function
function addTeacher(data: { id: number; name: string }) {
  const id = data.id;
  const arr: string[] = [];
  teachers.map((value: Record<any, any>) => {
    // if teacher have this subject
    for (const i of value.subjects) {
      if (id === i.id) {
        arr.push(value.name);
      }
    }
  });
  if (arr.length) {
    return arr;
  } else {
    arr.push(teachers[0].name);
    return arr;
  }
}
