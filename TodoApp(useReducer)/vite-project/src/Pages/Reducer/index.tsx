import React, { useReducer, useEffect, useState } from 'react';
import { Input, Button, List, Typography, notification } from 'antd';
import 'antd/dist/reset.css'; // Ant Design stili
import { DeleteOutlined } from '@ant-design/icons';

const { Item } = List;
const { Text } = Typography;

// Todo tipinin tərifi
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Action tiplərinin tərifi
type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'SET_TODOS'; payload: Todo[] };

// Todo reducer funksiyası
const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'SET_TODOS':
      return action.payload;
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, []);
  const [inputValue, setInputValue] = useState<string>('');

  // localStorage'dən todosları oxumaq
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    dispatch({ type: 'SET_TODOS', payload: todos });
  }, []);

  // localStorage'ə todosları yazmaq
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  // Todo əlavə etmək funksiyası
  const addTodo = () => {
    if (inputValue.trim() === '') {
      notification.error({
        message: 'Xəta',
        description: 'Todo boş ola bilməz',
      });
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    dispatch({ type: 'ADD_TODO', payload: newTodo });
    setInputValue('');
  };

  // Todo silmək funksiyası
  const removeTodo = (id: number) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Todo App</h1>
      <Input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Yeni todo əlavə edin"
        style={{ marginBottom: '10px' }}
      />
      <Button type="primary" onClick={addTodo} style={{ marginBottom: '20px' }}>
        Əlavə et
      </Button>
      <List
        bordered
        dataSource={state}
        renderItem={todo => (
          <Item actions={[<Button type="link" onClick={() => removeTodo(todo.id)} icon={<DeleteOutlined />} />]}>
            <Text>{todo.text}</Text>
          </Item>
        )}
      />
    </div>
  );
};

export default App;
