import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setSelectDate } from "../../../store/store";


export default function CalendarTemplate() {
    const selectDate = useSelector((state : RootState) => state.selectDate);
    const dispatch = useDispatch();
    return(
        <Calendar
            onDayPress={(date) => dispatch(setSelectDate(date))}
            />
    )

}
