import { Checkbox, CheckboxProps } from "react-native-paper";


interface Todo {
    id: string;
    content: string;
    isDone?: boolean;
};

export default function CheckboxTemplate(props : Readonly<CheckboxProps>): React.ReactNode {
    return (
        <Checkbox
        onPress={props.onPress}
        {...props}
        ></Checkbox>
    );
}