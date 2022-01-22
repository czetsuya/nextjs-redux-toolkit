// CONSTANTS - START
import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE: unknown = {
  error: null,
  status: {inserted: false, updated: false, deleted: false},
};
// CONSTANTS - END

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    retrieveUsers: (state => {

    })
  }
});