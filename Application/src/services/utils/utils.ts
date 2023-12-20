import { DateTime } from 'luxon';
import { locale } from '../../environment/locale';
import { DateData, LocaleConfig } from 'react-native-calendars';

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

export const today = DateTime.now();
export const INITIAL_TIME = {
  hour: today.hour,
  minutes : today.minute
}
export const todayData : DateData = {
  year : today.year,
  month : today.month,
  day : today.day,
  timestamp: today.toMillis(),
  dateString: today.toFormat("yyyy-MM-dd")
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
}
LocaleConfig.defaultLocale = 'fr'; // loads french equivalent of label in calendar and timeline
