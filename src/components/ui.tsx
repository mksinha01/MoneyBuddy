import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import DefaultSlider from '@react-native-community/slider';
import { COLORS } from '../theme/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenContainer = ({ children, style }: ScreenContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
}

export const Header = ({ title, onBack, rightComponent }: HeaderProps) => {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.headerPlaceholder} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {rightComponent ? rightComponent : <View style={styles.headerPlaceholder} />}
    </View>
  );
};

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

// Custom Slider Component
interface CustomSliderProps {
  minimumValue: number;
  maximumValue: number;
  value: number;
  onValueChange: (value: number) => void;
  step?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  style?: ViewStyle;
}

export const Slider = ({
  minimumValue,
  maximumValue,
  value,
  onValueChange,
  step = 1,
  minimumTrackTintColor = COLORS.PRIMARY,
  maximumTrackTintColor = COLORS.LIGHT_GRAY,
  style,
}: CustomSliderProps) => {
  return (
    <DefaultSlider
      style={style}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      value={value}
      onValueChange={onValueChange}
      step={step}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumTrackTintColor={maximumTrackTintColor}
      thumbTintColor={COLORS.PRIMARY}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: 16,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: COLORS.MID_GRAY,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: COLORS.SECONDARY,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.SECONDARY,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.SECONDARY,
  },
  headerPlaceholder: {
    width: 40,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
