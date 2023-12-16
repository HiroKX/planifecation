import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import { theme } from '../organisms/OwnPaperProvider';

export default function LoadingTemplate(props: Readonly<{visible : boolean}>) {


    return (
        <Portal>
            <Modal visible={props.visible} dismissable={false} >
                <ActivityIndicator animating={true} color={theme.colors.primary}/>
            </Modal>
        </Portal>
    );
}