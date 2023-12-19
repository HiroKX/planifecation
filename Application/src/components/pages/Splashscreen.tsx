import { View } from "react-native";
import { theme } from "../organisms/OwnPaperProvider";
import TextTemplate from "../atoms/styles/TextTemplate";
import LogoTemplate from "../atoms/styles/LogoTemplate";
import { ActivityIndicator } from "react-native-paper";

export default function Splashscreen(props : Readonly<{func : () => void}>) {
    return (
        <View style={{backgroundColor: theme.colors.primary, flex: 1}}>
            <View style={{alignContent:'center', alignItems: 'center'}}>
            <LogoTemplate width={500} height={500}/>
            <TextTemplate variant="headlineLarge" style={{color: theme.colors.secondary}}>Planifécation</TextTemplate>
            <ActivityIndicator onTouchEnd={props.func}  color={theme.colors.error} size={150}></ActivityIndicator>
            </View>
        </View>
    );
}