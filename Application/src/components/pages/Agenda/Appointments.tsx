import DateTimePicker from '@react-native-community/datetimepicker';


export default function Appointments () {
  return (
    <DateTimePicker
      mode='time'
      value={new Date()}/>
  )
}