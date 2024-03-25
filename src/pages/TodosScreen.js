import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import Fallback from '../components/Fallback';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todos = () => {
  // init local states
  const [todo, settodo] = useState('');
  const [todoList, settodolist] = useState([]);
  const [editTodo, seteditTodo] = useState(null);

  useEffect(() => {
    // Load todos from local storage when component mounts
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('@todos');
        if (storedTodos !== null) {
          settodolist(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever todoList changes
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('@todos', JSON.stringify(todoList));
      } catch (error) {
        console.error('Error saving todos:', error);
      }
    };

    saveTodos();
  }, [todoList]);

  const HandleAddTodo = () => {
    if (todo === '') {
      return;
    }
    settodolist([...todoList, { id: Date.now().toString(), title: todo }]);
    settodo('');
  };

  const HandleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    settodolist(updatedTodoList);
  };

  const HandleEditTodo = (todo) => {
    seteditTodo(todo);
    settodo(todo.title);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    settodolist(updatedTodos);
    seteditTodo(null);
    settodo('');
  };

  const renderTodo = ({ item, index }) => {
    return (
      <View style={styles.list}>
        <Text style={styles.listtext}>{item.title}</Text>
        <IconButton icon="pencil" iconColor="#fff" onPress={() => HandleEditTodo(item)} />
        <IconButton icon="trash-can" iconColor="#fff" onPress={() => HandleDeleteTodo(item.id)} />
      </View>
    );
  };

  return (
    <>
    <View style={{ marginHorizontal: 16 }}>
      <Text></Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Add Task"
        value={todo}
        onChangeText={(usertext) => settodo(usertext)}
      />

      {editTodo ? (
        <TouchableOpacity style={styles.TouchableOpacity} onPress={handleUpdateTodo}>
          <Text style={styles.BtnText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.TouchableOpacity} onPress={HandleAddTodo}>
          <Text style={styles.BtnText}>Add</Text>
        </TouchableOpacity>
      )}

      <FlatList data={todoList} renderItem={renderTodo} />

      {todoList.length <= 0 && <Fallback />}
      </View>
      <View style={styles.bottomTextContainer}>
        <Text>Hazik Khalid</Text>
      </View>
    
    </>
  );
};

export default Todos;

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    borderColor: '#1e90ff',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  TouchableOpacity: {
    backgroundColor: 'black',
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: 'center',
  },
  BtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  list: {
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listtext: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
  },
  bottomTextContainer:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white', // Optional, if you want a background color
    paddingVertical: 10,
  }
});