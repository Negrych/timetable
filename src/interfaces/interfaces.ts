export interface IData {
  id: string;
  name: string;
  timetable: Array<ITimetable[]>;
}

export interface ITimetable {
  id: string;
  subject: {
    name: string | undefined;
  };
  teacher?: (string | undefined)[];
  room?: {
    name: number;
  };
  repeat?: boolean;
}
