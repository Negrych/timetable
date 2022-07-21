import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { subjects } from "../../back-end/data";

interface IProps {
  repeat: boolean | undefined;
  index: number;
  className: number;
  day: number;
  id: string;
  subject:
    | number
    | undefined
    | { subject: number; teacher: number; room: number; id: string }[];
  room: number | undefined;
}

const RenderOneSubject: FC<IProps> = ({
  repeat,
  index,
  className,
  day,
  id,
  subject,
  room,
}) => {
  const subjectName = subjects.find((value) => value.id === subject);
  return (
    <div>
      <div
        style={{
          backgroundColor: repeat ? "red" : "",
        }}
        className={"subject-name"}
      >
        <Droppable
          droppableId={`${className + "=" + day + "=" + index}`}
          key={id}
        >
          {(provided, snapshot) => (
            <div
              style={{
                backgroundColor: snapshot.draggingOverWith ? "gold" : "",
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable
                isDragDisabled={!subject}
                key={Number(String(day + index))}
                draggableId={`${id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>{subjectName?.name}</div>
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className={"subject-room"}>{room && room}</div>
    </div>
  );
};

export default RenderOneSubject;
