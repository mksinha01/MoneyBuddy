import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider, useAppContext } from './src/context/AppContext';
import { RootStackParamList } from './src/navigation/types';

// Onboarding Screens
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import PhoneVerificationScreen from './src/screens/onboarding/PhoneVerificationScreen';
import UpiVerificationScreen from './src/screens/onboarding/UpiVerificationScreen';
import CollegeSelectorScreen from './src/screens/onboarding/CollegeSelectorScreen';
import AllowanceSetupScreen from './src/screens/onboarding/AllowanceSetupScreen';
import SignupBonusScreen from './src/screens/onboarding/SignupBonusScreen';

// Main Screens
import RootNavigator from './src/navigation/RootNavigator';
import SplitBillScreen from './src/screens/main/SplitBillScreen';
import RequestMoneyScreen from './src/screens/main/RequestMoneyScreen';
import ConfirmationScreen from './src/screens/main/ConfirmationScreen';
import ScanScreen from './src/screens/main/ScanScreen';
import ChatbotScreen from './src/screens/chatbot/ChatbotScreen';

// Settings Screens
import SettingsScreen from './src/screens/settings/SettingsScreen';
import PeerPressureShieldScreen from './src/screens/settings/PeerPressureShieldScreen';
import ImpulseBlockerScreen from './src/screens/settings/ImpulseBlockerScreen';

const Stack = createStackNavigator<RootStackParamList>();

// App container with the provider
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}

// Separate component that uses the context
function AppContent() {
  const { isOnboarded, setIsOnboarded } = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          // Onboarding Flow
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerificationScreen} />
            <Stack.Screen name="UpiVerification" component={UpiVerificationScreen} />
            <Stack.Screen name="CollegeSelector" component={CollegeSelectorScreen} />
            <Stack.Screen name="SetAllowance" component={AllowanceSetupScreen} />
            <Stack.Screen 
              name="SignupBonus" 
              component={SignupBonusScreen}
              initialParams={{ onComplete: () => setIsOnboarded(true) }} 
            />
          </>
        ) : (
          // Main App Flow
          <>
            <Stack.Screen name="Root" component={RootNavigator} />
            <Stack.Screen name="SplitBill" component={SplitBillScreen} />
            <Stack.Screen name="RequestMoney" component={RequestMoneyScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
            <Stack.Screen name="Scan" component={ScanScreen} />
            <Stack.Screen name="Chatbot" component={ChatbotScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="PeerPressureShield" component={PeerPressureShieldScreen} />
            <Stack.Screen name="ImpulseBlocker" component={ImpulseBlockerScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
