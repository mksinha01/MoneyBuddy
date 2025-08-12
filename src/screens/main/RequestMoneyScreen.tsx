import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, Card, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';

type RequestMoneyScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'RequestMoney'>;
  route: RouteProp<RootStackParamList, 'RequestMoney'>;
};

const RequestMoneyScreen = ({ navigation, route }: RequestMoneyScreenProps) => {
  const { contacts, amount } = route.params;
  const [message, setMessage] = useState(`Yaara, pay up! 😜 Hostel 9 Mess bill - ₹${amount}`);
  const [useWhatsApp, setUseWhatsApp] = useState(true);
  
  const handleSendRequest = () => {
    // In a real app, this would integrate with WhatsApp or SMS
    navigation.navigate('Confirmation', { 
      message: `₹${amount * contacts.length} collection request sent! Burn rate updated → ₹58/day` 
    });
  };

  return (
    <ScreenContainer>
      <Header
        title="Request Money"
        onBack={() => navigation.goBack()}
      />
      
      <View style={styles.contentContainer}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Money Request</Text>
          <Text style={styles.summaryAmount}>₹{amount}</Text>
          <Text style={styles.summaryText}>
            From {contacts.join(', ')}
          </Text>
        </Card>
        
        <Text style={styles.sectionTitle}>Message</Text>
        <Card style={styles.messageCard}>
          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
            multiline
            placeholder="Add a message..."
          />
          
          <View style={styles.messagePreview}>
            <Text style={styles.previewTitle}>Preview:</Text>
            <View style={styles.whatsappPreview}>
              <Text style={styles.previewText}>{message}</Text>
              <Text style={styles.previewLink}>Payment Link: upi://pay?pa=moneybuddy</Text>
            </View>
          </View>
        </Card>
        
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>Send via WhatsApp</Text>
          <Switch
            trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
            thumbColor={COLORS.WHITE}
            ios_backgroundColor={COLORS.MID_GRAY}
            onValueChange={setUseWhatsApp}
            value={useWhatsApp}
          />
        </View>
      </View>
      
      <CustomButton
        title={useWhatsApp ? "Send WhatsApp Request" : "Send SMS Request"}
        onPress={handleSendRequest}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  summaryCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: COLORS.SECONDARY,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  messageCard: {
    marginBottom: 16,
  },
  messageInput: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  messagePreview: {
    marginTop: 16,
    padding: 12,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
  },
  previewTitle: {
    fontSize: 12,
    color: COLORS.DARK_GRAY,
    marginBottom: 8,
  },
  whatsappPreview: {
    backgroundColor: '#DCF8C6', // WhatsApp chat bubble color
    padding: 12,
    borderRadius: 8,
  },
  previewText: {
    fontSize: 14,
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  previewLink: {
    fontSize: 14,
    color: '#0000FF', // Link color
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.SECONDARY,
  },
});

export default RequestMoneyScreen;
