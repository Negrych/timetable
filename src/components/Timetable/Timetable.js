import React from "react";
import "../../App.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

const Timetable = ({ classItem, day }) => {
  return (
    <div style={{ height: "500px" }} className={"day"}>
      {classItem &&
        classItem[day].map((value, index) => {
          if (value) {
            return (
              <div key={index}>
                <div
                  style={
                    value.room && { backgroundColor: value.repeat ? "red" : "" }
                  }
                  className={"subject-name"}
                >
                  <Droppable
                    droppableId={`${
                      day + "-" + value.id + "-" + classItem.name
                    }`}
                    day={day}
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
                          isDragDisabled={!value.subject.name}
                          key={value.id}
                          draggableId={`${value.id}`}
                          index={value.id}
                        >
                          {(provided) => (
                            <div
                              key={index}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div>{value.subject.name}</div>
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

Timetable.propTypes = {
  classItem: PropTypes.object,
  day: PropTypes.string,
};

export default Timetable;
