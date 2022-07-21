export interface IData {
  id: number;
  name: string;
  timetable: Array<ITimetable[]>;
}

export interface ITimetable {
  id: string;
  subject: number | undefined;
  teacher?: number | undefined;
  room?: number;
  repeat?: boolean;
}
