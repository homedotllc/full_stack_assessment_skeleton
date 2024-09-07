import { createSlice } from "@reduxjs/toolkit";
import { Select } from "../../types";

interface UserState {
  data: Array<Select>; // assuming you have a User type, otherwise use any[]
}

// Define the initial state using the UserState type
const initialState: UserState = {
  data: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
