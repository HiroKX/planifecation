import {
    TabsProvider,
    Tabs
} from 'react-native-paper-tabs';
import { TabsProviderProps } from 'react-native-paper-tabs/src/utils'
import { theme } from './OwnPaperProvider';

export default function TabsTemplate(props: Readonly<TabsProviderProps>) {
    return (
            <TabsProvider
              
            {...props}
            defaultIndex={0}>
              <Tabs
              disableSwipe={true}
              style={{backgroundColor: theme.colors.elevation.level5}}
              iconPosition='top'
              {...props}></Tabs>
      </TabsProvider>
    );
}
