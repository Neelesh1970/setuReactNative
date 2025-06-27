import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../features/counter";
import { authReducer } from "../features/auth";
import { bookTestReducer } from "../features/booktest";
import { agricultureReducer } from "../features/agriculture";
import { userReducer } from "../features/user";
import { jobsReducer } from "../features/jobs";

// import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    bookTest: bookTestReducer,
    agriculture: agricultureReducer,
    user: userReducer,
    jobs: jobsReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(thunk),
});

export default store;
