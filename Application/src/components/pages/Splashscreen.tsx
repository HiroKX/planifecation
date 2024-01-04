import { View } from 'react-native';
import { theme } from '../organisms/OwnPaperProvider';
import TextTemplate from '../atoms/styles/TextTemplate';
import LogoTemplate from '../atoms/styles/LogoTemplate';
import { ActivityIndicator } from 'react-native-paper';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

export default function Splashscreen(props: Readonly<{ func: () => void }>) {

  const position =  {
    x : useSharedValue(0),
    y : useSharedValue(0)
  };
  const pan = Gesture.Pan()
  .onChange((e) => {
    position.x.value = e.translationX;
    position.y.value = e.translationY
  });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.x.value},{translateY: position.y.value }]
  }))

  return (
    <GestureHandlerRootView style={{ backgroundColor: theme.colors.primary, flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 6, alignContent: 'center', alignItems: 'center' }}>
          <Animated.View style={[{backgroundColor: 'black', width: 400, height: 400}, animatedStyle]}><LogoTemplate style={{ width: 400, height: 400 }} /></Animated.View>
          <TextTemplate
            onLongPress={props.func}
            variant="headlineLarge"
            style={{ flex: 1, color: theme.colors.secondary, fontSize: 42 }}
          >
            Planifécation
          </TextTemplate>
          <ActivityIndicator
            style={{ flex: 2 }}
            color={theme.colors.error}
            size={150}
          ></ActivityIndicator>
        </View>
        </GestureDetector>
    </GestureHandlerRootView>
  );
}
