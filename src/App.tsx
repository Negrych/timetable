import React, { useEffect } from "react";
import "./App.css";
import Class from "./components/Class/Class";
import { days } from "./variable/listDays";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getSubject } from "./store/subjectSlice";
import { IData } from "./interfaces/interfaces";

const App = () => {
  const dispatch = useAppDispatch();
  const { subjects } = useAppSelector((state) => state.subjectsReducer);
  useEffect(() => {
    dispatch(getSubject());
  }, []);

  return (
    <div className={"main"}>
      <div className={"itemWrap"}>
        {subjects.length !== 0 &&
          subjects.map((value: IData) => (
            <div key={value.id}>
              <div className={"itemClass"}>{value.name}</div>
            </div>
          ))}
      </div>
      <div className={"classesWrap"}>
        {subjects.length !== 0 && (
          <div className={"listDays"}>
            {days.map((value, index) => (
              <div key={index}>{value}</div>
            ))}
          </div>
        )}
        {subjects &&
          subjects.map((value: IData, index: number) => (
            <Class key={value.id} classItem={value} className={index} />
          ))}
      </div>
    </div>
  );
};

export default App;
