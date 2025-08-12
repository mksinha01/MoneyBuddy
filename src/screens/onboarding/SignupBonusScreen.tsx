import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

type SignupBonusScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignupBonus'>;
  route: RouteProp<RootStackParamList, 'SignupBonus'>;
};

const SignupBonusScreen = ({ navigation, route }: SignupBonusScreenProps) => {
  const { setIsOnboarded, updateBalance } = useAppContext();
  const { onComplete } = route.params;

  const handleContinue = () => {
    // Complete onboarding
    setIsOnboarded(true);
    // Call the onComplete callback from params if it exists
    if (onComplete) {
      onComplete();
    }
  };
  
  const handleScanQR = () => {
    // Add bonus to balance
    updateBalance(50); // Add ₹50 bonus
    handleContinue();
  };

  return (
    <ScreenContainer>
      <Header
        title="Almost Done!"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.contentContainer}>
        <View style={styles.qrContainer}>
          {/* Placeholder for QR code */}
          <View style={styles.qrPlaceholder}>
            <Text style={styles.qrText}>QR</Text>
          </View>
        </View>

        <Text style={styles.title}>Unlock ₹50 Bonus!</Text>
        
        <Text style={styles.description}>
          Scan any campus canteen QR code to earn your first ₹50 bonus. Try the Hostel 9 Mess QR code to start!
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Quick Tip:</Text>
          <Text style={styles.infoText}>
            Look for the MoneyBuddy sticker on tables around campus to earn more bonuses!
          </Text>
        </View>
      </View>

      <CustomButton
        title="Skip for Now"
        onPress={handleContinue}
        style={styles.skipButton}
        textStyle={styles.skipButtonText}
      />
      
      <CustomButton
        title="Scan QR Code"
        onPress={handleScanQR}
        style={styles.button}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24,
  },
  qrContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.SECONDARY,
    borderStyle: 'dashed',
  },
  qrText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  infoBox: {
    padding: 16,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.SECONDARY,
  },
  skipButton: {
    backgroundColor: 'transparent',
    marginBottom: 16,
    shadowOpacity: 0,
    elevation: 0,
  },
  skipButtonText: {
    color: COLORS.DARK_GRAY,
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 16,
  },
});

export default SignupBonusScreen;
