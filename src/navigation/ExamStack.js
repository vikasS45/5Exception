import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Exam from '../screens/contents/Exam';
import {Layout} from '../screens/Layout'

const ExamStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const ExamStack = () => {
  return (
    <>
      <ExamStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ExamStackNavigator.Screen
          name="Exam"
          component={Layout(Exam)}
          options={{headerShown: false}}
        />
      </ExamStackNavigator.Navigator>
    </>
  );
};
