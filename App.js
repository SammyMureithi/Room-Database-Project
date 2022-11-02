import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import AddUserScreen from './Screens/AddUserScreen';
import DetailedUser from './Screens/DetailedUser';
import HomeScreen from './Screens/HomeScreen';
import UsersPage from './Screens/UsersPage';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="Users" component={UsersPage} />
        <Stack.Screen
          name="Detailed"
          component={DetailedUser}
          initialParams={{user_id: 30}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
