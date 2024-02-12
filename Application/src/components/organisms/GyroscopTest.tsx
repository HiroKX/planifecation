import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default function App() {
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const menuHeight = 70; // Hauteur du menu en pixels
  const circleSize = 50; // Diamètre du cercle

  useEffect(() => {
    let previousPosition = { x: 0, y: 0 };

    const subscription = DeviceMotion.addListener(
      ({ accelerationIncludingGravity }) => {
        // Utilisez les axes X et Z pour définir la position X et Y de la bille
        let axis = accelerationIncludingGravity.z;
        if (
          accelerationIncludingGravity.z < 0 &&
          accelerationIncludingGravity.y <= 0
        ) {
          axis = 10 + accelerationIncludingGravity.z;
        } else if (
          accelerationIncludingGravity.z < 0 &&
          accelerationIncludingGravity.y >= 0
        ) {
          axis = -accelerationIncludingGravity.y;
        }
        const newX = previousPosition.x + accelerationIncludingGravity.x * 0.5; // Ajustez le facteur de multiplication selon votre besoin
        const newY = previousPosition.y + axis * 0.5; // Utilisez la compensation pour l'axe Z

        // Limitez la position de la bille pour qu'elle reste à l'intérieur de l'écran, en tenant compte du menu en haut
        const boundedX = Math.max(
          -screenWidth / 2,
          Math.min(newX, screenWidth / 2 - circleSize)
        );
        const boundedY = Math.max(
          -screenHeight / 2 + menuHeight,
          Math.min(newY, screenHeight / 2 - circleSize)
        );

        // Mettez à jour la position de la bille
        setCirclePosition({ x: boundedX, y: boundedY });

        // Mettez à jour la position précédente
        previousPosition = { x: boundedX, y: boundedY };
      }
    );

    DeviceMotion.setUpdateInterval(10); // Mettez à jour la position de la bille environ toutes les 10 ms

    return () => {
      subscription.remove();
      DeviceMotion.setUpdateInterval(1000); // Rétablissez l'intervalle de mise à jour par défaut
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          {
            transform: [
              { translateX: circlePosition.x },
              { translateY: circlePosition.y },
            ],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    position: 'absolute',
  },
});
