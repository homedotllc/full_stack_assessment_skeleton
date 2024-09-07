// Need to use the React-specific entry point to import `createApi`
import { createAppSlice } from "@/app/createAppSlice"
import { PayloadAction } from "@reduxjs/toolkit"
import { UserInfo } from "./types"
export interface UserHomeState {
  userId: number | null
  allUsers: UserInfo[]
}

const initialState: UserHomeState = {
  userId: null,
  allUsers: []
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const userHomeSlice = createAppSlice({
  name: "userHomeSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    setUserId: create.reducer((state, action: PayloadAction<number | null>) => {
      state.userId = action.payload
    }),
    setAllUsers: create.reducer((state, action: PayloadAction<UserInfo[]>) => {
      state.allUsers = action.payload
    })
  }),
  selectors: {
    selectUserId: counter => counter.userId,
    selectAllUsers: counter => counter.allUsers
  }
})

// Action creators are generated for each case reducer function.
export const { setUserId, setAllUsers } = userHomeSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUserId, selectAllUsers } = userHomeSlice.selectors
