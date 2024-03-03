import { View, StyleSheet } from 'react-native';
import { theme } from '../organisms/OwnPaperProvider';
import LogoTemplate from '../atoms/styles/LogoTemplate';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  ZoomIn,
  ZoomOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ActivityIndicatorTemplate from '../atoms/styles/ActivityIndicatorTemplate';

export default function Splashscreen(props: Readonly<{ func: () => void }>) {
  const rotation = useSharedValue(360);
  const pressed = useSharedValue(false);
  const position = {
    x: useSharedValue(0),
    y: useSharedValue(0),
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
    .onChange(e => {
      position.x.value = e.translationX;
      position.y.value = e.translationY;
    })
    .onFinalize(() => {
      position.x.value = withSpring(0);
      position.y.value = withSpring(0);
      pressed.value = false;
    });
  const animatedLogo = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.x.value },
      { translateY: position.y.value },
      { scale: withTiming(pressed.value ? 1.1 : 1) },
    ],
  }));
  const animatedLoader = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
  }));

  return (
    <GestureHandlerRootView
      style={styles.mainContainer}
    >
      <View style={styles.logoContainer}>
        <GestureDetector gesture={pan}>
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
            style={[
              { flex:1 },
              animatedLogo,
            ]}
          >
            <LogoTemplate style={styles.logo}/>
          </Animated.View>
        </GestureDetector>
        <GestureDetector gesture={tap}>
          <TouchableOpacity
            onPressOut={props.func}>
            <Animated.View
              entering={ZoomIn}
              style={[styles.loaderContainer, animatedLoader]}
            >
              <ActivityIndicatorTemplate
                color={theme.colors.tertiary}
              />
            </Animated.View>
          </TouchableOpacity>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.primary, 
    flex: 1, 
    padding: 75,  
  },
  logoContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center', 
  },
  logo: {
    height:400,
    width:400
  },
  loaderContainer: {
    height: 200,
    width: 200,
  }
});