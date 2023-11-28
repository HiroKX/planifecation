import { TextInput } from "react-native-paper";
import SurfaceTemplate from "../organisms/SurfaceTemplate";
import TextInputTemplate from "../atoms/styles/TextInputTemplate";
import { ScrollView } from "react-native";

export default function Notepad(){

    return(
        <SurfaceTemplate 
        style={styles.surface}>
            <TextInputTemplate 
            placeholder="Titre" 
            style={styles.title}/>

            <ScrollView 
            style={styles.scroll}>
                <TextInput
                    multiline
                    spellCheck={false}
                    style={styles.content}
                />
            </ScrollView>
        </SurfaceTemplate>
    )
}

const styles = ({
    surface:{
        //height: '100%',
    },
    title: {
      fontSize: 25,
    },
    content: {
        borderBottomWidth: 0,
        lineHeight: 20,
        fontSize: 15,
        padding: 0,
        paddingHorizontal: 12,
        paddingBottom: 150,
        //height: '100%',

    },
    scroll: {
        //height: '100%',
    },
    /*
    pad:{
        height:1500,

    },*/
});