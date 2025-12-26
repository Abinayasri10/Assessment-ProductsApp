import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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

const CATEGORIES = [
  { id: 1, name: 'New', color: COLORS.accent, icon: 'flash' },
  { id: 2, name: 'Fashion', color: COLORS.secondary, icon: 'shirt' },
  { id: 3, name: 'Electronics', color: COLORS.tertiary, icon: 'phone-portrait' },
  { id: 4, name: 'Home', color: COLORS.accent, icon: 'home' },
  { id: 5, name: 'Sports', color: COLORS.secondary, icon: 'basketball' },
  { id: 6, name: 'Beauty', color: COLORS.tertiary, icon: 'heart' },
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics',
    discount: 31,
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'Electronics',
    discount: 25,
  },
  {
    id: 3,
    name: 'Designer Leather Backpack',
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.3,
    reviews: 123,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    category: 'Fashion',
    discount: 33,
  },
  {
    id: 4,
    name: 'Premium Running Shoes',
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'Sports',
    discount: 25,
  },
  {
    id: 5,
    name: 'Coffee Maker Deluxe',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.4,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    category: 'Home',
    discount: 20,
  },
  {
    id: 6,
    name: 'Polarized Sunglasses',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    category: 'Fashion',
    discount: 25,
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    category: 'Electronics',
    discount: 30,
  },
  {
    id: 8,
    name: 'Yoga Mat Premium',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviews: 345,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    category: 'Sports',
    discount: 33,
  },
  {
    id: 9,
    name: 'Leather Wallet',
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.4,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
    category: 'Fashion',
    discount: 30,
  },
  {
    id: 10,
    name: 'Desk Lamp LED',
    price: 44.99,
    originalPrice: 64.99,
    rating: 4.3,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    category: 'Home',
    discount: 31,
  },
];

