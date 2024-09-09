import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Home as HomeState} from "../services/homeApis";

// Define the initial state using that type
const initialState: HomeState = {
    id: 1,
    street_address: "dfyaw eufeyruf  rjgoierwcer 4r",
    list_price: 34819,
    state: "nvdfiogid",
    zip: 3435432,
    sqft: 3243.3421,
    beds: 2,
    baths: 3
  };

  export const homeSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      // Action to log the user in
      loadData: (state, action: PayloadAction<string>) => {
        state.street_address = action.payload;
      },
    },
  });
  
  // Export the actions
  export const { loadData } = homeSlice.actions;
  
  // Export the reducer, to be included in the store
  export default homeSlice.reducer;