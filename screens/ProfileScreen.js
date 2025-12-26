import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

export default function ProfileScreen({
  userEmail,
  cartItems,
  favorites,
  onLogout,
}) {
  const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: onLogout },
      ]
    );
  };

  const menuItems = [
    {
      id: 1,
      title: 'My Orders',
      icon: 'receipt-outline',
      color: COLORS.tertiary,
      subtitle: 'View your order history',
    },
    {
      id: 2,
      title: 'Shipping Address',
      icon: 'location-outline',
      color: COLORS.secondary,
      subtitle: 'Manage delivery addresses',
    },
    {
      id: 3,
      title: 'Payment Methods',
      icon: 'card-outline',
      color: COLORS.accent,
      subtitle: 'Manage payment options',
    },
    {
      id: 4,
      title: 'Notifications',
      icon: 'notifications-outline',
      color: COLORS.tertiary,
      subtitle: 'Notification preferences',
    },
    {
      id: 5,
      title: 'Help & Support',
      icon: 'help-circle-outline',
      color: COLORS.secondary,
      subtitle: 'Get help and contact us',
    },
    {
      id: 6,
      title: 'Settings',
      icon: 'settings-outline',
      color: COLORS.accent,
      subtitle: 'App preferences and settings',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color={COLORS.white} />
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
            </View>
          </View>
          
          <Text style={styles.userName}>{userEmail.split('@')[0]}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.tertiary }]}>
                <Ionicons name="cart" size={20} color={COLORS.white} />
              </View>
              <Text style={styles.statValue}>{totalItemsInCart}</Text>
              <Text style={styles.statLabel}>In Cart</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.accent }]}>
                <Ionicons name="heart" size={20} color={COLORS.white} />
              </View>
              <Text style={styles.statValue}>{favorites.length}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: COLORS.secondary }]}>
                <Ionicons name="cash" size={20} color={COLORS.white} />
              </View>
              <Text style={styles.statValue}>₹{totalCartValue.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Cart Value</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => Alert.alert(item.title, item.subtitle)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={22} color={COLORS.white} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <TouchableOpacity
            style={styles.aboutItem}
            onPress={() => Alert.alert('About', 'Shopping App v1.0.0')}
          >
            <Ionicons name="information-circle-outline" size={20} color={COLORS.gray} />
            <Text style={styles.aboutText}>About App</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.aboutItem}
            onPress={() => Alert.alert('Privacy', 'Privacy Policy details...')}
          >
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.gray} />
            <Text style={styles.aboutText}>Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.aboutItem}
            onPress={() => Alert.alert('Terms', 'Terms and Conditions...')}
          >
            <Ionicons name="document-text-outline" size={20} color={COLORS.gray} />
            <Text style={styles.aboutText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.lightGray,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
  },
  aboutSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  aboutText: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: 8,
  },
});