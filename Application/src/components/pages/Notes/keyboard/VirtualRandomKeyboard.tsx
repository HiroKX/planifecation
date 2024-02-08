import { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native/';
import KeyboardButton from '../../../atoms/styles/KeyboardButton';
import {
  getFourthRowLayout,
  getKeysFromLayout,
  getThirdRowLayout,
} from './keyboardKeys';

export default function VirtualRandomKeyboard(
  props: Readonly<{
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
  }>
) {
  const [symbolLayer, setSymbolLayer] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const row1 = useMemo(() => getKeysFromLayout(10, 0), []);
  const row2 = useMemo(() => getKeysFromLayout(10, 10), []);
  const row3 = useMemo(() => getThirdRowLayout(), []);
  const row4 = useMemo(() => getFourthRowLayout(), []);

  const renderKey : (key :string) => string = (key: string) => {
    if (!key.includes(' ')) {
      return key;
    } else if (isShift) {
      return key.split(' ').at(0)?.toUpperCase() ?? "";
    } else {
      return key.split(' ').at(Number(symbolLayer)) ?? "";
    }
  };

  const renderStyle = (key: string) => {
    if (key === '⇧') {
      return styles.majKey;
    }
    if (key === '␣') {
      return styles.spacebarKey;
    }
    if (key === '⏎') {
      return styles.enterKey;
    }
    if (key === '←') {
      return styles.backspaceKey;
    }
    if (key === '123') {
      return styles.swapKey;
    }
    return null;
  };

  const handleKeyEvent = (keyPressed: string) => {
    switch (keyPressed) {
      case '⏎': {
        props.setText(props.text + '\\n');
        break;
      }
      case '⇧': {
        setIsShift(!isShift);
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
        setSymbolLayer(!symbolLayer);
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
            <KeyboardButton style={styles.key} key={key} onPress={() => handleKeyEvent(renderKey(key))}>
              {renderKey(key)}
            </KeyboardButton>
          );
        })}
      </View>
      <View style={styles.row}>
        {row2.map(key => {
          return (
            <KeyboardButton style={styles.key} key={key} onPress={() => handleKeyEvent(renderKey(key))}>
              {renderKey(key)}
            </KeyboardButton>
          );
        })}
      </View>
      <View style={[styles.row]}>
        {row3.map(key => {
          return (
            <KeyboardButton
              key={key}
              style={[styles.key, renderStyle(key)]}
              onPress={() => handleKeyEvent(renderKey(key))}
            >
              {renderKey(key)}
            </KeyboardButton>
          );
        })}
      </View>
      <View style={styles.row}>
        {row4.map(key => {
          return (
              <KeyboardButton
                key={key}
                style={[styles.key, renderStyle(key)]}
                onPress={() => handleKeyEvent(renderKey(key))}
              >
                {renderKey(key)}
              </KeyboardButton>
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
  },
  swapKey: {
    flex:1
  },
  enterKey: {
    flex: 2,
  },
  spacebarKey: {
    flex: 6,
  },
  backspaceKey: {
    flex: 2,
  },
  key: {
    margin: 1,
    flex: 1,
    alignSelf: 'stretch',
    borderRadius:0,
  },
});
