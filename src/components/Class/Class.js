import React, { useEffect, useState } from "react";
import Timetable from "../Timetable/Timetable";
import { days } from "../../variable/listDays";
import "../../App.css";

import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

const Class = ({ classItem, state, setState }) => {
  const [localState, setLocalState] = useState(null);
  const [update, setUpdate] = useState(false);
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    setLocalState(classItem);
  }, [state]);

  useEffect(() => {
    if (update) {
      const indexEl = state.findIndex((item) => item.id === localState.id);
      const newObj = state.map((value, index) => {
        if (index === indexEl) {
          return localState;
        }
        return value;
      });
      setState(newObj);
      setUpdate(false);
      changeRepeat(flag, newObj);
    }
  }, [localState]);

  function addNewData(items1, first, second, day1, items2, day2) {
    if (!day2) {
      [items1[first], items1[second]] = [items1[second], items1[first]];
      setLocalState({ ...localState, [day1]: items1 });
    } else {
      const temp1 = items1[first];
      items1[first] = items2[second];
      items2[second] = temp1;
      setLocalState({ ...localState, [day1]: items1, [day2]: items2 });
    }

    setUpdate(() => true);
  }

  function handleOnDragEnd(result) {
    const day1 = result.source.droppableId.split("-")[0];
    const day2 = result.destination.droppableId.split("-")[0];
    const indexFirstElement = result.source.index;
    const indexSecondElement = result.destination.index;

    if (day1 === day2) {
      if (!result.destination) return;
      const items = Array.from(localState[day1]);
      const first = items.findIndex((value) => value.id === indexFirstElement);
      const second = items.findIndex(
        (value) => value.id === indexSecondElement
      );
      addNewData(items, first, second, day1);
      setFlag({
        firstDay: day1,
        firstIndex: first,
        secondDay: day1,
        secondIndex: second,
      });
    } else {
      if (!result.destination) return;
      const items1 = Array.from(localState[day1]);
      const items2 = Array.from(localState[day2]);
      const first = items1.findIndex((value) => value.id === indexFirstElement);
      const second = items2.findIndex(
        (value) => value.id === indexSecondElement
      );
      addNewData(items1, first, second, day1, items2, day2);
      setFlag({
        firstDay: day1,
        firstIndex: first,
        secondDay: day2,
        secondIndex: second,
      });
    }
  }

  function changeRepeat(
    { firstDay, firstIndex, secondDay, secondIndex },
    newObj
  ) {
    let arr1 = [];
    let arr2 = [];
    newObj.map((value) => {
      if (value[firstDay][firstIndex].room) {
        value[firstDay][firstIndex].repeat = false;
      }
      return (
        value[firstDay][firstIndex].room &&
        arr1.push(value[firstDay][firstIndex].room.name)
      );
    });
    newObj.map((value) => {
      if (value[secondDay][secondIndex].room) {
        value[secondDay][secondIndex].repeat = false;
      }
      return (
        value[secondDay][secondIndex].room &&
        arr2.push(value[secondDay][secondIndex].room.name)
      );
    });

    arr1 = arr1.filter((item, index) => {
      return arr1.indexOf(item) !== index;
    });

    arr2 = arr2.filter((item, index) => {
      return arr2.indexOf(item) !== index;
    });

    const newState = newObj.map((value) => {
      if (
        value[firstDay][firstIndex].room &&
        arr1.includes(value[firstDay][firstIndex].room.name)
      ) {
        value[firstDay][firstIndex].repeat = true;
      }
      return value;
    });
    newState.map((value) => {
      if (
        value[secondDay][secondIndex].room &&
        arr2.includes(value[secondDay][secondIndex].room.name)
      ) {
        value[secondDay][secondIndex].repeat = true;
      }
      return value;
    });
    setState(newState);
  }

  return (
    <div className={"itemDaysWrap"}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {days.map((day, index) => (
          <Timetable key={index} classItem={localState} day={day} />
        ))}
      </DragDropContext>
    </div>
  );
};
Class.propTypes = {
  classItem: PropTypes.object,
  state: PropTypes.array,
  setState: PropTypes.func,
};
export default Class;
