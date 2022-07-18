import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../service/timetableService";
import { IData } from "../interfaces/interfaces";

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
  },
});
const subjectReducer = subjectSlice.reducer;
export default subjectReducer;
export const { setSubject } = subjectSlice.actions;
