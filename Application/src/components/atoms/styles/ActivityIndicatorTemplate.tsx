import { ActivityIndicator, ActivityIndicatorProps } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';
import { theme } from '../../organisms/OwnPaperProvider';

export default function ActivityIndicatorTemplate(
    props: Readonly<ActivityIndicatorProps>
  ): ReactNode {
    return (
        <View style={styles.view}>
      <ActivityIndicator
      size={150}
      color={theme.colors.primary}
        style={props.style ?? styles.indicator}
        {...props}
      /></View>
    );
  }
  
  const styles = StyleSheet.create({
    view:{
        flex:1,
        justifyContent: 'center',
        verticalAlign:'middle'
    },
    indicator: {
        
      margin: 5,
    },
  });