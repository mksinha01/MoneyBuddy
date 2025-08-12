import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';

type OnboardingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.logo}>MoneyBuddy</Text>
        <Text style={styles.subtitle}>Campus Cash Coach</Text>
        
        <View style={styles.illustrationContainer}>
          {/* You would replace this with an actual image */}
          <View style={styles.illustrationPlaceholder}>
            <Text style={styles.illustrationText}>💰💸💹</Text>
          </View>
        </View>
        
        <Text style={styles.description}>
          Your personal financial buddy for college life. Track expenses, split bills, save up for adventures, and get smart money advice!
        </Text>
      </View>
      
      <CustomButton 
        title="Get Started" 
        onPress={() => navigation.navigate('CollegeSelector')} 
        style={styles.button}
      />
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
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.PRIMARY,
    marginBottom: 48,
  },
  illustrationContainer: {
    marginBottom: 48,
  },
  illustrationPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationText: {
    fontSize: 48,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.DARK_GRAY,
    marginBottom: 24,
  },
  button: {
    width: '100%',
  },
});

export default OnboardingScreen;