export default function HomeScreen({
  userEmail,
  cartItems,
  favorites,
  addToCart,
  toggleFavorite,
  onLogout,
}) {
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('New');
  const scaleAnims = useRef({}).current;

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'New' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const isInCart = (productId) => cartItems.some(item => item.id === productId);

  const isFavorite = (productId) => favorites.includes(productId);

  const getScaleAnim = (id) => {
    if (!scaleAnims[id]) {
      scaleAnims[id] = new Animated.Value(1);
    }
    return scaleAnims[id];
  };

  const handleAddToCart = (product) => {
    const scaleAnim = getScaleAnim(product.id);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    addToCart(product);
  };

  const handleCategoryPress = (category) => {
    console.log('Category pressed:', category.name);
    setSelectedCategory(category.name);
  };

  const renderCategoryItem = (category) => {
  const isActive = selectedCategory === category.name;

  return (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryItem}
      activeOpacity={0.7}
      onPress={() => handleCategoryPress(category)}
    >
      <View
        style={[
          styles.categoryCircle,
          { backgroundColor: isActive ? COLORS.black : category.color },
        ]}
      >
        <Animated.View style={{ transform: [{ scale: isActive ? 1.2 : 1 }] }}>
          <Ionicons name={category.icon} size={28} color={COLORS.white} />
        </Animated.View>
      </View>
      <Text
        style={[
          styles.categoryName,
          isActive && { color: COLORS.accent, fontWeight: '700' },
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};


  const renderProductCard = (product) => {
    const scaleAnim = getScaleAnim(product.id);

    return (
      <Animated.View
        key={product.id}
        style={[styles.productCard, { transform: [{ scale: scaleAnim }] }]}
      >
        {product.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}% OFF</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(product.id)}
        >
          <Ionicons
            name={isFavorite(product.id) ? 'heart' : 'heart-outline'}
            size={22}
            color={COLORS.accent}
          />
        </TouchableOpacity>

        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color={COLORS.secondary} />
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewText}>({product.reviews})</Text>
          </View>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.price}>₹{product.price}</Text>
              <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.addToCartButton,
                isInCart(product.id) && styles.addedToCartButton,
              ]}
              onPress={() => handleAddToCart(product)}
            >
              <Ionicons
                name={isInCart(product.id) ? 'checkmark' : 'cart'}
                size={18}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.userName}>{userEmail.split('@')[0]}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
            {cartItems.length > 0 && <View style={styles.badge} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileIcon}
            onPress={() => setShowProfile(!showProfile)}
          >
            <Ionicons name="person" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {showProfile && (
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={32} color={COLORS.white} />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileEmail}>{userEmail}</Text>
              <Text style={styles.profileLabel}>Logged In</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.categoriesContainer}
          >
            {CATEGORIES.map(renderCategoryItem)}
          </ScrollView>
        </View>

        {/* Flash Sale Banner */}
        <TouchableOpacity style={styles.flashSaleBanner}>
          <View style={styles.flashSaleContent}>
            <View>
              <Text style={styles.flashSaleTitle}>⚡ Flash Sale</Text>
              <Text style={styles.flashSaleSubtitle}>Up to 50% OFF</Text>
            </View>
            <View style={styles.flashSaleTimer}>
              <Ionicons name="time" size={16} color={COLORS.white} />
              <Text style={styles.timerText}>02:45:30</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? 'Search Results' : 'Featured Products'}
            </Text>
            <Text style={styles.productCount}>{filteredProducts.length} items</Text>
          </View>
          <View style={styles.productsGrid}>
            {filteredProducts.map(renderProductCard)}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 7,
    padding: 20,
    marginTop:8,
    backgroundColor: COLORS.white,
  },
  headerLeft: { flex: 1 },
  userName: { fontSize: 20, fontWeight: 'bold', color: COLORS.black, textTransform: 'capitalize' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: 
  { position: 'absolute', 
    top: 8, 
    right: 8, 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: COLORS.accent
 },
  profileIcon: 
  { 
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.tertiary,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  profileCard: 
  { 
    margin: 20, 
    marginTop: 10, 
    backgroundColor: COLORS.white, 
    borderRadius: 16, 
    padding: 20, 
    shadowColor: COLORS.black, 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 4 
},
  profileInfo: 
  { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16 
},
  profileAvatar: 
  { width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: COLORS.secondary, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 16 
},
  profileDetails: 
  { 
    flex: 1 
  },
  profileEmail: 
  { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: COLORS.black, 
    marginBottom: 4 
},
  profileLabel: 
  { 
    fontSize: 14, 
    color: COLORS.gray 
  },
  logoutButton: { 
    backgroundColor: COLORS.accent, 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
},
  logoutButtonText: { 
    color: COLORS.white, 
    fontSize: 16, 
    fontWeight: 'bold' 
},
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: 20, 
    marginTop: 10, 
    backgroundColor: COLORS.white, 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    shadowColor: COLORS.black, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  searchIcon: { 
    marginRight: 8 
},
  searchInput: { 
    flex: 1, 
    height: 48, 
    fontSize: 16, 
    color: COLORS.black 
},
  content: { flex: 1 },
  section: { marginBottom: 24 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 16 
},
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: COLORS.black 
},
  productCount: { 
    fontSize: 14, 
    color: COLORS.gray, 
    fontWeight: '500' 
},
  seeAll: { 
    fontSize: 14, 
    color: COLORS.tertiary, 
    fontWeight: '600' 
},
  categoriesContainer: { paddingLeft: 20 },
  categoryItem: { 
    alignItems: 'center', 
    marginRight: 16 
},
  categoryCircle: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 8, 
    shadowColor: COLORS.black, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 
},
  categoryName: { 
    fontSize: 12, 
    color: COLORS.black, 
    fontWeight: '500' 
},
  flashSaleBanner: { 
    marginHorizontal: 20, 
    marginBottom: 24, 
    backgroundColor: COLORS.accent, 
    borderRadius: 16, 
    padding: 20, 
    shadowColor: COLORS.black, 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, shadowRadius: 8, 
    elevation: 5 
},
  flashSaleContent: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
},
  flashSaleTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: COLORS.white, 
    marginBottom: 4 
},
  flashSaleSubtitle: { 
    fontSize: 14, 
    color: COLORS.white,
    opacity: 0.9 
},
  flashSaleTimer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 20, 
    gap: 6 
},
  timerText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: COLORS.white 
},
  productsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    paddingHorizontal: 12 
},
  productCard: { 
    width: (width - 58) / 2, 
    backgroundColor: COLORS.white, 
    borderRadius: 16, 
    margin: 8, 
    padding: 12, 
    shadowColor: COLORS.black, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.08, shadowRadius: 8, 
    elevation: 3, 
    position: 'relative' 
},
  discountBadge: { 
    position: 'absolute', 
    top: 12, left: 12, 
    backgroundColor: COLORS.accent, 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6, 
    zIndex: 1 
},
  discountText: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: COLORS.white 
},
  favoriteButton: { 
    position: 'absolute', 
    top: 12, 
    right: 12, 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: COLORS.white, 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1, shadowColor: COLORS.black, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, shadowRadius: 4, 
    elevation: 3 },
  productImageContainer: { 
    width: '100%', 
    height: 140, 
    borderRadius: 12, 
    overflow: 'hidden', 
    marginBottom: 8 
},
  productImage: { 
    width: '100%', 
    height: '100%' 
},
  productInfo: { marginTop: 4 },
  productCategory: { 
    fontSize: 11, 
    color: COLORS.gray, 
    marginBottom: 4, 
    textTransform: 'uppercase', 
    fontWeight: '600' 
},
  productName: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: COLORS.black, 
    marginBottom: 6, 
    height: 36 
},
  ratingContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8 
},
  ratingText: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: COLORS.black, 
    marginLeft: 4 
},
  reviewText: { 
    fontSize: 11, 
    color: COLORS.gray, 
    marginLeft: 2 
},
  priceContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
},
  price: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: COLORS.black 
},
  originalPrice: { 
    fontSize: 12, 
    color: COLORS.gray, 
    textDecorationLine: 'line-through', 
    marginTop: 2 
},
  addToCartButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: COLORS.tertiary, 
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: COLORS.black, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, shadowRadius: 4, 
    elevation: 4 
},
  addedToCartButton: { 
    backgroundColor: COLORS.secondary 
},
});
