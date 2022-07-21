export interface IData {
  id: number;
  name: string;
  timetable: Array<ITimetable[]> | any;
}

export interface ITimetable {
  id: string;
  subject: number | undefined;
  teacher?: number | undefined;
  room?: number;
  repeat?: boolean;
}
