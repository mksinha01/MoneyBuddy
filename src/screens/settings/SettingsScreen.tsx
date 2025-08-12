import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, Card } from '../../components/ui';
import { COLORS } from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { user, setIsOnboarded } = useAppContext();
  
  const [hiddenBalanceEnabled, setHiddenBalanceEnabled] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  
  const handleLogout = () => {
    // Reset onboarding status
    setIsOnboarded(false);
  };
  
  const handlePeerPressureShield = () => {
    navigation.navigate('PeerPressureShield');
  };
  
  const handleImpulseBlocker = () => {
    navigation.navigate('ImpulseBlocker');
  };

  const renderSettingsItem = (
    title: string,
    subtitle: string | null,
    rightElement: React.ReactNode,
    onPress?: () => void,
    iconName?: React.ComponentProps<typeof Ionicons>['name']
  ) => (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      disabled={!onPress}
    >
      {iconName && (
        <View style={styles.settingsItemIcon}>
          <Ionicons name={iconName} size={22} color={COLORS.SECONDARY} />
        </View>
      )}
      
      <View style={styles.settingsItemContent}>
        <Text style={styles.settingsItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
      </View>
      
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Settings" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Card>
          {renderSettingsItem(
            user.college,
            'College',
            <Ionicons name="chevron-forward" size={20} color={COLORS.DARK_GRAY} />,
            undefined,
            'school-outline'
          )}
          
          {renderSettingsItem(
            `₹${user.allowance}`,
            'Monthly Allowance',
            <Ionicons name="chevron-forward" size={20} color={COLORS.DARK_GRAY} />,
            undefined,
            'wallet-outline'
          )}
        </Card>
        
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        <Card>
          {renderSettingsItem(
            'Peer Pressure Shield',
            'Hide balance when screen is shared',
            <Ionicons name="chevron-forward" size={20} color={COLORS.DARK_GRAY} />,
            handlePeerPressureShield,
            'eye-off-outline'
          )}
          
          {renderSettingsItem(
            'Impulse Blocker',
            'Set cooling period for purchases',
            <Ionicons name="chevron-forward" size={20} color={COLORS.DARK_GRAY} />,
            handleImpulseBlocker,
            'time-outline'
          )}
          
          {renderSettingsItem(
            'Show ₹0 balance when screen shared',
            null,
            <Switch
              trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
              thumbColor={COLORS.WHITE}
              ios_backgroundColor={COLORS.MID_GRAY}
              onValueChange={setHiddenBalanceEnabled}
              value={hiddenBalanceEnabled}
            />,
            undefined,
            'shield-outline'
          )}
        </Card>
        
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Card>
          {renderSettingsItem(
            'Push Notifications',
            null,
            <Switch
              trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
              thumbColor={COLORS.WHITE}
              ios_backgroundColor={COLORS.MID_GRAY}
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />,
            undefined,
            'notifications-outline'
          )}
          
          {renderSettingsItem(
            'Dark Mode',
            null,
            <Switch
              trackColor={{ false: COLORS.MID_GRAY, true: COLORS.PRIMARY }}
              thumbColor={COLORS.WHITE}
              ios_backgroundColor={COLORS.MID_GRAY}
              onValueChange={setDarkModeEnabled}
              value={darkModeEnabled}
            />,
            undefined,
            'moon-outline'
          )}
        </Card>
        
        <Text style={styles.sectionTitle}>Rewards</Text>
        <Card>
          {renderSettingsItem(
            'Invite Friends',
            'Unlock ₹100 + Finance Guru badge',
            <Ionicons name="chevron-forward" size={20} color={COLORS.DARK_GRAY} />,
            undefined,
            'gift-outline'
          )}
          
          {renderSettingsItem(
            'Campus Rewards',
            'Scan QR codes to earn points',
            <Ionicons name="chevron-forward" size={20} color={COLORS.DARK_GRAY} />,
            undefined,
            'trophy-outline'
          )}
        </Card>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>MoneyBuddy v1.0.0</Text>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  settingsItemIcon: {
    marginRight: 12,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    color: COLORS.SECONDARY,
  },
  settingsItemSubtitle: {
    fontSize: 12,
    color: COLORS.DARK_GRAY,
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 40,
    alignItems: 'center',
    padding: 16,
  },
  logoutText: {
    color: COLORS.ERROR,
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    color: COLORS.DARK_GRAY,
    fontSize: 12,
    marginTop: 16,
    marginBottom: 24,
  },
});

export default SettingsScreen;
