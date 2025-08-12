import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, Card, CustomButton, Slider } from '../../components/ui';
import { COLORS } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

type ImpulseBlockerScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ImpulseBlocker'>;
};

const ImpulseBlockerScreen = ({ navigation }: ImpulseBlockerScreenProps) => {
  const [blockerEnabled, setBlockerEnabled] = useState(false);
  const [coolingPeriod, setCoolingPeriod] = useState(1); // hours
  const [limitAmount, setLimitAmount] = useState(1000); // rupees
  const [notifyFriends, setNotifyFriends] = useState(false);
  const [blockOnlineShops, setBlockOnlineShops] = useState(false);

  const formatCoolingPeriod = () => {
    return coolingPeriod === 1 ? '1 hour' : `${coolingPeriod} hours`;
  };

  const formatLimitAmount = () => {
    return `₹${limitAmount}`;
  };

  return (
    <ScreenContainer>
      <Header
        title="Impulse Blocker"
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Card style={styles.mainCard}>
            <Text style={styles.title}>Control Impulse Spending</Text>
            <Text style={styles.subtitle}>
              Add a cooling period for purchases above a certain amount to avoid impulse buying
            </Text>
            
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>Enable Impulse Blocker</Text>
              <Switch
                trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
                thumbColor={COLORS.WHITE}
                ios_backgroundColor={COLORS.MID_GRAY}
                onValueChange={setBlockerEnabled}
                value={blockerEnabled}
              />
            </View>
          </Card>
          
          {blockerEnabled && (
            <>
              <Text style={styles.sectionTitle}>Blocker Settings</Text>
              
              <Card style={styles.settingsCard}>
                <Text style={styles.settingLabel}>Cooling Period</Text>
                <Text style={styles.settingValue}>{formatCoolingPeriod()}</Text>
                <Slider
                  minimumValue={1}
                  maximumValue={24}
                  step={1}
                  value={coolingPeriod}
                  onValueChange={setCoolingPeriod}
                  minimumTrackTintColor={COLORS.PRIMARY}
                  maximumTrackTintColor={COLORS.LIGHT_GRAY}
                />
                <Text style={styles.settingDescription}>
                  Wait time before confirming purchases above your limit
                </Text>
                
                <View style={styles.divider} />
                
                <Text style={styles.settingLabel}>Purchase Limit</Text>
                <Text style={styles.settingValue}>{formatLimitAmount()}</Text>
                <Slider
                  minimumValue={500}
                  maximumValue={5000}
                  step={100}
                  value={limitAmount}
                  onValueChange={setLimitAmount}
                  minimumTrackTintColor={COLORS.PRIMARY}
                  maximumTrackTintColor={COLORS.LIGHT_GRAY}
                />
                <Text style={styles.settingDescription}>
                  Transactions above this amount will trigger the cooling period
                </Text>
              </Card>
              
              <Card>
                <View style={styles.toggleContainer}>
                  <View style={styles.toggleInfo}>
                    <Text style={styles.toggleLabel}>Notify a trusted friend</Text>
                    <Text style={styles.toggleDescription}>
                      Send a notification to your selected friend when you try to make a large purchase
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
                    thumbColor={COLORS.WHITE}
                    ios_backgroundColor={COLORS.MID_GRAY}
                    onValueChange={setNotifyFriends}
                    value={notifyFriends}
                  />
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.toggleContainer}>
                  <View style={styles.toggleInfo}>
                    <Text style={styles.toggleLabel}>Block online shopping apps</Text>
                    <Text style={styles.toggleDescription}>
                      Restrict access to shopping apps during late night hours (10PM - 6AM)
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
                    thumbColor={COLORS.WHITE}
                    ios_backgroundColor={COLORS.MID_GRAY}
                    onValueChange={setBlockOnlineShops}
                    value={blockOnlineShops}
                  />
                </View>
              </Card>
              
              <Card style={styles.exampleCard}>
                <Text style={styles.exampleTitle}>How it works:</Text>
                <View style={styles.exampleItem}>
                  <MaterialIcons name="shopping-cart" size={24} color={COLORS.PRIMARY} style={styles.icon} />
                  <View style={styles.exampleTextContainer}>
                    <Text style={styles.exampleHeading}>You try to purchase something expensive</Text>
                    <Text style={styles.exampleDescription}>
                      When you try to spend more than ₹{limitAmount} in one go
                    </Text>
                  </View>
                </View>
                
                <View style={styles.exampleItem}>
                  <MaterialIcons name="timer" size={24} color={COLORS.PRIMARY} style={styles.icon} />
                  <View style={styles.exampleTextContainer}>
                    <Text style={styles.exampleHeading}>Cooling period activates</Text>
                    <Text style={styles.exampleDescription}>
                      The app will hold your transaction for {formatCoolingPeriod()}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.exampleItem}>
                  <MaterialIcons name="check-circle" size={24} color={COLORS.PRIMARY} style={styles.icon} />
                  <View style={styles.exampleTextContainer}>
                    <Text style={styles.exampleHeading}>Confirm or cancel later</Text>
                    <Text style={styles.exampleDescription}>
                      After the cooling period, you can decide if you still want it
                    </Text>
                  </View>
                </View>
              </Card>
              
              <Card style={styles.tipsCard}>
                <Text style={styles.tipsTitle}>Smart Spending Tips:</Text>
                <Text style={styles.tipItem}>
                  • Add items to your wishlist and wait 7 days before buying
                </Text>
                <Text style={styles.tipItem}>
                  • Try the "one in, one out" rule for new purchases
                </Text>
                <Text style={styles.tipItem}>
                  • Calculate the "hours worked" cost of each purchase
                </Text>
              </Card>
            </>
          )}
        </View>
      </ScrollView>
      
      <CustomButton
        title="Save Settings"
        onPress={() => navigation.goBack()}
        disabled={!blockerEnabled}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  mainCard: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.DARK_GRAY,
    marginBottom: 24,
    lineHeight: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleInfo: {
    flex: 1,
    paddingRight: 16,
  },
  toggleLabel: {
    fontSize: 16,
    color: COLORS.SECONDARY,
  },
  toggleDescription: {
    fontSize: 12,
    color: COLORS.DARK_GRAY,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  settingsCard: {
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 12,
  },
  settingDescription: {
    fontSize: 12,
    color: COLORS.DARK_GRAY,
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginVertical: 16,
  },
  exampleCard: {
    marginTop: 24,
    marginBottom: 16,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 16,
  },
  exampleItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  exampleTextContainer: {
    flex: 1,
  },
  exampleHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 4,
  },
  exampleDescription: {
    fontSize: 12,
    color: COLORS.DARK_GRAY,
    lineHeight: 18,
  },
  tipsCard: {
    marginTop: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 14,
    color: COLORS.SECONDARY,
    marginBottom: 4,
    lineHeight: 20,
  },
});

export default ImpulseBlockerScreen;
