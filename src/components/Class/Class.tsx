import React, { FC, memo } from "react";
import Timetable from "../Timetable/Timetable";

import "../../App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { handleDrop } from "../../functions/functions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSubject } from "../../store/subjectSlice";
import { IData, ITimetable } from "../../interfaces/interfaces";

interface IProps {
  classItem: IData;
  className: number;
}

const Class: FC<IProps> = ({ classItem, className }) => {
  const dispatch = useAppDispatch();
  const { subjects } = useAppSelector((state) => state.subjectsReducer);

  const handleOnDragEnd = (result: any) => {
    dispatch(setSubject(handleDrop(result, subjects)));
  };

  return (
    <div className={"itemDaysWrap"}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {classItem.timetable.map((oneSubject: ITimetable[], index: number) => (
          <Timetable
            key={index}
            oneSubject={oneSubject}
            day={index}
            className={className}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

export default memo(Class);
