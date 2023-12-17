import { TabsProvider, Tabs } from 'react-native-paper-tabs';
import { TabsProviderProps } from 'react-native-paper-tabs/src/utils';
import { theme } from './OwnPaperProvider';
import { ReactNode } from 'react';

export default function TabsTemplate(
  props: Readonly<TabsProviderProps>
): ReactNode {
  return (
    <TabsProvider {...props} defaultIndex={0}>
      <Tabs
        disableSwipe={true}
        style={{ backgroundColor: theme.colors.elevation.level5 }}
        {...props}
      ></Tabs>
    </TabsProvider>
  );
}
