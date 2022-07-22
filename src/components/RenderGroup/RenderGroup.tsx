import React, { FC } from "react";
import RenderOneSubject from "../RenderOneSubject/RenderOneSubject";

interface IProps {
  index: number;
  day: number;
  className: number;
  subject: {
    repeat: boolean;
    id: string;
    subject: number;
    room: number;
  }[];
}

const RenderGroup: FC<IProps> = ({ subject, className, day, index }) => {
  return (
    <div className={"groupWrap"} style={{ display: "flex" }}>
      <RenderOneSubject
        indexInArr={0}
        repeat={subject[0].repeat}
        index={index}
        className={className}
        day={day}
        id={subject[0].id}
        randomIndex={new Date().getMilliseconds()}
        subject={subject[0].subject}
        room={subject[0].room}
      />
      <div>/</div>
      <RenderOneSubject
        indexInArr={1}
        repeat={subject[1].repeat}
        index={index}
        className={className}
        day={day}
        id={subject[1].id}
        subject={subject[1].subject}
        room={subject[1].room}
        randomIndex={new Date().getMilliseconds() + 1}
      />
    </div>
  );
};

export default RenderGroup;
