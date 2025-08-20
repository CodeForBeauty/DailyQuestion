import { createSlice } from "@reduxjs/toolkit"

const tokenReducer = createSlice({
  name: "token",
  initialState: "",
  reducers: {
    setToken(_state, action) {
      return action.payload
    },
  },
})

export const { setToken } = tokenReducer.actions
export default tokenReducer.reducer
