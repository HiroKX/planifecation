import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateData } from 'react-native-calendars';
import { todayData } from '../../services/utils/utils';

const selectDateSlice = createSlice({
  name : 'selectDate',
  initialState : {
    date : todayData
  },
  reducers: {
    setSelectDate(state, action : PayloadAction<DateData>) {
      state.date = action.payload;
    }
  }
})

export default selectDateSlice;