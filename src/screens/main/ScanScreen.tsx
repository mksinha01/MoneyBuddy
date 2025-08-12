import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, Card, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';

type ScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scan'>;

const ScanScreen = () => {
  const navigation = useNavigation<ScanScreenNavigationProp>();
  const [scanning, setScanning] = useState(false);
  
  const handleScanStart = () => {
    setScanning(true);
    
    // Mock scanning process
    setTimeout(() => {
      setScanning(false);
      // Navigate to split bill screen with mock data
      navigation.navigate('SplitBill', { billAmount: 800 });
    }, 2000);
  };

  return (
    <ScreenContainer>
      <Header title="Scan QR Code" onBack={() => navigation.goBack()} />
      
      <View style={styles.contentContainer}>
        {scanning ? (
          <View style={styles.scanningContainer}>
            <View style={styles.scannerOverlay}>
              <View style={styles.scanLine} />
            </View>
            <Text style={styles.scanningText}>Scanning...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.instruction}>
              Scan a QR code to pay or split bills with friends
            </Text>
            
            <View style={styles.mockQrContainer}>
              <View style={styles.mockQr}>
                <Text style={styles.mockQrText}>Hostel 9 Mess</Text>
                <Text style={styles.mockQrText}>₹800</Text>
              </View>
            </View>
            
            <Card style={styles.recentScansCard}>
              <Text style={styles.recentScansTitle}>Recent Scans</Text>
              
              <View style={styles.recentScanItem}>
                <View style={styles.recentScanIcon}>
                  <Ionicons name="fast-food-outline" size={20} color={COLORS.WHITE} />
                </View>
                <View style={styles.recentScanInfo}>
                  <Text style={styles.recentScanName}>Hostel 9 Mess</Text>
                  <Text style={styles.recentScanDate}>Yesterday</Text>
                </View>
                <Text style={styles.recentScanAmount}>₹320</Text>
              </View>
              
              <View style={styles.recentScanItem}>
                <View style={styles.recentScanIcon}>
                  <Ionicons name="cafe-outline" size={20} color={COLORS.WHITE} />
                </View>
                <View style={styles.recentScanInfo}>
                  <Text style={styles.recentScanName}>Campus Cafe</Text>
                  <Text style={styles.recentScanDate}>Aug 10</Text>
                </View>
                <Text style={styles.recentScanAmount}>₹150</Text>
              </View>
            </Card>
          </>
        )}
      </View>
      
      {!scanning && (
        <CustomButton 
          title="Scan QR Code" 
          onPress={handleScanStart}
          style={styles.scanButton}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.DARK_GRAY,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  mockQrContainer: {
    marginBottom: 32,
  },
  mockQr: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  mockQrText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scanningContainer: {
    alignItems: 'center',
  },
  scannerOverlay: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scanLine: {
    height: 2,
    width: '80%',
    backgroundColor: COLORS.PRIMARY,
    position: 'absolute',
    top: '50%',
    // Add animation here in real implementation
  },
  scanningText: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  recentScansCard: {
    width: '100%',
  },
  recentScansTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 16,
  },
  recentScanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recentScanIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentScanInfo: {
    flex: 1,
  },
  recentScanName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.SECONDARY,
  },
  recentScanDate: {
    fontSize: 12,
    color: COLORS.DARK_GRAY,
  },
  recentScanAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.ERROR,
  },
  scanButton: {
    marginTop: 24,
  },
});

export default ScanScreen;
