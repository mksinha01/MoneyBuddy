export type RootStackParamList = {
  // Onboarding Flow
  Onboarding: undefined;
  CollegeSelector: undefined;
  SetAllowance: undefined;
  SignupBonus: { onComplete: () => void };
  
  // Main App Flow
  Root: undefined;
  Home: undefined;
  Scan: undefined;
  SplitBill: { billAmount: number };
  Contacts: { billAmount: number };
  RequestMoney: { contacts: string[], amount: number };
  Confirmation: { message: string };
  
  // Chatbot Flow
  Chatbot: undefined;
  
  // Settings Flow
  Settings: undefined;
  
  // Other screens
  PeerPressureShield: undefined;
  ImpulseBlocker: undefined;
};

export type TabNavigatorParamList = {
  Home: undefined;
  Scan: undefined;
  Chatbot: undefined;
  Settings: undefined;
};
