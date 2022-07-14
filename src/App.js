import React, { useEffect, useState } from "react";
import "./App.css";
import Class from "./components/Class/Class";
import { days } from "./variable/listDays";
import { getData } from "./service/timetableService";

const App = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    getData().then((value) => setState(value));
  }, []);

  return (
    <div className={"main"}>
      <div className={"itemWrap"}>
        {state &&
          state.map((value) => (
            <div key={value.id}>
              <div className={"itemClass"}>{value.name}</div>
            </div>
          ))}
      </div>
      <div className={"classesWrap"}>
        {state && (
          <div className={"listDays"}>
            {days.map((value, index) => (
              <div key={index}>{value}</div>
            ))}
          </div>
        )}
        {state &&
          state.map((value) => (
            <Class
              key={value.id}
              classItem={value}
              state={state}
              setState={setState}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
