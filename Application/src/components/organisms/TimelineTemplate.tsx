import {
    TimelineList,
    TimelineListProps,
  } from 'react-native-calendars';

  export default function TimelineTemplate(props: Readonly<TimelineListProps>) {
    
    
    return (
        <TimelineList
         {...props}
        />
    );
  }