import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CatalogScreen } from '@/screens/CatalogScreen';
import { TryOnScreen } from '@/screens/TryOnScreen';
import { RecommendScreen } from '@/screens/RecommendScreen';
import { CartScreen } from '@/screens/CartScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

export type TabParamList = {
  Catalog: undefined;
  TryOn: undefined;
  Recommend: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Catalog" component={CatalogScreen} />
      <Tab.Screen name="TryOn" component={TryOnScreen} />
      <Tab.Screen name="Recommend" component={RecommendScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};


