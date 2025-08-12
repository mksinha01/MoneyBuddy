import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type UpiVerificationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'UpiVerification'>;
};

const UpiVerificationScreen = ({ navigation }: UpiVerificationScreenProps) => {
  const [upiId, setUpiId] = useState('');
  
  const handleVerifyUpi = () => {
    // Validate UPI ID format
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    if (!upiRegex.test(upiId)) {
      Alert.alert('Invalid UPI ID', 'Please enter a valid UPI ID (e.g., name@upi)');
      return;
    }
    
    // In a real app, you would verify the UPI ID with your backend
    // For now, we'll just navigate to the next screen
    navigation.navigate('CollegeSelector');
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.logo}>MoneyBuddy</Text>
          <Text style={styles.subtitle}>Campus Cash Coach</Text>
          
          <View style={styles.formContainer}>
            <Text style={styles.label}>Link your UPI ID</Text>
            <TextInput
              style={styles.input}
              placeholder="yourname@upi"
              keyboardType="email-address"
              value={upiId}
              onChangeText={setUpiId}
              autoCapitalize="none"
            />
            <Text style={styles.info}>
              Linking your UPI ID enables secure payments directly from your bank account.
            </Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonText} onPress={handleVerifyUpi}>Verify & Continue</Text>
          </View>
          <Text style={styles.skipText} onPress={() => navigation.navigate('CollegeSelector')}>
            Skip for now
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A66E8',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4E5D78',
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
    color: '#2E3A59',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D5DFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
  },
  info: {
    fontSize: 14,
    color: '#8A94A6',
    marginTop: 12,
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#4A66E8',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  skipText: {
    fontSize: 14,
    color: '#8A94A6',
    textDecorationLine: 'underline',
  },
});

export default UpiVerificationScreen;
