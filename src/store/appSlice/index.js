

const { createSlice, } = require("@reduxjs/toolkit");


const appSlice = createSlice({
  name: "app",
  initialState: {
    navigation: {
      active: '1'
    }
  },
  reducers: {
    setActiveNavigation: (state, action) => {
      state.navigation.active = action.payload;
    },
    
  },
 
});

export const { setActiveNavigation } = appSlice.actions;

export const selectActiveNavigation = (state) => state.app.navigation.active;

export default appSlice.reducer;
