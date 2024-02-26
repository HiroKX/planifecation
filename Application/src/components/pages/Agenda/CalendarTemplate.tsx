import {View} from "react-native";
import {Calendar, DateData} from "react-native-calendars";
import {baseFont, theme} from "../../organisms/OwnPaperProvider";
import {Icon} from "react-native-paper";
import React, {ReactNode, useEffect, useState} from "react";
import {signal, Signal} from "@preact/signals-react";
import {MarkedDates} from "react-native-calendars/src/types";
import {Event} from "react-native-calendars/src/timeline/EventBlock";
import {ApolloClient, useApolloClient} from "@apollo/client";
import {agendaEventToEvent, GetAllAgendaEvents} from "../../../controllers/AgendaController";
import {AgendaEvent} from "../../../models/AgendaEvent";

declare type CalendarProps = {
    events: Signal<Event[]>
    isLoading: Signal<Boolean>
    currentDate: Signal<DateData>
    currentDateDisplay: Signal<string>
    navigation: any;
}
declare type Dot = {
    [key: string]: { color: string }[];
};

export const isDataUpdated = signal(false)

export async function getAgendaEvents(client: ApolloClient<Object>) {
    return await GetAllAgendaEvents(client).then((agendaEvents: AgendaEvent[]) => {
        let response: Event[] = [];
        agendaEvents.forEach((event: AgendaEvent) => {
            response = [...response, agendaEventToEvent(event)];
        });
        return response;
    });
}

export default function CalendarTemplate(props: Readonly<CalendarProps>): ReactNode {
    const client = useApolloClient();
    const [markedDates, setMarkedDates] = useState<MarkedDates>({})

    function getMarkedDates(events: Event[]) {
        // Typically the situation where you would put a "DON'T TOUCH, NO ONE KNOWS HOW IT WORKS BUT IT WORKS"
        // Dots must be a map where that template ["yyyy-mm-dd"]: {color, color, color} is respected in order to load the dots for the proper days
        // The dots are setted for a date every forEach iteration but I had no clue how to do it otherwise
        // the date comes from the start of an event, so it has to be substringed to lose the hh:mm
        const response: MarkedDates = {};
        let dots: Dot = {};
        if (events != null) {
            events.forEach((element: Event) => {
                if (!dots[element.start.substring(0, 10)])
                    dots[element.start.substring(0, 10)] = [];
                dots[element.start.substring(0, 10)].push({
                    color: element.color ?? theme.colors.primary,
                });
                response[element.start.substring(0, 10)] = {
                    dots: dots[element.start.substring(0, 10)],
                    marked: true,
                    selected: true,
                };
            });
        }
        return response;
    }

    useEffect(() => {
        getAgendaEvents(client).then(result => {
            props.events.value = result;
            setMarkedDates(getMarkedDates(props.events.value))
        })
    }, [isDataUpdated.value]);

    return (
        <View style={{ flex: 1 }}>
            <Calendar
                theme={{
                    textDayFontFamily: baseFont,
                    textMonthFontFamily: baseFont,
                    todayButtonFontFamily: baseFont,
                    textDayHeaderFontFamily: baseFont,
                }}
                markingType="multi-dot"
                current={props.currentDateDisplay.value}
                markedDates={markedDates}
                firstDay={1}
                onDayPress={date => {
                    props.currentDate.value = date;
                    props.navigation.navigate('AgendaTemplate');
                }}
                onMonthChange={month => {
                    props.currentDate.value = month;
                }}
                renderArrow={direction => (
                    <Icon
                        size={40}
                        source={
                            direction === 'left' ? 'arrow-left-circle' : 'arrow-right-circle'
                        }
                    />
                )}
            />
        </View>
    );
}