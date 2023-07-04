import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchCompany: string;
}

const initialState: SearchState = {
  searchCompany: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchCompany(state, action: PayloadAction<string>) {
      state.searchCompany = action.payload;
    },
  },
});

export const { setSearchCompany } = searchSlice.actions;
export default searchSlice.reducer;
