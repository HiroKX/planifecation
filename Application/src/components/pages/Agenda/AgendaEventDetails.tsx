import { View } from "react-native";
import TextTemplate from "../../atoms/styles/TextTemplate";
import { todayData } from "../../../services/utils/utils";

export default function AgendaEventDetails() {
    return (
        <View>
            <TextTemplate>{todayData.dateString}</TextTemplate>
        </View>
    );
}