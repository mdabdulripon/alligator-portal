import { createSlice } from "@reduxjs/toolkit";

// Interface
export interface CounterState {
  data: number;
  title: string;
}

// Initial State
const initialState: CounterState = {
  data: 42,
  title: "Contact Page - Slice: Redux Toolkit",
};

// Create Slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data += action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
