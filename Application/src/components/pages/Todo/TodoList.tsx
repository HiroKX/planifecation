import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import React, { ReactNode, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import { Portal, TextInput } from 'react-native-paper';
import CheckboxTemplate from '../../molecules/CheckboxTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import { Todo } from '../../../models/Todo';
import CheckTodo from './CheckTodo';
import ModalTemplate from '../../organisms/ModalTemplate';
import {ApolloClient, useApolloClient} from '@apollo/client';
import {
  AddTodo,
  DeleteTodo,
  GetAllTodos,
  UpdateTodo,
} from '../../../controllers/TodoController';

type Props = NativeStackScreenProps<StackParamList>;

type RenderTodoProps = {
  item: Todo;
};

export default function TodoList(props: Readonly<Props>): ReactNode {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState('');
  const [updatedTodos, setUpdatedTodos] = useState(false);

  const client: ApolloClient<Object> = useApolloClient();

  useEffect((): void => {
    async function getTodos() {
      await client.resetStore();
      await GetAllTodos(client).then(todos => {
        let sortedTodos: Todo[] = [...todos];
        sortedTodos = sortedTodos.sort((a, b) => {
          return a.updatedAt > b.updatedAt ? -1 : 1;
        });
        setTodoList(sortedTodos);
        setUpdatedTodos(false);
      });
    }

    getTodos().then();
  }, [updatedTodos]);

  const handleAddTodo = async () => {
    if (todo.trim() !== '') {
      const id: string = await AddTodo(client, todo, false);
      console.debug('TodoList: id = ' + id);
      setTodoList([...todoList, { id: id, content: todo, isDone: false, createdAt: new Date(), updatedAt: new Date() }]);
      setTodo('');
      setUpdatedTodos(true);
    }
  };

  const handleDeleteTodo = async (item: Todo) => {
    await DeleteTodo(client, item.id);
    const updatedTodoList: Todo[] = todoList.filter(todo => todo.id !== item.id);
    setTodoList(updatedTodoList);
    setUpdatedTodos(true);
  };

  const renderTodos = ({ item }: RenderTodoProps): React.JSX.Element => {
    const funcDrawing = async () => {
      setVisibleModal(false);
      const todoItem: Todo | undefined = todoList.find(todo => todo.id === currentTodo);
      if (todoItem !== undefined) {
        await UpdateTodo(
          client,
          todoItem.id,
          todoItem.content,
          !todoItem.isDone
        );
      }
      setUpdatedTodos(true);
    };

    return (
      <View>
        <SurfaceTemplate
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        >
          <CheckboxTemplate
            status={item.isDone ? 'checked' : 'unchecked'}
            onPress={(): void => {
              setCurrentTodo(item.id);
              setVisibleModal(true);
            }}
          />
          <TextInputTemplate
            right={
              <TextInput.Icon
                icon={'trash-can'}
                color={theme.colors.primary}
                onPress={() => handleDeleteTodo(item)}
              />
            }
            mode="outlined"
            style={{ flex: 1, paddingBottom: 0, paddingTop: 0 }}
            multiline={true}
            editable={false}
            onChangeText={edit => (item.content = edit)}
            value={item.content}
            outlineStyle={{
              display: 'none',
            }}
          ></TextInputTemplate>
        </SurfaceTemplate>
        <Portal>
          <ModalTemplate
            visible={visibleModal}
            onDismiss={() => setVisibleModal(false)}
          >
            <CheckTodo returnFunc={funcDrawing} />
          </ModalTemplate>
        </Portal>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <SurfaceTemplate>
        <TextInputTemplate
          label={'Nouvelle tâche'}
          mode="outlined"
          value={todo}
          onChangeText={text => setTodo(text)}
          maxLength={100}
        />
        <ButtonTemplate onPress={handleAddTodo}>
          Ajouter une tâche
        </ButtonTemplate>
      </SurfaceTemplate>
      <SurfaceTemplate style={{ flex: 5 }}>
        <FlatList data={todoList} renderItem={renderTodos} />
      </SurfaceTemplate>
    </View>
  );
}
