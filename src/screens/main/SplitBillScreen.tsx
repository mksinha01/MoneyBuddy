import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, Card, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';

type SplitBillScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SplitBill'>;
  route: RouteProp<RootStackParamList, 'SplitBill'>;
};

const SplitBillScreen = ({ navigation, route }: SplitBillScreenProps) => {
  const { billAmount } = route.params;
  const splitAmount = Math.round(billAmount / 4); // Split between 4 people
  
  const handleSplitBill = () => {
    // Navigate to contacts screen to select people to split with
    navigation.navigate('Contacts', { billAmount });
  };
  
  const handlePayFull = () => {
    // Handle paying the full amount
    navigation.navigate('Confirmation', { 
      message: `Payment of ₹${billAmount} successful! Updated burn rate → ₹58/day` 
    });
  };

  return (
    <ScreenContainer>
      <Header
        title="Split the Bill"
        onBack={() => navigation.goBack()}
      />
      
      <View style={styles.contentContainer}>
        <Card style={styles.billCard}>
          <Text style={styles.billTitle}>Hostel 9 Mess</Text>
          <Text style={styles.billDate}>
            {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
          </Text>
          <Text style={styles.billAmount}>₹{billAmount}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.splitInfo}>
            <Text style={styles.splitText}>Split with 4 friends</Text>
            <Text style={styles.splitAmount}>₹{splitAmount} each</Text>
          </View>
        </Card>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Quick Tip:</Text>
          <Text style={styles.infoText}>
            Splitting bills helps you save more for your Secret Trip Fund!
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonGroup}>
        <CustomButton
          title="Pay Full Amount"
          onPress={handlePayFull}
          style={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
        />
        <CustomButton
          title="Split Bill"
          onPress={handleSplitBill}
          style={styles.primaryButton}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 24,
  },
  billCard: {
    padding: 24,
    alignItems: 'center',
  },
  billTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  billDate: {
    fontSize: 14,
    color: COLORS.DARK_GRAY,
    marginBottom: 24,
  },
  billAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.LIGHT_GRAY,
    marginBottom: 24,
  },
  splitInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  splitText: {
    fontSize: 16,
    color: COLORS.SECONDARY,
  },
  splitAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
  infoBox: {
    padding: 16,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 12,
    marginTop: 24,
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: COLORS.LIGHT_GRAY,
    shadowOpacity: 0,
    elevation: 0,
  },
  secondaryButtonText: {
    color: COLORS.SECONDARY,
  },
});

export default SplitBillScreen;
