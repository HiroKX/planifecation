import { View } from 'react-native';
import { theme } from '../organisms/OwnPaperProvider';
import TextTemplate from '../atoms/styles/TextTemplate';
import LogoTemplate from '../atoms/styles/LogoTemplate';
import { ActivityIndicator } from 'react-native-paper';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {ZoomIn, ZoomOut, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';

export default function Splashscreen(props: Readonly<{ func: () => void }>) {

  const rotation = useSharedValue(360);
  const pressed = useSharedValue(false);
  const position =  {
    x : useSharedValue(0),
    y : useSharedValue(0)
  };
  const tap = Gesture.Pan()
  .onBegin(() => {
    rotation.value = 180;
  })
  .onFinalize(() => {
    rotation.value = 0;
  });

  const pan = Gesture.Pan()
  .onBegin(() => {
    pressed.value = true;
  })
  .onChange((e) => {
    position.x.value = e.translationX;
    position.y.value = e.translationY
  })
  .onFinalize(() => {
    position.x.value = withSpring(0);
    position.y.value = withSpring(0);
    pressed.value = false;
  });
  const animatedLogo = useAnimatedStyle(() => ({
    transform: [{translateX: position.x.value},{translateY: position.y.value }, {scale : withTiming(pressed.value ? 1.1 : 1)}]
  }));
  const animatedLoader = useAnimatedStyle(() => ({
    transform: [{rotateY : `${rotation.value}deg`}]
  }));


  return (
    <GestureHandlerRootView style={{ backgroundColor: theme.colors.primary, flex: 1 }}>
        <View style={{ flex: 6, alignContent: 'center', alignItems: 'center' }}>
          <GestureDetector gesture={pan}>
            <Animated.View entering={ZoomIn} exiting={ZoomOut} style={[{height: 400, width: 400, borderRadius: 500}, animatedLogo]}>
                <LogoTemplate style={{ width: 400, height: 400 }} />
            </Animated.View>
          </GestureDetector>
          <TextTemplate
            onLongPress={props.func}
            variant="headlineLarge"
            style={{ flex: 1, color: theme.colors.secondary, fontSize: 42 }}
          >
            Planifécation
          </TextTemplate>
          <GestureDetector gesture={tap}>
          <Animated.View entering={ZoomIn} style={[{height: 200, width: 200,}, animatedLoader]}>          
            <ActivityIndicator
            style={{ flex: 2 }}
            color={theme.colors.error}
            size={150}
          />
          </Animated.View>
          </GestureDetector>
        </View>
    </GestureHandlerRootView>
  );
}
