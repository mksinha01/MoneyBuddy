import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { ScreenContainer, Header } from '../../components/ui';
import { COLORS } from '../../theme/colors';
import { useAppContext, ChatMessage } from '../../context/AppContext';

type ChatbotScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chatbot'>;

const ChatbotScreen = () => {
  const navigation = useNavigation<ChatbotScreenNavigationProp>();
  const { chatHistory, addChatMessage, user, updateJar } = useAppContext();
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  // Predefined quick replies
  const quickReplies = [
    'Why am I broke?',
    'Explain this spend',
    'Hide money',
    'Split bill help',
    'Credit score kya hota hai?',
    'How to save 20%?'
  ];
  
  // Scroll to bottom on new message
  useEffect(() => {
    if (flatListRef.current && chatHistory.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [chatHistory]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message to chat
    addChatMessage({
      text: message,
      sender: 'user'
    });
    
    // Clear input
    setMessage('');
    
    // Process the message and generate a bot response
    processUserMessage(message);
  };
  
  // Process user message and generate bot response
  const processUserMessage = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Simulate response delay
    setTimeout(() => {
      // Check for specific questions and provide canned responses
      if (lowerText.includes('why am i broke') || lowerText.includes('where is my money')) {
        addChatMessage({
          text: "I analyzed your spending, and here's what I found:",
          sender: 'bot'
        });
        
        // Add another message after a delay to simulate thinking
        setTimeout(() => {
          addChatMessage({
            text: "📊 Food Delivery: ₹1,800 (60% of spending)\n\nSuggestion: Cook 2x/week? Save ₹1k → Move to Secret Fund?",
            sender: 'bot'
          });
          
          // Add quick action buttons
          setTimeout(() => {
            addChatMessage({
              text: "Would you like to move ₹200 to your Secret Trip Fund?",
              sender: 'bot'
            });
          }, 500);
        }, 1000);
      } 
      else if (lowerText.includes('credit score') || lowerText.includes('kya hota hai')) {
        addChatMessage({
          text: "Credit score एक number होता है (300-900 के बीच) जो आपकी financial reliability दिखाता है।\n\nCampus Example: जैसे आप hostel mess में उधार लेते हैं और time पे pay करते हैं, वैसे ही banks track करते हैं आप loans और credit cards कैसे use करते हैं।\n\nGood score = better loans & credit cards in future!",
          sender: 'bot'
        });
      }
      else if (lowerText.includes('how to save') || lowerText.includes('save 20')) {
        addChatMessage({
          text: "Here's a 20% saving plan for your monthly allowance of ₹8,000:",
          sender: 'bot'
        });
        
        setTimeout(() => {
          addChatMessage({
            text: "1️⃣ Create a 'Rent Jar' (₹1,600/month)\n2️⃣ Set up auto-allocation rule\n3️⃣ Lock it until month-end to avoid temptation",
            sender: 'bot'
          });
          
          setTimeout(() => {
            addChatMessage({
              text: "Would you like me to create this jar for you now?",
              sender: 'bot'
            });
          }, 500);
        }, 1000);
      }
      else if (lowerText.includes('yes') && chatHistory[chatHistory.length - 1]?.text.includes('Secret Trip Fund')) {
        // Handle "yes" to moving money to Secret Trip Fund
        addChatMessage({
          text: "✅ Great! I've moved ₹200 to your Secret Trip Fund. Your trip is getting closer!",
          sender: 'bot'
        });
        
        // Actually update the jar in the state
        updateJar('1', 200);
      }
      else if (lowerText.includes('yes') && chatHistory[chatHistory.length - 1]?.text.includes('create this jar')) {
        // Handle "yes" to creating Rent Jar
        addChatMessage({
          text: "✅ 'Rent Jar' created! I'll automatically move ₹1,600 from your allowance each month.",
          sender: 'bot'
        });
      }
      else if (lowerText.includes('raj') && lowerText.includes('200')) {
        addChatMessage({
          text: "Here's a polite message for Raj:",
          sender: 'bot'
        });
        
        setTimeout(() => {
          addChatMessage({
            text: "\"Hey Raj! Hope you're doing well. Just a reminder about the ₹200 from our Hostel 9 Mess bill yesterday. No rush, but would be great if you could transfer it when convenient. Thanks!\"",
            sender: 'bot'
          });
          
          setTimeout(() => {
            addChatMessage({
              text: "Would you like me to share this on WhatsApp?",
              sender: 'bot'
            });
          }, 500);
        }, 1000);
      }
      else if (lowerText.includes('hide money')) {
        addChatMessage({
          text: "You can hide money in two ways:\n\n1️⃣ Tap any jar on home screen to toggle 'Stealth Mode' - hides the balance from friends\n\n2️⃣ Go to Settings → 'Show ₹0 balance when screen shared' to protect your privacy when sharing your screen",
          sender: 'bot'
        });
      }
      else if (lowerText.includes('explain') && lowerText.includes('spend')) {
        addChatMessage({
          text: "Here's a breakdown of your recent spending:",
          sender: 'bot'
        });
        
        setTimeout(() => {
          addChatMessage({
            text: "📊 Last 7 days vs previous week:\n\n▲ 32% Food (₹1,120, up from ₹850)\n▼ 18% Transport (₹240, down from ₹290)\n◆ 0% Books (₹500, unchanged)\n\nBiggest expense: Zomato order on Aug 12 (₹350)",
            sender: 'bot'
          });
        }, 1000);
      }
      else if (lowerText.includes('split bill')) {
        addChatMessage({
          text: "To split bills with friends:\n\n1️⃣ Tap the 'Scan & Split' button on home screen\n2️⃣ Scan bill QR code\n3️⃣ Select friends to split with\n4️⃣ Send payment requests via WhatsApp\n\nWould you like to try it now?",
          sender: 'bot'
        });
      }
      else {
        // Default response
        addChatMessage({
          text: "I'm Money Buddy, your campus cash coach! Ask me about:\n\n💰 Where your money goes\n🧮 How to split bills\n💸 Saving tips\n🏦 Credit scores and UPI\n\nOr try one of the quick replies below!",
          sender: 'bot'
        });
      }
    }, 1000);
  };
  
  // Handle quick reply selection
  const handleQuickReply = (reply: string) => {
    setMessage(reply);
    
    // Add a small delay before sending
    setTimeout(() => {
      addChatMessage({
        text: reply,
        sender: 'user'
      });
      
      // Clear input
      setMessage('');
      
      // Process message
      processUserMessage(reply);
    }, 100);
  };
  
  // Render chat message
  const renderChatMessage = ({ item }: { item: ChatMessage }) => {
    const isBot = item.sender === 'bot';
    
    return (
      <View 
        style={[
          styles.messageContainer, 
          isBot ? styles.botMessageContainer : styles.userMessageContainer
        ]}
      >
        {isBot && (
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>💰</Text>
          </View>
        )}
        <View 
          style={[
            styles.messageBubble,
            isBot ? styles.botMessageBubble : styles.userMessageBubble
          ]}
        >
          <Text 
            style={[
              styles.messageText,
              isBot ? styles.botMessageText : styles.userMessageText
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  // Render quick replies
  const renderQuickReplies = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.quickRepliesContainer}
    >
      {quickReplies.map((reply, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.quickReply}
          onPress={() => handleQuickReply(reply)}
        >
          <Text style={styles.quickReplyText}>{reply}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ScreenContainer style={styles.container}>
      <Header title="Money Buddy" onBack={() => navigation.goBack()} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.chatContainer}>
          {chatHistory.length === 0 ? (
            <View style={styles.emptyChatContainer}>
              <View style={styles.botWelcomeAvatar}>
                <Text style={styles.botWelcomeAvatarText}>💰</Text>
              </View>
              <Text style={styles.welcomeTitle}>Hi there! I'm Money Buddy</Text>
              <Text style={styles.welcomeText}>
                Ask me anything about your finances, spending habits, or how to save money!
              </Text>
            </View>
          ) : (
            <FlatList
              ref={flatListRef}
              data={chatHistory}
              renderItem={renderChatMessage}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.chatList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
        
        {renderQuickReplies()}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.MID_GRAY}
            returnKeyType="send"
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSendMessage}
            disabled={message.trim() === ''}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={message.trim() === '' ? COLORS.MID_GRAY : COLORS.PRIMARY} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  botWelcomeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  botWelcomeAvatarText: {
    fontSize: 40,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.SECONDARY,
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
    textAlign: 'center',
    lineHeight: 24,
  },
  chatList: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  botAvatarText: {
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  botMessageBubble: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderBottomLeftRadius: 4,
  },
  userMessageBubble: {
    backgroundColor: COLORS.PRIMARY,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botMessageText: {
    color: COLORS.SECONDARY,
  },
  userMessageText: {
    color: COLORS.SECONDARY,
  },
  quickRepliesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  quickReply: {
    backgroundColor: COLORS.SECONDARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  quickReplyText: {
    color: COLORS.WHITE,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.LIGHT_GRAY,
    backgroundColor: COLORS.WHITE,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    fontSize: 16,
    color: COLORS.SECONDARY,
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ChatbotScreen;
