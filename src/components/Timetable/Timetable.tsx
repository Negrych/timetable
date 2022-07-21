import React, { FC } from "react";
import "../../App.css";

import { ITimetable } from "../../interfaces/interfaces";
import OneSubject from "../OneSubject/OneSubject";

interface IProps {
  classItem: {
    name: string;
  };
  oneSubject: ITimetable[];
  day: number;
}

const Timetable: FC<IProps> = ({ classItem, oneSubject, day }) => {
  return (
    <div style={{ height: "500px" }} className={"day"}>
      {classItem &&
        oneSubject.map((value: ITimetable, index: number) => {
          return (
            <OneSubject
              key={index}
              index={index}
              repeat={value.repeat}
              day={day}
              subject={value.subject}
              classItem={classItem}
              id={value.id}
              room={value.room}
            />
          );
        })}
    </div>
  );
};

export default Timetable;
