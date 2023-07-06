import { configureStore, createSlice } from "@reduxjs/toolkit";

export interface AppState {
  searchCompany: string;
}

const initialState: AppState = {
  //initial state of [searchCompany, setSearchCompany] = useState('')
  searchCompany: "",
};

const searchCompanySlice = createSlice({
  name: "searchCompany",
  initialState, // useState('')
  reducers: {
    setSearchCompany: (state, action) => {
      state.searchCompany = action.payload;
    },
  },
});

export const { setSearchCompany } = searchCompanySlice.actions;

export const store = configureStore({
  reducer: {
    searchCompany: searchCompanySlice.reducer,
  },
});
