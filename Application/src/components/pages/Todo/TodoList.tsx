import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import React, { ReactNode, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TextInput, Divider, Portal } from 'react-native-paper';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import CheckboxTemplate from '../../molecules/CheckboxTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import { Todo } from '../../../models/Todo';
import CheckTodo from './CheckTodo';
import ModalTemplate from '../../organisms/ModalTemplate';
import { ApolloClient, useApolloClient } from '@apollo/client';
import {
  AddTodo,
  DeleteTodo,
  GetAllTodos,
  UpdateTodo,
} from '../../../controllers/TodoController';
import TextTemplate from '../../atoms/styles/TextTemplate';
import ActivityIndicatorTemplate from '../../atoms/styles/ActivityIndicatorTemplate';
import { lag } from '../../../services/utils/utils';
import AppTemplate from '../../atoms/AppTemplate';
import * as Haptics from 'expo-haptics';

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
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    getTodos().then();
    setTimeout(() => {
      setIsLoading(false);
    }, lag.value);
  }, [updatedTodos]);

  const handleAddTodo = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (todo.trim() !== '') {
      const id: string = await AddTodo(client, todo, false);
      console.debug('TodoList: id = ' + id);
      setTodoList([
        ...todoList,
        {
          id: id,
          content: todo,
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      setTodo('');
      setUpdatedTodos(true);
    }
  };

  const handleDeleteTodo = async (item: Todo) => {
    await DeleteTodo(client, item.id);
    const updatedTodoList: Todo[] = todoList.filter(
      todo => todo.id !== item.id
    );
    setTodoList(updatedTodoList);
    setUpdatedTodos(true);
  };

  const renderTodos = ({ item }: RenderTodoProps): React.JSX.Element => {
    const funcDrawing = async () => {
      setVisibleModal(false);
      const todoItem: Todo | undefined = todoList.find(
        todo => todo.id === currentTodo
      );
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
      <View style={{ margin: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            backgroundColor: theme.colors.surface,
          }}
        >
          <CheckboxTemplate
            status={item.isDone ? 'checked' : 'unchecked'}
            onPress={(): void => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              setCurrentTodo(item.id);
              setVisibleModal(true);
            }}
            iconColor={theme.colors.tertiary}
            size={60}
          />
          <TextTemplate
            variant="titleLarge"
            style={{ flex: 1, color: theme.colors.tertiary }}
          >
            {item.content}
          </TextTemplate>
          <AppTemplate
            icon="trash-can"
            onPress={() => handleDeleteTodo(item)}
            color={theme.colors.surfaceVariant}
          />
        </View>
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
  if (isLoading) {
    return <ActivityIndicatorTemplate />;
  } else {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <TextInputTemplate
          style={styles.todoInput}
          underlineStyle={{ display: 'none' }}
          label={'Nouvelle tâche'}
          mode={'flat'}
          value={todo}
          onChangeText={text => setTodo(text)}
          maxLength={100}
          right={
            <TextInput.Icon
              icon={'plus'}
              color={theme.colors.tertiary}
              style={{
                borderRadius: 12,
                backgroundColor: theme.colors.primary,
              }}
              onPress={handleAddTodo}
            />
          }
        />
        <Divider style={styles.divider} />
        <SurfaceTemplate style={styles.todoContent}>
          {todoList.length != 0 && (
            <FlatList
              style={styles.todoList}
              data={todoList}
              renderItem={renderTodos}
            />
          )}
        </SurfaceTemplate>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    height: 5,
    backgroundColor: theme.colors.tertiary,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  todo: {
    marginTop: -10,
    marginRight: -10,
    marginLeft: -10,
  },
  todoInput: {
    backgroundColor: theme.colors.surfaceVariant,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  todoList: {
    margin: 5,
  },
  todoContent: {
    backgroundColor: theme.colors.surfaceVariant,
    flex: 1,
    margin: 10,
    marginHorizontal: 10,
    borderRadius: 18,
  },
});
