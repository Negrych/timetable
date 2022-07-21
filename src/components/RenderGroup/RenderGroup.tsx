import React, { FC } from "react";
import RenderOneSubject from "../RenderOneSubject/RenderOneSubject";

interface IProps {
  subject: {
    index: number;
    repeat: boolean;
    day: number;
    id: string;
    subject: number;
    room: number;
    className: number;
  }[];
}

const RenderGroup: FC<IProps> = ({ subject }) => {
  return (
    <div className={"groupWrap"} style={{ display: "flex" }}>
      <RenderOneSubject
        repeat={subject[0].repeat}
        index={new Date().getMilliseconds()}
        className={subject[0].className}
        day={subject[0].day}
        id={subject[0].id}
        subject={subject[0].subject}
        room={subject[0].subject}
      />
      <div>/</div>
      <RenderOneSubject
        repeat={subject[1].repeat}
        index={new Date().getMilliseconds() + 1}
        className={subject[1].className}
        day={subject[1].day}
        id={subject[1].id}
        subject={subject[1].subject}
        room={subject[1].subject}
      />
    </div>
  );
};

export default RenderGroup;
