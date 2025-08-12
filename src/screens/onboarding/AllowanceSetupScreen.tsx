import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

type AllowanceSetupScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SetAllowance'>;
};

const AllowanceSetupScreen = ({ navigation }: AllowanceSetupScreenProps) => {
  const { user, setUser } = useAppContext();
  const [allowance, setAllowance] = useState(8000);
  const [hasGigIncome, setHasGigIncome] = useState(false);

  const handleAllowanceChange = (value: number) => {
    setAllowance(value);
  };

  const handleGigIncomeToggle = () => {
    setHasGigIncome(!hasGigIncome);
  };

  const handleContinue = () => {
    setUser({
      ...user,
      allowance,
      hasGigIncome
    });
    navigation.navigate('SignupBonus', { onComplete: () => {} });
  };

  return (
    <ScreenContainer>
      <Header
        title="Set Your Monthly Budget"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Monthly Allowance</Text>
        <Text style={styles.allowanceValue}>₹{Math.round(allowance).toLocaleString()}</Text>

        <Slider
          style={styles.slider}
          minimumValue={5000}
          maximumValue={15000}
          step={500}
          value={allowance}
          onValueChange={handleAllowanceChange}
          minimumTrackTintColor={COLORS.PRIMARY}
          maximumTrackTintColor={COLORS.LIGHT_GRAY}
          thumbTintColor={COLORS.PRIMARY}
        />

        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>₹5,000</Text>
          <Text style={styles.sliderLabel}>₹15,000</Text>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>I also have irregular income (gigs, freelance, etc.)</Text>
          <Switch
            trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
            thumbColor={COLORS.WHITE}
            ios_backgroundColor={COLORS.MID_GRAY}
            onValueChange={handleGigIncomeToggle}
            value={hasGigIncome}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Based on your input:</Text>
          <Text style={styles.infoText}>
            Daily spend limit: ₹{Math.round(allowance / 30)}
          </Text>
          {hasGigIncome && (
            <Text style={styles.infoText}>
              We'll help you track both regular and irregular income!
            </Text>
          )}
        </View>
      </View>

      <CustomButton
        title="Continue"
        onPress={handleContinue}
        style={styles.button}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 24,
  },
  allowanceValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    textAlign: 'center',
    marginBottom: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  sliderLabel: {
    color: COLORS.DARK_GRAY,
    fontSize: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 12,
  },
  switchLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.SECONDARY,
  },
  infoBox: {
    padding: 16,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 12,
    marginTop: 'auto',
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.WHITE,
    marginBottom: 4,
  },
  button: {
    marginTop: 24,
  },
});

export default AllowanceSetupScreen;
