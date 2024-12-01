import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import { Login, Register } from '@screens';

// ThemeProvider
import { ThemeProvider } from './context/ThemeProvider';


const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
    </Stack.Navigator>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
  )
}

const AppWithContext = () => {
  return (
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  )
}

export default AppWithContext;