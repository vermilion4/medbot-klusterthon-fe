import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import userSlice from './userSlice'
import appSlice from './appSlice'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
  },
  middleware: [thunk],
  devTools: true
})

// let store

// export const rootReducer = combineReducers({
//     user: userSlice
//   })

// const createStore = () =>
//   configureStore({
//     reducer: rootReducer,
//     middleware: [thunk],
//     devTools: true
//   })

//   export const makeStore = () => {
//     store = createStore()
//     return store
//   }
  
  
//   export const wrapper = createWrapper(makeStore, {
//     debug: true,
//   })
  
//   export { store }
