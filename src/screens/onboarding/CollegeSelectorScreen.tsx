import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header, CustomButton } from '../../components/ui';
import { COLORS } from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

type CollegeSelectorScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CollegeSelector'>;
};

interface CollegeOption {
  id: string;
  name: string;
  logo: string; // This would be a URL or require() for an image
}

const colleges: CollegeOption[] = [
  {
    id: 'iitg',
    name: 'IIT Guwahati',
    logo: '🎓', // Placeholder emoji
  },
  {
    id: 'du',
    name: 'Delhi University',
    logo: '🎓', // Placeholder emoji
  },
  {
    id: 'bits',
    name: 'BITS Pilani',
    logo: '🎓', // Placeholder emoji
  },
];

const CollegeSelectorScreen = ({ navigation }: CollegeSelectorScreenProps) => {
  const { user, setUser } = useAppContext();
  const [selectedCollege, setSelectedCollege] = useState<string>('');

  const handleSelectCollege = (collegeId: string) => {
    setSelectedCollege(collegeId);
    const college = colleges.find(c => c.id === collegeId);
    if (college) {
      setUser({
        ...user,
        college: college.name
      });
    }
  };

  const handleContinue = () => {
    navigation.navigate('SetAllowance');
  };

  const renderCollegeItem = ({ item }: { item: CollegeOption }) => (
    <TouchableOpacity
      style={[
        styles.collegeItem,
        selectedCollege === item.id && styles.selectedCollegeItem,
      ]}
      onPress={() => handleSelectCollege(item.id)}
    >
      <Text style={styles.collegeLogo}>{item.logo}</Text>
      <Text style={styles.collegeName}>{item.name}</Text>
      {selectedCollege === item.id && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <Header title="Select Your College" />

      <Text style={styles.subtitle}>
        Choose your campus to get personalized features
      </Text>

      <FlatList
        data={colleges}
        renderItem={renderCollegeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.collegeList}
      />

      <CustomButton
        title="Continue"
        onPress={handleContinue}
        disabled={!selectedCollege}
        style={styles.button}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
    marginVertical: 16,
    textAlign: 'center',
  },
  collegeList: {
    paddingVertical: 16,
  },
  collegeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCollegeItem: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
  },
  collegeLogo: {
    fontSize: 40,
    marginRight: 16,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.SECONDARY,
  },
  checkmark: {
    marginLeft: 'auto',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 24,
  },
});

export default CollegeSelectorScreen;
