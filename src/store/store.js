import { configureStore } from '@reduxjs/toolkit'
 import loginReducer from "../feature/LoginSlice"
 const store = configureStore({
  reducer: {
    loginInfo:loginReducer,

  },
})


export default store;