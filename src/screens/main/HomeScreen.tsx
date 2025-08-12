import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Card } from '../../components/ui';
import { COLORS } from '../../theme/colors';
import { useAppContext, SavingJar } from '../../context/AppContext';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, toggleStealthMode } = useAppContext();
  const [showBalance, setShowBalance] = useState(false);

  const handleJarPress = (jar: SavingJar) => {
    toggleStealthMode(jar.id);
    Alert.alert(
      jar.isStealthModeOn ? 'Stealth Mode OFF' : 'Stealth Mode ON',
      jar.isStealthModeOn 
        ? `Your ${jar.name} balance is now visible.` 
        : `Your ${jar.name} balance is now hidden from friends.`
    );
  };
  
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleChatbotPress = () => {
    navigation.navigate('Chatbot');
  };

  const handleScanPress = () => {
    navigation.navigate('Scan');
  };

  // Calculate progress for each jar
  const calculateProgress = (jar: SavingJar) => {
    if (!jar.target) return 1;
    return jar.balance / jar.target;
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello there! 👋</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={COLORS.SECONDARY} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceTitle}>Monthly Balance</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility} style={styles.eyeButton}>
              <Ionicons name={showBalance ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.SECONDARY} />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {showBalance ? `₹${user.balance.toLocaleString()}` : "₹•••••"}
          </Text>
          <View style={styles.burnRateContainer}>
            <Text style={styles.burnRateText}>
              Daily Burn Rate: {showBalance ? `₹${user.dailyBurnRate}/day` : "₹••/day"}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: showBalance ? `${(user.balance / user.allowance) * 100}%` : "60%" }]} />
          </View>
        </Card>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('RequestMoney', { contacts: [], amount: 0 })}>
            <View style={[styles.actionIcon, { backgroundColor: '#4A66E8' }]}>
              <Ionicons name="arrow-down" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Request</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('SplitBill', { billAmount: 0 })}>
            <View style={[styles.actionIcon, { backgroundColor: '#28C76F' }]}>
              <Ionicons name="people" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Split</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleScanPress}>
            <View style={[styles.actionIcon, { backgroundColor: '#FF9F43' }]}>
              <Ionicons name="qr-code" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Scan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Jar Feature', 'Create a savings jar for specific goals')}>
            <View style={[styles.actionIcon, { backgroundColor: '#EA5455' }]}>
              <Ionicons name="wallet" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Jar</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saving Jars</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>+ Add New</Text>
          </TouchableOpacity>
        </View>

        {user.savingJars.map((jar) => (
          <TouchableOpacity key={jar.id} onPress={() => handleJarPress(jar)}>
            <Card style={styles.jarCard}>
              <View style={styles.jarHeader}>
                <Text style={styles.jarName}>{jar.name}</Text>
                {jar.isStealthModeOn && (
                  <View style={styles.stealthBadge}>
                    <Text style={styles.stealthText}>🕶️ Hidden</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.jarAmount}>
                {jar.isStealthModeOn ? '••••••' : `₹${jar.balance.toLocaleString()}`}
                {jar.target && !jar.isStealthModeOn && ` / ₹${jar.target.toLocaleString()}`}
              </Text>
              
              {jar.target && !jar.isStealthModeOn && (
                <View style={styles.jarProgressContainer}>
                  <View 
                    style={[
                      styles.jarProgress, 
                      { width: `${calculateProgress(jar) * 100}%` }
                    ]} 
                  />
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See All</Text>
          </TouchableOpacity>
        </View>

        {user.transactions.slice(0, 5).map((transaction) => (
          <Card key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <Text style={styles.transactionName}>{transaction.description}</Text>
              <Text 
                style={[
                  styles.transactionAmount,
                  transaction.type === 'income' 
                    ? styles.incomeAmount 
                    : styles.expenseAmount
                ]}
              >
                {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
              </Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionCategory}>{transaction.category}</Text>
              <Text style={styles.transactionDate}>
                {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
          <Ionicons name="scan-outline" size={24} color={COLORS.WHITE} />
          <Text style={styles.scanButtonText}>Scan & Split</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.chatButton} onPress={handleChatbotPress}>
          <Ionicons name="chatbubble-outline" size={24} color={COLORS.SECONDARY} />
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
  },
  date: {
    fontSize: 12,
    color: COLORS.DARK_GRAY,
    marginTop: 4,
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: COLORS.SECONDARY,
    marginVertical: 16,
  },
  balanceTitle: {
    fontSize: 14,
    color: COLORS.WHITE,
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 16,
  },
  burnRateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  burnRateText: {
    fontSize: 12,
    color: COLORS.WHITE,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.SECONDARY,
  },
  sectionAction: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
  jarCard: {
    marginBottom: 12,
  },
  jarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jarName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.SECONDARY,
  },
  stealthBadge: {
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  stealthText: {
    fontSize: 12,
    color: COLORS.WHITE,
  },
  jarAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  jarProgressContainer: {
    height: 6,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 3,
    overflow: 'hidden',
  },
  jarProgress: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 3,
  },
  transactionCard: {
    marginBottom: 8,
    padding: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.SECONDARY,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: COLORS.SUCCESS,
  },
  expenseAmount: {
    color: COLORS.ERROR,
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: COLORS.DARK_GRAY,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.DARK_GRAY,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    flex: 1,
    marginRight: 16,
    justifyContent: 'center',
  },
  scanButtonText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    marginLeft: 8,
  },
  chatButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyeButton: {
    padding: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.SECONDARY,
    fontWeight: '500',
  },
});

export default HomeScreen;
