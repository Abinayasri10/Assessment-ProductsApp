import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS } from './HomeScreen';

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
  { id: 'All', name: 'All Products', icon: 'apps', color: COLORS.accent },
  { id: 'Electronics', name: 'Electronics', icon: 'phone-portrait', color: COLORS.tertiary },
  { id: 'Fashion', name: 'Fashion', icon: 'shirt', color: COLORS.secondary },
  { id: 'Sports', name: 'Sports', icon: 'basketball', color: COLORS.accent },
  { id: 'Home', name: 'Home', icon: 'home', color: COLORS.tertiary },
  { id: 'Beauty', name: 'Beauty', icon: 'heart', color: COLORS.secondary },
];

export default function CategoriesScreen({
  cartItems,
  favorites,
  addToCart,
  toggleFavorite,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(product => product.category === selectedCategory);

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.categoryTabActive,
              { backgroundColor: selectedCategory === category.id ? category.color : COLORS.white },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons
              name={category.icon}
              size={20}
              color={selectedCategory === category.id ? COLORS.white : COLORS.black}
            />
            <Text
              style={[
                styles.categoryTabText,
                selectedCategory === category.id && styles.categoryTabTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productsHeader}>
          <Text style={styles.productsCount}>{filteredProducts.length} Products</Text>
        </View>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
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
                    onPress={() => addToCart(product)}
                  >
                    <Ionicons
                      name={isInCart(product.id) ? 'checkmark' : 'cart'}
                      size={18}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

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
  paddingTop: 20,  
  paddingBottom: 12,    
  paddingHorizontal: 20,
  backgroundColor: COLORS.white,
  elevation: 3, 
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
},

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  categoriesContainer: {
  backgroundColor: COLORS.white,
  paddingTop: 10,
  paddingVertical: 50,

},

  categoriesContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  categoryTab: {
  width: 70,
  height: 70,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12,
  marginRight: 12,
  backgroundColor: COLORS.white,

  elevation: 2,
  shadowColor: COLORS.black,
  shadowOpacity: 0.08,
  shadowRadius: 3,
},

  categoryTabActive: {
    shadowOpacity: 0.2,
    elevation: 4,
  },
  categoryTabText: {
  fontSize: 11,
  fontWeight: '600',
  color: COLORS.black,
  marginTop: 4, 
  textAlign: 'center',
},

  categoryTabTextActive: {
    color: COLORS.white,
  },
  content: {
    marginTop: 8,
  },
  productsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  productsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  productCard: {
    width: (width - 58) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    margin: 8,
    padding: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white,
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
    zIndex: 1,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    marginTop: 4,
  },
  productCategory: {
    fontSize: 11,
    color: COLORS.gray,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 6,
    height: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 11,
    color: COLORS.gray,
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    marginTop: 2,
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
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addedToCartButton: {
    backgroundColor: COLORS.secondary,
  },
});