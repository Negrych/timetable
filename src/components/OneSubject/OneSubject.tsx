import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { subjects } from "../../back-end/data";

interface IProps {
  classItem: {
    name: string;
  };
  index: number;
  repeat: boolean | undefined;
  day: number;
  id: string;
  room: number | undefined;
  subject: number | undefined;
}
const OneSubject: FC<IProps> = ({
  index,
  repeat,
  day,
  classItem,
  id,
  subject,
  room,
}) => {
  const subjectName = subjects.find((value) => value.id === subject);

  return (
    <div key={index}>
      <div
        style={{
          backgroundColor: repeat ? "red" : "",
        }}
        className={"subject-name"}
      >
        <Droppable
          droppableId={`${day + "=" + index + "=" + classItem.name + "=" + id}`}
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

export default OneSubject;
