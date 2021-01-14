import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from './components/BottomTabNavigator';
import CalendarScreen from './screens/calendar';
import FoldersScreen from './screens/folders';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

console.log(Tab);

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="calendar"
      headerMode="none"
      tabBar={props => <BottomTabNavigator {...props} />}
    >
      <Tab.Screen name="calendar" component={CalendarScreen} />
      <Tab.Screen name="folders" component={FoldersScreen} />
    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="home"
            headerMode="none"
          >
            <Stack.Screen name="home" component={HomeTabs} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </ApplicationProvider>
    </React.Fragment>
  );
}
