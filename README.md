# Health Environment Tracker

A React Native mobile application that helps users understand how environmental conditions might impact their health activities. The app integrates weather data and provides personalized activity recommendations with multi-language support.

## Features

### Weather Integration

- Real-time weather data for major cities (New York, London, Tokyo)
- Current temperature, humidity, wind speed, and conditions
- Pull-to-refresh functionality for updated data
- OpenWeatherMap API integration

### User Authentication

- Secure user registration and login system
- SQLite database with encrypted user data
- Redux state management for authentication
- Form validation and error handling

### Multi-Language Support

- Automatic language detection based on device locale
- English and German translations
- i18next internationalization framework
- Seamless language switching capability

## Tech Stack

- **Framework**: React Native (Expo ~53.0.16)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **Database**: SQLite (expo-sqlite)
- **Internationalization**: i18next + react-i18next
- **Weather API**: OpenWeatherMap
- **Development**: ESLint, TypeScript strict mode

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Yarn** package manager - [Installation guide](https://yarnpkg.com/getting-started/install)
- **Expo CLI** - Install globally with `npm install -g @expo/cli`
- **iOS Simulator** (for macOS) or **Android Studio** (for Android development)

### For iOS Development (macOS only)

- **Xcode** (latest version) - [Download from App Store](https://apps.apple.com/app/xcode/id497799835)
- **iOS Simulator** (included with Xcode)

### For Android Development

- **Android Studio** - [Download here](https://developer.android.com/studio)
- **Android SDK** and **Android Virtual Device (AVD)**

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd rn-senior-dev-challenge
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Verify Expo setup**

   ```bash
   npx expo doctor
   ```

## Running the Application

### Development Mode

1. **Start the Expo development server**

   ```bash
   yarn start
   # or
   npx expo start
   ```

2. **Choose your platform**

   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your physical device
