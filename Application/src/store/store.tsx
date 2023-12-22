import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./slices/EventsSlice";
import selectDateSlice from "./slices/SelectDateSlice";

const store = configureStore({
    reducer: {
      events: eventsSlice.reducer,
      selectDate : selectDateSlice.reducer
    },
  });
  
  export const { addEvent, removeEvent } = eventsSlice.actions;
  export const { setSelectDate } = selectDateSlice.actions;
  export default eventsSlice.reducer;
  export type RootState = ReturnType<typeof store.getState>; // used for TypeScript strong typing, put it in the state of your useSelector
  export { store };