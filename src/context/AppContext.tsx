import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for our app state
interface MoneyBuddyUser {
  college: string;
  allowance: number;
  hasGigIncome: boolean;
  balance: number;
  dailyBurnRate: number;
  savingJars: SavingJar[];
  transactions: Transaction[];
}

export interface SavingJar {
  id: string;
  name: string;
  balance: number;
  target?: number;
  isStealthModeOn: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  date: string;
  description: string;
}

export interface Contact {
  id: string;
  name: string;
  isSelected?: boolean;
}

// Default user data
const defaultUser: MoneyBuddyUser = {
  college: '',
  allowance: 8000,
  hasGigIncome: false,
  balance: 2300,
  dailyBurnRate: 73,
  savingJars: [
    {
      id: '1',
      name: 'Secret Goa Trip',
      balance: 1200,
      target: 5000,
      isStealthModeOn: false
    },
    {
      id: '2',
      name: 'Dhaba Nights',
      balance: 320,
      isStealthModeOn: false
    },
    {
      id: '3',
      name: 'Dihing Adventure Fund',
      balance: 500,
      target: 2000,
      isStealthModeOn: false
    }
  ],
  transactions: [
    {
      id: '1',
      amount: 350,
      type: 'expense',
      category: 'Food',
      date: '2025-08-12',
      description: 'Zomato'
    },
    {
      id: '2',
      amount: 120,
      type: 'expense',
      category: 'Shopping',
      date: '2025-08-12',
      description: 'Campus Store'
    },
    {
      id: '3',
      amount: 5000,
      type: 'income',
      category: 'Freelance',
      date: '2025-08-05',
      description: 'Freelance Project'
    },
    {
      id: '4',
      amount: 3000,
      type: 'expense',
      category: 'Housing',
      date: '2025-08-02',
      description: 'Rent'
    },
    {
      id: '5',
      amount: 1000,
      type: 'income',
      category: 'Gift',
      date: '2025-08-01',
      description: 'Birthday Gift'
    },
    {
      id: '6',
      amount: 300,
      type: 'expense',
      category: 'Food',
      date: '2025-07-29',
      description: 'Swiggy'
    },
    {
      id: '7',
      amount: 150,
      type: 'expense',
      category: 'Food',
      date: '2025-07-28',
      description: 'Campus Cafe'
    },
    {
      id: '8',
      amount: 8000,
      type: 'income',
      category: 'Work',
      date: '2025-07-25',
      description: 'Internship'
    }
  ]
};

// Sample contacts
export const sampleContacts: Contact[] = [
  { id: '1', name: 'Raj' },
  { id: '2', name: 'Priya' },
  { id: '3', name: 'Amit' },
  { id: '4', name: 'Shreya' },
  { id: '5', name: 'Rahul' }
];

// Chatbot related types and data
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

// Create a context for our app
interface AppContextProps {
  user: MoneyBuddyUser;
  setUser: React.Dispatch<React.SetStateAction<MoneyBuddyUser>>;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  chatHistory: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateBalance: (amount: number) => void;
  updateBurnRate: (rate: number) => void;
  updateJar: (jarId: string, amount: number) => void;
  toggleStealthMode: (jarId: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

// Create the context
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MoneyBuddyUser>(defaultUser);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Load data from AsyncStorage on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
        
        const onboardedStatus = await AsyncStorage.getItem('isOnboarded');
        if (onboardedStatus) {
          setIsOnboarded(JSON.parse(onboardedStatus));
        }
        
        const chatHistoryData = await AsyncStorage.getItem('chatHistory');
        if (chatHistoryData) {
          setChatHistory(JSON.parse(chatHistoryData));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };
    
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('isOnboarded', JSON.stringify(isOnboarded));
        await AsyncStorage.setItem('chatHistory', JSON.stringify(chatHistory));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };
    
    saveData();
  }, [user, isOnboarded, chatHistory]);

  // Add a new chat message
  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    setChatHistory(prevMessages => [...prevMessages, newMessage]);
  };

  // Update user balance
  const updateBalance = (amount: number) => {
    setUser(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  // Update burn rate
  const updateBurnRate = (rate: number) => {
    setUser(prev => ({
      ...prev,
      dailyBurnRate: rate
    }));
  };

  // Update jar balance
  const updateJar = (jarId: string, amount: number) => {
    setUser(prev => ({
      ...prev,
      savingJars: prev.savingJars.map(jar => 
        jar.id === jarId ? { ...jar, balance: jar.balance + amount } : jar
      )
    }));
  };

  // Toggle stealth mode for a jar
  const toggleStealthMode = (jarId: string) => {
    setUser(prev => ({
      ...prev,
      savingJars: prev.savingJars.map(jar => 
        jar.id === jarId ? { ...jar, isStealthModeOn: !jar.isStealthModeOn } : jar
      )
    }));
  };

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    setUser(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions]
    }));
    
    // Update balance based on transaction type
    if (transaction.type === 'income') {
      updateBalance(transaction.amount);
    } else {
      updateBalance(-transaction.amount);
    }
  };

  // Provider value
  const value: AppContextProps = {
    user,
    setUser,
    isOnboarded,
    setIsOnboarded,
    contacts,
    setContacts,
    chatHistory,
    addChatMessage,
    updateBalance,
    updateBurnRate,
    updateJar,
    toggleStealthMode,
    addTransaction
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
};
