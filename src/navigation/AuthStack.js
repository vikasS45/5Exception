import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import DemoSignIn from '../screens/auth/DemoSignIn';
import {BottomTabs} from './BottomStack'
import {Layout} from '../screens/Layout'

const AuthStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',

  },
  headerTitleStyle: {
    fontFamily: 'SofiaProRegular'
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="signIn"
        component={Layout(SignIn)}
        options={{headerShown: false}}
      />
      <AuthStackNavigator.Screen
        name="DemoSignIn"
        component={Layout(DemoSignIn)}
        options={{headerShown: false}}
      />
      <AuthStackNavigator.Screen
        name="Home"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </AuthStackNavigator.Navigator>
  );
};
