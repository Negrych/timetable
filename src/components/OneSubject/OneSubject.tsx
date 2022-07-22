import React, { FC, memo } from "react";
import RenderOneSubject from "../RenderOneSubject/RenderOneSubject";
import RenderGroup from "../RenderGroup/RenderGroup";

interface IProps {
  index: number;
  repeat: boolean | undefined;
  day: number;
  id: string;
  room: number | undefined;
  subject:
    | number
    | undefined
    | {
        index: number;
        repeat: boolean;
        day: number;
        id: string;
        subject: number;
        room: number;
        className: number;
      }[];
  className: number;
}
const OneSubject: FC<IProps> = ({
  index,
  repeat,
  day,
  id,
  subject,
  room,
  className,
}) => {
  return (
    <>
      {!Array.isArray(subject) && (
        <RenderOneSubject
          repeat={repeat}
          index={index}
          day={day}
          id={id}
          subject={subject}
          room={room}
          className={className}
          key={index}
        />
      )}
      {Array.isArray(subject) && (
        <RenderGroup
          key={index}
          subject={subject}
          day={day}
          className={className}
          index={index}
        />
      )}
    </>
  );
};

export default memo(OneSubject);
