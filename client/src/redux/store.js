import { configureStore } from '@reduxjs/toolkit'

import reducers from "./reducers/index"

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: reducers,
});

export default store;