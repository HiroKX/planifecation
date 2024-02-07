import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native/';
import TextTemplate from '../../../atoms/styles/TextTemplate';
import {
  firstKeysLayout,
  getFourthRowLayout,
  getKeysFromLayout,
  getShuffledLayout,
  getThirdRowLayout,
  secondKeysLayout,
} from './keyboardKeys';
import { theme } from '../../../organisms/OwnPaperProvider';
import { getColorForBackground } from '../../../../services/utils/utils';

export default function VirtualRandomKeyboard(props: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isCapital, setCapital] = useState(false);
  const [isShift, setShift] = useState(false);
  const [row1, setRow1] = useState<string[]>(getKeysFromLayout(10, 0));
  const [row2, setRow2] = useState<string[]>(getKeysFromLayout(10, 10));
  const [row3, setRow3] = useState<string[]>(getThirdRowLayout());
  const [row4, setRow4] = useState<string[]>(getFourthRowLayout());

  const handleKeyEvent = (keyPressed: string) => {
    switch (keyPressed) {
      case '⏎': {
        props.setText(props.text + '\\n');
        break;
      }
      case '⇧': {
        // handleShiftEvent();
        break;
      }
      case '␣': {
        props.setText(props.text + ' ');
        break;
      }
      case '←': {
        props.setText(props.text.slice(0, -1));
        break;
      }
      case '123': {
        //handle123Event();
        break;
      }
      default:
        props.setText(props.text + keyPressed);
    }
  };

  return (
    <View style={styles.keyboard}>
      <View style={styles.row}>
        {row1.map(key => {
          return (
            <TextTemplate variant="headlineSmall" style={styles.key} key={key}>
              {key}
            </TextTemplate>
          );
        })}
      </View>
      <View style={styles.row}>
        {row2.map(key => {
          return (
            <TextTemplate variant="headlineSmall" style={styles.key} key={key}>
              {key}
            </TextTemplate>
          );
        })}
      </View>
      <View style={[styles.row]}>
        {row3.map(key => {
          return (
            <TextTemplate
              variant="headlineSmall"
              style={
                key === '⇧'
                  ? [styles.key, styles.majKey]
                  : key === '←'
                    ? [styles.key, styles.backspaceKey]
                    : styles.key
              }
              key={key}
            >
              {key}
            </TextTemplate>
          );
        })}
      </View>
      <View style={styles.row}>
        {row4.map(key => {
          return (
            <TextTemplate
              variant="headlineSmall"
              style={
                key === '␣'
                  ? [styles.key, styles.spacebarKey]
                  : key === '123'
                    ? [styles.key, styles.swapKey]
                    : key === '⏎'
                      ? [styles.key, styles.enterKey]
                      : styles.key
              }
            >
              {key}
            </TextTemplate>
          );
        })}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  keyboard: {
    alignContent: 'stretch',
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  majKey: {
    flex: 3,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  swapKey: {
    color: theme.colors.primary,
  },
  enterKey: {
    flex: 2,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  spacebarKey: {
    flex: 5,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  backspaceKey: {
    flex: 2,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  key: {
    margin: 1,
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.secondary,
    color: getColorForBackground(theme.colors.secondary),
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
