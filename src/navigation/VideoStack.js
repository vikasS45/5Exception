import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Layout} from '../screens/Layout';
import Video from '../screens/contents/Video';
import {Colors} from 'react-native-ui-lib';

const VideoStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.coolBlue,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const VideoStack = () => {
  return (
    <>
      <VideoStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <VideoStackNavigator.Screen
          name="List"
          component={Layout(Video)}
          // options={{headerShown: false}}
        />
      </VideoStackNavigator.Navigator>
    </>
  );
};
