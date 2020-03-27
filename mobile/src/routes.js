import React from 'react';
import { StatusBar, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Detail from './pages/Detail';
import Incidents from './pages/Incidents';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 100,
    easing: Easing.linear,
  },
};

export default function Routes() {
  return (
    <NavigationContainer>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <AppStack.Navigator 
        initialRouteName="Incidents" 
        headerMode="none"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      >
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>

    </NavigationContainer>
  );
}