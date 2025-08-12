# MoneyBuddy: Campus Cash Coach App

## Overview
MoneyBuddy is a financial management application designed specifically for college students. It helps students manage their allowances, track expenses, split bills with friends, and develop healthy financial habits.

## Features

### Core Functionality
- **UPI Integration**: Link your UPI ID for secure and quick payments
- **Phone Number Verification**: Secure login using phone number and OTP
- **Balance Privacy**: Toggle balance visibility for enhanced privacy
- **Bill Splitting**: Easily split expenses with roommates and friends
- **Money Requests**: Request money from contacts with just a few taps
- **QR Code Payments**: Scan to pay or receive money quickly

### Student-Focused Features
- **Savings Jar**: Create dedicated savings for specific goals
- **Peer Pressure Shield**: Protection against impulsive spending due to social pressure
- **Impulse Blocker**: Tools to prevent emotional spending decisions
- **Financial AI Chatbot**: Get personalized financial advice tailored for students

## Technology Stack
- **Frontend**: React Native with Expo
- **Navigation**: React Navigation (Stack and Tab navigators)
- **State Management**: React Context API
- **UI Components**: Custom components with responsive design

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Setup
1. Clone the repository:
```bash
git clone https://github.com/mksinha01/MoneyBuddy.git
```

2. Navigate to the project directory:
```bash
cd MoneyBuddy
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the Expo development server:
```bash
npm start
# or
yarn start
```

5. Use the Expo Go app on your mobile device to scan the QR code displayed in the terminal, or press 'a' to run on an Android emulator or 'i' for iOS simulator.

## Project Structure
```
MoneyBuddy/
├── assets/             # Images, fonts, and other static resources
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context for state management
│   ├── navigation/     # Navigation configuration
│   ├── screens/
│   │   ├── chatbot/    # AI financial assistant screens
│   │   ├── main/       # Main app screens (home, scan, etc.)
│   │   ├── onboarding/ # First-time user experience screens
│   │   └── settings/   # App settings and preferences
│   └── theme/          # Colors, typography, and styling
├── App.tsx             # Main application component
└── package.json        # Project dependencies
```

## User Flow

### Onboarding
1. Welcome screen with app introduction
2. Phone number verification with OTP
3. UPI ID linking for payments
4. College selection to personalize experience
5. Allowance setup for budget planning
6. Sign-up bonus explanation

### Main App
1. Home screen with financial dashboard
2. Scan QR codes for payments
3. Split bills with contacts
4. Request money from friends
5. Access chatbot for financial advice
6. Manage settings and financial safeguards

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
[MIT License](LICENSE)

## Contact
- Developer: MK Sinha
- GitHub: [mksinha01](https://github.com/mksinha01)

---

*MoneyBuddy: Your Campus Cash Coach* - Making financial management easier for college students.
