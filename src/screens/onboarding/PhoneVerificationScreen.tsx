import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';

type PhoneVerificationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PhoneVerification'>;
};

const PhoneVerificationScreen = ({ navigation }: PhoneVerificationScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const handleSendOTP = () => {
    // Validate phone number
    if (phoneNumber.length < 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      return;
    }
    
    // In a real app, you would make an API call to send OTP
    // For now, we'll just show the OTP input
    setShowOtpInput(true);
    Alert.alert('OTP Sent', `An OTP has been sent to ${phoneNumber}`);
  };
  
  const handleVerifyOTP = () => {
    // In a real app, you would verify the OTP with your backend
    // For demo purposes, any 4-digit OTP is accepted
    if (otp.length === 4) {
      navigation.navigate('UpiVerification');
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP');
    }
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScreenContainer style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.logo}>MoneyBuddy</Text>
          <Text style={styles.subtitle}>Campus Cash Coach</Text>
          
          <View style={styles.formContainer}>
            <Text style={styles.label}>Enter your phone number</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="10-digit mobile number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
              />
            </View>
            
            {showOtpInput && (
              <>
                <Text style={[styles.label, { marginTop: 20 }]}>Enter OTP</Text>
                <TextInput
                  style={styles.otpInput}
                  placeholder="4-digit OTP"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  maxLength={4}
                />
              </>
            )}
          </View>
        </View>
        
        <CustomButton 
          title={showOtpInput ? "Verify OTP" : "Send OTP"} 
          onPress={showOtpInput ? handleVerifyOTP : handleSendOTP} 
          style={styles.button}
        />
      </ScreenContainer>
    </KeyboardAvoidingView>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.secondary,
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: COLORS.text,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  countryCode: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.lightGray,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
  },
  otpInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    letterSpacing: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
});

export default PhoneVerificationScreen;
