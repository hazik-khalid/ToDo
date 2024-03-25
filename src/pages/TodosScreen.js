import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IconButton } from 'react-native-paper'
import Fallback from '../components/Fallback'

const Todos = () => {
  //init local states
  const [todo, settodo] = useState("")
  const [todoList, settodolist] = useState([])
  const [editTodo, seteditTodo] = useState(null)

  const HandleAddTodo = () => {

    if (todo === ''){
        return;
     }
    settodolist([...todoList, {id: Date.now().toString(), title:todo}])
    settodo('')
  }

  const HandleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id)
    settodolist(updatedTodoList)
  }
  const HandleEditTodo=(todo)=>{
    seteditTodo(todo)
    settodo(todo.title)
  }

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editTodo.id) {
        return { ...item, title: todo };
      }

      return item;
    });
    settodolist(updatedTodos);
    seteditTodo(null);
    settodo("");
  };
  const renderTodo = ({ item, index }) => {
    return (
      <View style={styles.list}>
        <Text style={styles.listtext}>{item.title}</Text>
        <IconButton icon="pencil" iconColor='#fff'  onPress={() => HandleEditTodo(item)}/>
        <IconButton icon="trash-can" iconColor='#fff' onPress={() => HandleDeleteTodo(item.id)} />
      </View>
    );
  }

  return (
    <View style={{ marginHorizontal: 16 }}>
      <Text></Text>
      <TextInput style={styles.TextInput}
        placeholder='Add Task'
        value={todo}
        onChangeText={(usertext) => settodo(usertext)}
      />
    
      {
        editTodo ?  <TouchableOpacity style={styles.TouchableOpacity} onPress={handleUpdateTodo}>
        <Text style={styles.BtnText} >
          Save
        </Text>
      </TouchableOpacity> :
       <TouchableOpacity style={styles.TouchableOpacity} onPress={HandleAddTodo}>
       <Text style={styles.BtnText} >
         Add
       </Text>
     </TouchableOpacity>
      }

      <FlatList data={todoList} renderItem={renderTodo} />

      {
        todoList.length <=0 && <Fallback />
      }
    </View>
  )
}

export default Todos

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 2,
    borderColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  TouchableOpacity: {
    backgroundColor: "black",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: 'center',
  },
  BtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  list: {
    backgroundColor: "#1e90ff",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  listtext: {
    color: "#fff",
    fontSize: 20,
    fontWeight: '800',
    flex: 1
  }
})
