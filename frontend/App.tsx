import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { BottomTabs } from '@/navigation/BottomTabs';
import { AuthStack } from '@/navigation/AuthStack';

const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0E0F13',
    card: '#151821',
    text: '#E8ECF1',
    primary: '#7C5CFF',
    border: '#242836',
    notification: '#FF6B6B'
  }
};

const RootStack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  const theme = DarkTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Auth" component={AuthStack} />
          <RootStack.Screen name="Main" component={BottomTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


