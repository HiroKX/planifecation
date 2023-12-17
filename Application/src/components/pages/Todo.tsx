import SurfaceTemplate from '../molecules/SurfaceTemplate';
import AppTemplate from '../atoms/AppTemplate';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';
import {
    GetLoggedUser,
    LogoutUser,
} from '../../controllers/AuthenticationController';
import React, {ReactNode, useState} from 'react';
import { ApolloConsumer } from '@apollo/client';
import {FlatList, ListRenderItem, StyleSheet, View} from "react-native";
import ButtonTemplate from "../atoms/styles/ButtonTemplate";
import {ENVIRONMENT} from "@env";
import TextInputTemplate from "../atoms/styles/TextInputTemplate";
import {IconButton, TextInput} from "react-native-paper";

type Props = NativeStackScreenProps<StackParamList>;

type Todo = {
    id: string;
    content: string;
}

export default function Todo(props: Readonly<Props>): ReactNode {
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const handleAddTodo = () => {
        setTodoList([...todoList, {id: Date.now().toString(), content:todo}]);
        setTodo('');
    }

    const handleDeleteTodo = (item: Todo) => {
        const updatedTodoList = todoList.filter(todo => todo.id !== item.id);
        setTodoList(updatedTodoList);
    }

    const renderTodos =  ({ item, index }) => {
        return (
            <View>
                <SurfaceTemplate>
                    <TextInputTemplate right={<TextInput.Icon icon={"trash-can"} onPress={() => handleDeleteTodo(item)} />}>
                        {item.content}
                    </TextInputTemplate>
                </SurfaceTemplate>
            </View>
        )
    }

    return (
        <View>
            <SurfaceTemplate>
                <TextInputTemplate
                    mode="outlined"
                    value={todo}
                    onChangeText={text => setTodo(text)}
                />
                <ButtonTemplate onPress={handleAddTodo}>
                    Add
                </ButtonTemplate>
            </SurfaceTemplate>
            <SurfaceTemplate>
                <FlatList data={todoList} renderItem={renderTodos}/>
            </SurfaceTemplate>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
    },
    container: {
        alignItems: 'center',
    },
});