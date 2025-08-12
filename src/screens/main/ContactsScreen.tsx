import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, Card, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';
import { useAppContext, Contact } from '../../context/AppContext';

type ContactsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Contacts'>;
  route: RouteProp<RootStackParamList, 'Contacts'>;
};

const ContactsScreen = ({ navigation, route }: ContactsScreenProps) => {
  const { billAmount } = route.params;
  const { contacts } = useAppContext();
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  
  const splitAmount = Math.round(billAmount / (selectedContacts.length + 1));

  const toggleContact = (contact: Contact) => {
    const isSelected = selectedContacts.some(c => c.id === contact.id);
    
    if (isSelected) {
      setSelectedContacts(selectedContacts.filter(c => c.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleRequestMoney = () => {
    navigation.navigate('RequestMoney', { 
      contacts: selectedContacts.map(c => c.name),
      amount: splitAmount 
    });
  };

  const renderContactItem = ({ item }: { item: Contact }) => {
    const isSelected = selectedContacts.some(c => c.id === item.id);
    
    return (
      <TouchableOpacity 
        style={[styles.contactItem, isSelected && styles.selectedContactItem]} 
        onPress={() => toggleContact(item)}
      >
        <View style={styles.contactAvatar}>
          <Text style={styles.contactInitial}>{item.name[0]}</Text>
        </View>
        <Text style={styles.contactName}>{item.name}</Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={16} color={COLORS.WHITE} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer>
      <Header
        title="Select Friends"
        onBack={() => navigation.goBack()}
      />
      
      <View style={styles.contentContainer}>
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Bill Details</Text>
          <Text style={styles.infoAmount}>₹{billAmount}</Text>
          <Text style={styles.infoSplit}>
            Split amount: ₹{splitAmount} each ({selectedContacts.length + 1} people)
          </Text>
        </Card>
        
        <Text style={styles.sectionTitle}>Select friends to split with</Text>
        
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contactsList}
        />
      </View>
      
      <CustomButton
        title={`Request ₹${splitAmount} from ${selectedContacts.length} friends`}
        onPress={handleRequestMoney}
        disabled={selectedContacts.length === 0}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  infoCard: {
    alignItems: 'center',
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
    marginBottom: 8,
  },
  infoAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginBottom: 8,
  },
  infoSplit: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.SECONDARY,
    marginBottom: 16,
  },
  contactsList: {
    paddingBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  selectedContactItem: {
    backgroundColor: 'rgba(0, 255, 157, 0.1)', // Light green
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  contactName: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    flex: 1,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactsScreen;
