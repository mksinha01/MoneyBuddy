import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, Card, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';

type PeerPressureShieldScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PeerPressureShield'>;
};

const PeerPressureShieldScreen = ({ navigation }: PeerPressureShieldScreenProps) => {
  const [shieldEnabled, setShieldEnabled] = useState(false);
  const [autoHideEnabled, setAutoHideEnabled] = useState(false);
  const [fakeBudgetEnabled, setFakeBudgetEnabled] = useState(false);

  return (
    <ScreenContainer>
      <Header
        title="Peer Pressure Shield"
        onBack={() => navigation.goBack()}
      />
      
      <View style={styles.contentContainer}>
        <Card style={styles.mainCard}>
          <Text style={styles.title}>Avoid Peer Pressure</Text>
          <Text style={styles.subtitle}>
            Protect your budget from peer pressure by hiding your real balance when needed
          </Text>
          
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Enable Peer Pressure Shield</Text>
            <Switch
              trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
              thumbColor={COLORS.WHITE}
              ios_backgroundColor={COLORS.MID_GRAY}
              onValueChange={setShieldEnabled}
              value={shieldEnabled}
            />
          </View>
        </Card>
        
        {shieldEnabled && (
          <>
            <Text style={styles.sectionTitle}>Shield Options</Text>
            
            <Card>
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>Auto-hide when screen shared</Text>
                  <Text style={styles.toggleDescription}>
                    Automatically show ₹0 balance when your screen is being shared
                  </Text>
                </View>
                <Switch
                  trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
                  thumbColor={COLORS.WHITE}
                  ios_backgroundColor={COLORS.MID_GRAY}
                  onValueChange={setAutoHideEnabled}
                  value={autoHideEnabled}
                />
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>Show fake budget</Text>
                  <Text style={styles.toggleDescription}>
                    Display a lower amount (₹500) when friends are around
                  </Text>
                </View>
                <Switch
                  trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
                  thumbColor={COLORS.WHITE}
                  ios_backgroundColor={COLORS.MID_GRAY}
                  onValueChange={setFakeBudgetEnabled}
                  value={fakeBudgetEnabled}
                />
              </View>
            </Card>
            
            <View style={styles.previewContainer}>
              <Text style={styles.previewTitle}>Preview:</Text>
              <Card style={styles.previewCard}>
                <Text style={styles.previewLabel}>Normal View:</Text>
                <Text style={styles.previewAmount}>₹2,300</Text>
                
                <Text style={[styles.previewLabel, styles.previewLabelMargin]}>Shielded View:</Text>
                {fakeBudgetEnabled ? (
                  <Text style={styles.previewAmount}>₹500</Text>
                ) : (
                  <Text style={styles.previewAmount}>₹0</Text>
                )}
                <Text style={styles.previewMessage}>
                  "Sorry, I'm on a tight budget this month!"
                </Text>
              </Card>
            </View>
            
            <Card style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>Tips to Handle Peer Pressure:</Text>
              <Text style={styles.tipItem}>
                • Suggest alternative plans that cost less
              </Text>
              <Text style={styles.tipItem}>
                • Be honest about your saving goals
              </Text>
              <Text style={styles.tipItem}>
                • Offer to host at your place instead
              </Text>
            </Card>
          </>
        )}
      </View>
      
      <CustomButton
        title="Save Settings"
        onPress={() => navigation.goBack()}
        disabled={!shieldEnabled}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 16,
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
  divider: {
    height: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginVertical: 16,
  },
  previewContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  previewCard: {
    padding: 16,
  },
  previewLabel: {
    fontSize: 14,
    color: COLORS.DARK_GRAY,
  },
  previewLabelMargin: {
    marginTop: 16,
  },
  previewAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginTop: 4,
  },
  previewMessage: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontStyle: 'italic',
    marginTop: 4,
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

export default PeerPressureShieldScreen;
