import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

type ConfirmationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Confirmation'>;
  route: RouteProp<RootStackParamList, 'Confirmation'>;
};

const ConfirmationScreen = ({ navigation, route }: ConfirmationScreenProps) => {
  const { message } = route.params;
  const { updateBurnRate } = useAppContext();

  const handleContinue = () => {
    // Update burn rate (hardcoded for demo)
    updateBurnRate(58);
    // Navigate back to home
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  const handleSaveMore = () => {
    // Simulate chat opening with suggestion
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });

    // Add timeout to allow navigation to complete before showing chatbot
    setTimeout(() => {
      navigation.navigate('Chatbot');
    }, 500);
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.successIcon}>
          <Text style={styles.successIconText}>✅</Text>
        </View>
        
        <Text style={styles.title}>Success!</Text>
        <Text style={styles.message}>{message}</Text>
        
        <View style={styles.bonusContainer}>
          <Text style={styles.bonusTitle}>Want to save more?</Text>
          <Text style={styles.bonusText}>
            Ask Money Buddy how to move some cash to your Trip Fund!
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Ask Money Buddy"
          onPress={handleSaveMore}
          style={styles.primaryButton}
        />
        
        <CustomButton
          title="Continue"
          onPress={handleContinue}
          style={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.DARK_GRAY,
    marginBottom: 48,
    lineHeight: 24,
  },
  bonusContainer: {
    backgroundColor: COLORS.SECONDARY,
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  bonusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.WHITE,
    marginBottom: 8,
  },
  bonusText: {
    fontSize: 14,
    color: COLORS.WHITE,
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  secondaryButtonText: {
    color: COLORS.SECONDARY,
    textDecorationLine: 'underline',
  },
});

export default ConfirmationScreen;
