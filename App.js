import { StyleSheet,SafeAreaView, Text, View } from 'react-native';
import TodosScreen from './src/pages/TodosScreen'
import GlobalStyle from './src/GlobalStyle';
export default function App() {
  return (
  <SafeAreaView style={GlobalStyle.androidSafeArea}>
       <TodosScreen/>
  </SafeAreaView>
  );
}

