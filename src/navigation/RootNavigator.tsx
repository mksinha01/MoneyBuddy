import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import CollegeSelectorScreen from '../screens/onboarding/CollegeSelectorScreen';
import AllowanceSetupScreen from '../screens/onboarding/AllowanceSetupScreen';
import SignupBonusScreen from '../screens/onboarding/SignupBonusScreen';

import HomeScreen from '../screens/main/HomeScreen';
import ScanScreen from '../screens/main/ScanScreen';
import SplitBillScreen from '../screens/main/SplitBillScreen';
import ContactsScreen from '../screens/main/ContactsScreen';
import RequestMoneyScreen from '../screens/main/RequestMoneyScreen';
import ConfirmationScreen from '../screens/main/ConfirmationScreen';

import ChatbotScreen from '../screens/chatbot/ChatbotScreen';

import SettingsScreen from '../screens/settings/SettingsScreen';
import PeerPressureShieldScreen from '../screens/settings/PeerPressureShieldScreen';
import ImpulseBlockerScreen from '../screens/settings/ImpulseBlockerScreen';

// Import types
import { RootStackParamList, TabNavigatorParamList } from './types';

// Import context
import { useAppContext } from '../context/AppContext';
import { COLORS } from '../theme/colors';

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabNavigatorParamList>();

// Bottom Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Scan') {
            iconName = focused ? 'scan' : 'scan-outline';
          } else if (route.name === 'Chatbot') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.DARK_GRAY,
        tabBarStyle: {
          backgroundColor: COLORS.WHITE,
          borderTopWidth: 1,
          borderTopColor: COLORS.LIGHT_GRAY,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Scan" component={ScanScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

// Root Navigator
const RootNavigator = () => {
  // We're now only returning the TabNavigator since the navigation structure 
  // is already defined in the App.tsx file
  return <TabNavigator />;
};

export default RootNavigator;
