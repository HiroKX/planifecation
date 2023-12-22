import { configureStore } from "@reduxjs/toolkit";
import 


const store = configureStore({
    reducer: {
      events: eventsSlice.reducer,
    },
  });
  
  export const { addEvent, removeEvent } = eventsSlice.actions;
  export default eventsSlice.reducer;


  export { store };