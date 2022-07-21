import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../service/timetableService";
import { IData } from "../interfaces/interfaces";
import { changeRepeatAfterDrop } from "../functions/functions";

interface IState {
  subjects: IData[];
}

const initialState: IState = {
  subjects: [],
};

export const getSubject = createAsyncThunk(
  "subjectSlice/getSubjects",
  async (_, { dispatch }) => {
    const subjects = await getData();
    dispatch(setSubject(subjects));
  }
);

const subjectSlice = createSlice({
  name: "subjectSlice",
  initialState,
  reducers: {
    setSubject: (state, action: PayloadAction<IData[]>) => {
      state.subjects = action.payload;
    },
    changeSubject: (state, action) => {
      const { classItem, day1, day2, indexFirstElement, indexSecondElement } =
        action.payload;

      const temp =
        state.subjects[classItem]["timetable"][day1][indexFirstElement];

      state.subjects[classItem]["timetable"][day1][indexFirstElement] =
        state.subjects[classItem]["timetable"][day2 ?? day1][
          indexSecondElement
        ];
      state.subjects[classItem]["timetable"][day2 ?? day1][indexSecondElement] =
        temp;

      changeRepeatAfterDrop(
        state.subjects,
        day1,
        indexFirstElement,
        indexSecondElement,
        day2
      );
    },
  },
});
const subjectReducer = subjectSlice.reducer;
export default subjectReducer;
export const { setSubject, changeSubject } = subjectSlice.actions;
