import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  name: string;
}

const initialState: IInitialState = {
  name: "Akif Fazil Guven",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
});

export default homeSlice.reducer;
