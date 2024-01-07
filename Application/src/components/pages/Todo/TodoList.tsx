import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../../navigation/RootStack';
import { ReactNode, useState } from 'react';
import { FlatList, View } from 'react-native';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import TextInputTemplate from '../../atoms/styles/TextInputTemplate';
import { Portal, TextInput } from 'react-native-paper';
import CheckboxTemplate from '../../molecules/CheckboxTemplate';
import { theme } from '../../organisms/OwnPaperProvider';
import { Todo } from '../../../models/Todo';
import CheckTodo from './CheckTodo';
import ModalTemplate from '../../organisms/ModalTemplate';

type Props = NativeStackScreenProps<StackParamList>;

type RenderTodoProps = {
  item: Todo;
};

export default function TodoList(props: Readonly<Props>): ReactNode {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState('');

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

  const renderTodos = ({ item }: RenderTodoProps): React.JSX.Element => {
    const funcDrawing = () => {
      setVisibleModal(false);
      setTodoList(prevTodos =>
        prevTodos.map(todo =>
          todo.id === currentTodo ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    };

    return (
      <View>
        <SurfaceTemplate
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        >
          <CheckboxTemplate
            status={item.isDone ? 'checked' : 'unchecked'}
            onPress={() => {
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
