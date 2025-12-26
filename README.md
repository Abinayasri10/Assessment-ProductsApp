# Assessment-ProductsApp

# Assessment-ProductsApp

A professional React Native e-commerce application built with Expo, featuring user authentication, product browsing, shopping cart, favorites, and a complete shopping experience.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Key Functionalities](#key-functionalities)
- [Future Enhancements](#future-enhancements)

---

## Features

### Authentication
- User registration and login with validation
- Session persistence with AsyncStorage
- Logout functionality

### Home Screen
- Dynamic product grid and category navigation
- Real-time search
- Flash sale banner
- Product cards with ratings, prices, and quick actions

### Shopping Cart
- Add, remove, and update quantities
- Price calculation (subtotal, tax, shipping)
- Order summary and checkout flow
- Cart badge indicator

### Favorites
- Add/remove favorites
- Persistent storage across sessions
- Quick add to cart

### Categories
- Filter products by category
- Dynamic product count and active tab highlight

### Profile
- Display user info and statistics
- Account settings and support
- Logout confirmation

---

## Technologies Used

- React Native & Expo
- React Hooks for state management
- AsyncStorage for persistent storage
- React Native Components (View, Text, Image, ScrollView, TouchableOpacity)
- Ionicons for icons
- Flexbox & StyleSheet for responsive styling

---

## Project Structure

Assessment/
├── components/ # Reusable UI components
├── screens/ # Main application screens
├── assets/ # Images and fonts
├── App.js # Root component and navigation
├── package.json # Dependencies
└── README.md # Project documentation

# Installation & Setup

### Clone the repository
```bash
git clone <repository-url>
cd Assessment
Install dependencies
npm install

Start the development server
npx expo start

Run on device or emulator
Mobile device: Use Expo Go and scan the QR code

Android emulator:

npx expo start --android
iOS simulator:

npx expo start --ios

```

### Key Functionalities
Product Search: Real-time filtering by name and category

Add to Cart & Favorites: Persistent storage with AsyncStorage

Cart Calculations: Subtotal, tax, shipping, total

Category Filtering: Dynamic tabs and product display

Animations: Smooth button press and screen transitions
