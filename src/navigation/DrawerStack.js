import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeNavigator} from './HomeStack';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeNavigator} />
    </Drawer.Navigator>
  );
};
