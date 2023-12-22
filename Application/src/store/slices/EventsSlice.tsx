import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event as CalendarEvent } from 'react-native-calendars/src/timeline/EventBlock';


const initialState : Array<CalendarEvent> = []

const eventsSlice = createSlice({
  name: 'Events',
  initialState,
  reducers: {
    // Ajoute ou update un évènement
    addEvent(state, action: PayloadAction<CalendarEvent>) {
      const index: number = state.findIndex(
        (elem : CalendarEvent) =>
          action.payload.title === elem.title &&
          action.payload.start === elem.start
      );
      index == -1
        ? state.push(action.payload)
        : state.splice(index, 1, action.payload);
    },
    removeEvent(state, action: PayloadAction<CalendarEvent>) {
      const index = state.findIndex(
        (elem : CalendarEvent) =>
          action.payload.title === elem.title &&
          action.payload.start === elem.start
      );
      if (index != -1) state.splice(index, 1);
    },
  },
});

export default eventsSlice;
