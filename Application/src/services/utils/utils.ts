import { from } from '@apollo/client';
import { DateTime, Duration } from 'luxon';
import { DateData, LocaleConfig } from 'react-native-calendars';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { currentDateDisplay } from '../../components/pages/Agenda/handlingEvents';
import { theme } from '../../components/organisms/OwnPaperProvider';

const locale = 'fr';

// Return the perfect matching color for text based on hexcolor background
// It uses the YIQ model to calculate the best match
// The Y represents the Luma information. To pass a rgb to the Y of YIQ you have to (r*0.299), (g*0.287), (b*0.114)

export function getColorForBackground(hexcolor: string): string {
  // for hexcolor : #000000
  const r = parseInt(hexcolor.substring(3, 1), 16);
  const g = parseInt(hexcolor.substring(5, 3), 16);
  const b = parseInt(hexcolor.substring(5), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

export function rgbColorToHex(rgbcolor: string): string {
  // for rgb(x,y,z)
  const rgb = rgbcolor.split('(')[1].split(')')[0].split(','); // separates to x,y,z
  let reconstruct = rgb.map(function (component) {
    component = parseInt(component).toString(16);
    return component.length == 1 ? '0' + component : component; // maps to XX,YY,ZZ (hex values)
  });
  return '#' + reconstruct.join(''); // removes the ,
}

export const today = DateTime.now();


export const INITIAL_TIME = {
  hour: today.hour,
  minutes: today.minute,
};

export const emptyEvent : Event = {
  title: "",
  summary: "",
  start: today.toFormat('yyyy-MM-dd HH:mm'),
  end:  today.plus(1800000).toFormat('yyyy-MM-dd HH:mm'),
}
export const todayData: DateData = {
  year: today.year,
  month: today.month,
  day: today.day,
  timestamp: today.toMillis(),
  dateString: today.toFormat('yyyy-MM-dd'),
};

// Allows to handle dates easily in JS
export class LuxonDate {
  // Formatting explanation : https://github.com/moment/luxon/blob/master/docs/formatting.md
  static to_ddMMMMyyyy(date: string, fromFormat?: string): string {
    return DateTime.fromFormat(date, fromFormat ?? 'yyyy-MM-dd')
      .setLocale(locale)
      .toFormat('dd MMMM yyyy');
  }
  static to_jourdd(date: string, fromFormat?: string): string {
    return DateTime.fromFormat(date, fromFormat ?? 'yyyy-MM-dd')
      .setLocale(locale)
      .toFormat("'Jour :' dd");
  }
  static to_yyyyMMdd(date: string, fromFormat?: string): string {
    return DateTime.fromFormat(date, fromFormat ?? 'yyyy-MM-dd')
      .setLocale(locale)
      .toFormat('yyyy-MM-dd');
  }
  static to_MMMMyyyy(date: string, fromFormat?: string): string {
    return DateTime.fromFormat(date, fromFormat ?? 'yyyy-MM-dd')
      .setLocale(locale)
      .toFormat('MMMM yyyy');
  }
  static to_ddMMyyyy(date: string, fromFormat?: string): string {
    return DateTime.fromFormat(date, fromFormat ?? 'yyyy-MM-dd')
      .setLocale('fr')
      .toFormat('dd-MM-yyyy');
  }
  static to_hhmm(date: string, fromFormat?: string): string {
    return DateTime.fromFormat(date, fromFormat ?? 'yyyy-MM-dd')
      .setLocale('fr')
      .toFormat('HH:mm');
  }
}

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};

export function loadLocale(name: string) {
  LocaleConfig.defaultLocale = name; // loads french equivalent of label in calendar and timeline
}
