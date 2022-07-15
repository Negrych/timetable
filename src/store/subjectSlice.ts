import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../service/timetableService";

const initialState: any = {
  subjects: null,
};

export const getSubject = createAsyncThunk(
  "subjectSlice/getSubjects",
  async (_, { dispatch }) => {
    const subjects = await getData();
    dispatch(setSubject({ subjects: subjects }));
  }
);

const subjectSlice = createSlice({
  name: "subjectSlice",
  initialState,
  reducers: {
    setSubject: (state, action: PayloadAction<{ subjects: any }>) => {
      state.subjects = action.payload.subjects;
    },
  },
});
const subjectReducer = subjectSlice.reducer;
export default subjectReducer;
export const { setSubject } = subjectSlice.actions;
