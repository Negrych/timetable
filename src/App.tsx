import React, { useEffect } from "react";
import "./App.css";
import Class from "./components/Class/Class";
import { days } from "./variable/listDays";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getSubject } from "./store/subjectSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const { subjects } = useAppSelector((state) => state.subjectsReducer);

  useEffect(() => {
    dispatch(getSubject());
  }, []);

  return (
    <div className={"main"}>
      <div className={"itemWrap"}>
        {subjects &&
          subjects.map((value: any) => (
            <div key={value.id}>
              <div className={"itemClass"}>{value.name}</div>
            </div>
          ))}
      </div>
      <div className={"classesWrap"}>
        {subjects && (
          <div className={"listDays"}>
            {days.map((value, index) => (
              <div key={index}>{value}</div>
            ))}
          </div>
        )}
        {subjects &&
          subjects.map((value: any) => (
            <Class key={value.id} classItem={value} />
          ))}
      </div>
    </div>
  );
};

export default App;
