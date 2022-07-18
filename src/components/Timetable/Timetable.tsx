import React, { FC } from "react";
import "../../App.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ITimetable } from "../../interfaces/interfaces";

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
          if (value) {
            return (
              <div key={index}>
                <div
                  style={
                    value.room && {
                      backgroundColor: value.repeat ? "red" : "",
                    }
                  }
                  className={"subject-name"}
                >
                  <Droppable
                    droppableId={`${
                      day + "=" + index + "=" + classItem.name + "=" + value.id
                    }`}
                    key={value.id}
                  >
                    {(provided, snapshot) => (
                      <div
                        style={{
                          backgroundColor: snapshot.draggingOverWith
                            ? "gold"
                            : "",
                        }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <Draggable
                          isDragDisabled={!value.subject?.name}
                          key={Number(String(day + index))}
                          draggableId={`${value.id}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              key={index}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div>{value.subject?.name}</div>
                            </div>
                          )}
                        </Draggable>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <div className={"subject-room"}>
                  {value.room && value.room.name}
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Timetable;
