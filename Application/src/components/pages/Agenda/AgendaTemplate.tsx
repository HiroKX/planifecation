import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { Timeline, TimelineEventProps } from 'react-native-calendars';
import { TouchableOpacity, View } from 'react-native';
import TextTemplate from '../../atoms/styles/TextTemplate';
import {
  getColorForBackground,
  LuxonDate,
} from '../../../services/utils/utils';
import { baseFont, theme } from '../../organisms/OwnPaperProvider';
import { Divider } from 'react-native-paper';
import { ReactNode } from 'react';
import { Signal } from '@preact/signals-react';

declare type AgendaProps = {
  events: Signal<Event[]>;
  selectedEvent: Signal<Event>;
  edit: Signal<Boolean>;
  currentDateDisplay: Signal<string>;
  navigation: any;
};

export default function AgendaTemplate(
  props: Readonly<AgendaProps>
): ReactNode {
  function selectEvent(event: Event) {
    props.selectedEvent.value = {
      id: event.id,
      title: event.title,
      summary: event.summary,
      end: event.end,
      color: event.color,
      start: event.start,
    };
    props.edit.value = true;
    props.navigation.navigate('EvenementTemplate');
  }

  const renderEvents = (event: TimelineEventProps) => {
    return (
      <View>
        <TouchableOpacity>
          <TextTemplate
            variant="bodyMedium"
            style={{
              color: getColorForBackground(event.color ?? theme.colors.primary),
            }}
          >
            {event.title}
          </TextTemplate>
          <Divider
            style={{
              borderWidth: 1,
              borderColor: getColorForBackground(
                event.color ?? theme.colors.primary
              ),
              borderRadius: 100,
            }}
          />
          <TextTemplate
            variant="labelMedium"
            style={{
              color: getColorForBackground(event.color ?? theme.colors.primary),
            }}
          >
            {event.summary}
          </TextTemplate>
          <TextTemplate
            variant="labelSmall"
            style={{
              color: getColorForBackground(event.color ?? theme.colors.primary),
            }}
          >
            {LuxonDate.to_hhmm(event.start, 'yyyy-MM-dd HH:mm')} -{' '}
            {LuxonDate.to_hhmm(event.end, 'yyyy-MM-dd HH:mm')}
          </TextTemplate>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Timeline
        theme={{
          textDayFontFamily: baseFont,
          textMonthFontFamily: baseFont,
          todayButtonFontFamily: baseFont,
          textDayHeaderFontFamily: baseFont,
        }}
        start={0}
        end={24}
        date={props.currentDateDisplay.value}
        events={props.events.value}
        renderEvent={renderEvents}
        onEventPress={event => {
          selectEvent(event);
        }}
      />
    </View>
  );
}
