import SurfaceTemplate from '../molecules/SurfaceTemplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';
import { ReactNode, useState } from 'react';
import { FlatList, View } from 'react-native';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import TextInputTemplate from '../atoms/styles/TextInputTemplate';
import { TextInput } from 'react-native-paper';
import CheckboxTemplate from '../molecules/CheckboxTemplate';
import { theme } from '../organisms/OwnPaperProvider';

type Props = NativeStackScreenProps<StackParamList>;

type Todo = {
  id: string;
  content: string;
  isDone?: boolean;
};

type RenderTodoProps = {
  item: Todo;
};

export default function Todo(props: Readonly<Props>): ReactNode {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleAddTodo = () => {
    if (todo.trim() !== '') {
      let id = Date.now().toString();
      setTodoList([...todoList, { id: id, content: todo, isDone: false }]);
      setTodo('');
    }
  };

  const handleDeleteTodo = (item: Todo) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== item.id);
    setTodoList(updatedTodoList);
  };

  const renderTodos = ({ item }: RenderTodoProps) => {
    return (
      <View>
        <SurfaceTemplate
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        >
          <CheckboxTemplate
            status={item.isDone ? 'checked' : 'unchecked'}
            onPress={() => {
              setTodoList(prevTodos =>
                prevTodos.map(todo =>
                  todo.id === item.id ? { ...todo, isDone: !todo.isDone } : todo
                )
              );
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
            style={{ flex: 1 }}
            multiline={true}
            editable={false}
            onChangeText={text => (item.content = text)}
            value={item.content}
            outlineStyle={{
              display: 'none',
              backgroundColor: theme.colors.primaryContainer,
            }}
          ></TextInputTemplate>
        </SurfaceTemplate>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <SurfaceTemplate>
        <TextInputTemplate
          mode="outlined"
          value={todo}
          onChangeText={text => setTodo(text)}
        />
        <ButtonTemplate onPress={handleAddTodo}>Add</ButtonTemplate>
      </SurfaceTemplate>
      <SurfaceTemplate style={{ flex: 5 }}>
        <FlatList data={todoList} renderItem={renderTodos} />
      </SurfaceTemplate>
    </View>
  );
}
