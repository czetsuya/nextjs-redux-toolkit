import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../ApplicationStore";

const INITIAL_STATE = {
  selected: null
}

export const UserSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action: PayloadAction) => {
      state.selected = action.payload;
    },
    clearUser: (state, action: PayloadAction) => {
      state.selected = null;
    }
  }
});

export const {setUser, clearUser} = UserSlice.actions;

export const selectUser = (state: RootState) => state.user.selected;

export default UserSlice.reducer;