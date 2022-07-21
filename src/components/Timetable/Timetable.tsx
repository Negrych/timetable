import React, { FC, memo } from "react";
import "../../App.css";

import { ITimetable } from "../../interfaces/interfaces";
import OneSubject from "../OneSubject/OneSubject";

interface IProps {
  oneSubject: ITimetable[];
  day: number;
  className: number;
}

const Timetable: FC<IProps> = ({ oneSubject, day, className }) => {
  return (
    <div style={{ height: "500px" }} className={"day"}>
      {oneSubject &&
        oneSubject.map((value: ITimetable, index: number) => {
          return (
            <OneSubject
              key={index}
              index={index}
              repeat={value.repeat}
              day={day}
              subject={Array.isArray(value) ? value : value.subject}
              id={value.id}
              room={value.room}
              className={className}
            />
          );
        })}
    </div>
  );
};

export default memo(Timetable);
