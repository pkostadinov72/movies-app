# Movies App Expo Project

Welcome to my React Native project built with Expo! This README will guide you through setting up the project, building it, and running it on your emulator or physical device.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Building the Project](#building-the-project)
- [Running the Project](#running-the-project)
- [Important Note](#important-note)

  
## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**
- **Expo CLI**: If you haven't installed it yet, you can do so using:
  ```bash
  npm install -g expo-cli
  ```
- **EAS CLI (Expo Application Services)**
- **Android Studio** (for the emulator)

## Getting Started

1. **Log in to EAS:**
   First, log in to your EAS profile:
   ```bash
   eas login
   ```

2. **Install Dependencies:**
   Install the required npm packages:
   ```bash
   npm install
   ```

## Building the Project

To create a build of the application, run the following command:
```bash
npm run android-build
```
This will prompt you to install the build on your emulator after the build is finished if you're using one. If you’re using a physical device, scan the QR code located in the `https://expo.dev/accounts/plamenpowa/projects`, select your project , go into the builds tab, select your build and download it.

## Running the Project

Once the build is complete, start the development server:
```bash
npm start
```

### For Emulator:
- Open Android Studio.
- In your terminal, press `a` to launch the app on your emulator.

### For Physical Device:
- Scan the QR code displayed in the terminal.

> **Note:** Make sure you are using the dev build and not Expo Go.

## Important Note

This app currently works only on Android. Due to Apple's requirements for a developer account, which involves a paid subscription, we are not supporting iOS builds at this time.


---
