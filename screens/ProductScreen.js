import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import CategoriesScreen from './CategoriesScreen';
import CartScreen from './CartScreen';
import FavoritesScreen from './FavoritesScreen';
import ProfileScreen from './ProfileScreen';

const COLORS = {
  primary: '#FEF3E2',
  secondary: '#FAB12F',
  tertiary: '#FA812F',
  accent: '#FA4032',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#888888',
  lightGray: '#F5F5F5',
};



export default function ProductScreen({ onLogout }) {
  const [userEmail, setUserEmail] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('home');

  const insets = useSafeAreaInsets();
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const email = await AsyncStorage.getItem('userEmail');
    const items = await AsyncStorage.getItem('cartItems');
    const favs = await AsyncStorage.getItem('favorites');
    
    setUserEmail(email || '');
    setCartItems(items ? JSON.parse(items) : []);
    setFavorites(favs ? JSON.parse(favs) : []);
  };

  const addToCart = async (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    let newCartItems;
    
    if (existingItem) {
      newCartItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCartItems = [...cartItems, { ...product, quantity: 1 }];
    }
    
    setCartItems(newCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const removeFromCart = async (productId) => {
    const newCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(newCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    const newCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(newCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const toggleFavorite = async (productId) => {
    let newFavorites;
    if (favorites.includes(productId)) {
      newFavorites = favorites.filter(id => id !== productId);
    } else {
      newFavorites = [...favorites, productId];
    }
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const clearCart = async () => {
    setCartItems([]);
    await AsyncStorage.setItem('cartItems', JSON.stringify([]));
  };


  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            userEmail={userEmail}
            cartItems={cartItems}
            favorites={favorites}
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
            onLogout={onLogout}
          />
        );
      case 'categories':
        return (
          <CategoriesScreen
            cartItems={cartItems}
            favorites={favorites}
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
          />
        );
      case 'cart':
        return (
          <CartScreen
            cartItems={cartItems}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            favorites={favorites}
            cartItems={cartItems}
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            userEmail={userEmail}
            cartItems={cartItems}
            favorites={favorites}
            onLogout={onLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {renderScreen()}

      {/* Bottom Navigation */}
      <View
          style={[
            styles.bottomNav,
            { paddingBottom: insets.bottom + 8 },
          ]}
        >

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={activeTab === 'home' ? COLORS.accent : COLORS.gray}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'home' && styles.navTextActive,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('categories')}
        >
          <Ionicons
            name={activeTab === 'categories' ? 'grid' : 'grid-outline'}
            size={24}
            color={activeTab === 'categories' ? COLORS.accent : COLORS.gray}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'categories' && styles.navTextActive,
            ]}
          >
            Categories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItemCenter}
          onPress={() => setActiveTab('cart')}
        >
          <View style={styles.centerNavButton}>
            <Ionicons name="cart" size={28} color={COLORS.white} />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('favorites')}
        >
          <Ionicons
            name={activeTab === 'favorites' ? 'heart' : 'heart-outline'}
            size={24}
            color={activeTab === 'favorites' ? COLORS.accent : COLORS.gray}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'favorites' && styles.navTextActive,
            ]}
          >
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
        >
          <Ionicons
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={24}
            color={activeTab === 'profile' ? COLORS.accent : COLORS.gray}
          />
          <Text
            style={[
              styles.navText,
              activeTab === 'profile' && styles.navTextActive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  bottomNav: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,

  flexDirection: 'row',
  backgroundColor: COLORS.white,

  paddingTop: 12,
  paddingHorizontal: 8,

  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,

  shadowColor: COLORS.black,
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 10,
},

  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
  },
  navItemCenter: {
    flex: 1,
    alignItems: 'center',
    marginTop: -8,
  },
  centerNavButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  navText: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 4,
    fontWeight: '500',
  },
  navTextActive: {
    color: COLORS.accent,
    fontWeight: '600',
  },
});