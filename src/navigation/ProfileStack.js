import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Profile from '../screens/contents/Profile';
import {Layout} from '../screens/Layout'

const ProfileStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  // tabBarVisible: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const ProfileNavigator = () => {
  return (
    <>
      <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProfileStackNavigator.Screen
          name="Profile"
          component={Layout(Profile)}
          options={{headerShown: false}}
        /> 
      </ProfileStackNavigator.Navigator>
    </>
  );
};
