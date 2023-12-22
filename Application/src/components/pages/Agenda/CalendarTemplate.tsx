import { Calendar } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";


export default function CalendarTemplate() {
    const selectDate = useSelector((state : RootState) => state.selectDate.date.dateString);

    return(
        <Calendar
            />
    )

}
