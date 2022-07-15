import React, { FC } from "react";
import Timetable from "../Timetable/Timetable";
import { days } from "../../variable/listDays";
import "../../App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { changeSubject } from "../../functions/functions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSubject } from "../../store/subjectSlice";

const Class: FC<any> = ({ classItem }) => {
  const dispatch = useAppDispatch();
  const { subjects } = useAppSelector((state) => state.subjectsReducer);

  const handleOnDragEnd = (result: any) => {
    const classItem = result.source.droppableId.split("-")[2];
    const day1 = result.source.droppableId.split("-")[0];
    const day2 = result.destination.droppableId.split("-")[0];
    const idFirstElement = result.source.index;
    const idSecondElement = result.destination.index;

    if (day1 === day2) {
      dispatch(
        setSubject({
          subjects: changeSubject({
            day1,
            idFirstElement,
            idSecondElement,
            classItem,
            subjects,
          }),
        })
      );
    } else {
      dispatch(
        setSubject({
          subjects: changeSubject({
            day1,
            day2,
            idFirstElement,
            idSecondElement,
            classItem,
            subjects,
          }),
        })
      );
    }
  };

  return (
    <div className={"itemDaysWrap"}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {days.map((day, index) => (
          <Timetable key={index} classItem={classItem} day={day} />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Class;
