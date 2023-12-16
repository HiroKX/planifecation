import { ReactNode } from 'react';
import { TabScreen } from 'react-native-paper-tabs';
import { TabScreenProps } from 'react-native-paper-tabs/src/TabScreen';

export default function TabScreenTemplate(
  props: Readonly<TabScreenProps>
): ReactNode {
  return <TabScreen {...props}></TabScreen>;
}
