import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import PDF from '../screens/contents/PDF';
import {Layout} from '../screens/Layout'

const PDFStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: '#25385d',
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  // tabBarVisible: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const PDFNavigator = () => {
 
  return (
    <>
      <PDFStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <PDFStackNavigator.Screen
          name="PDF"
          component={Layout(PDF)}
          options={{headerShown: false}}
        />
        
      </PDFStackNavigator.Navigator>
    </>
  );
};
