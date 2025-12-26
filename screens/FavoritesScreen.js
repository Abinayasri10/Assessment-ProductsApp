import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Animated,
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

export default function FavoritesScreen({
  favorites,
  cartItems,
  addToCart,
  toggleFavorite,
}) {
  const favoriteProducts = PRODUCTS.filter(product =>
    favorites.includes(product.id)
  );

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <Ionicons name="heart-outline" size={80} color={COLORS.gray} />
        </View>
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptySubtitle}>
          Add items to your favorites to see them here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{favoriteProducts.length}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {favoriteProducts.map((product) => (
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
                <Ionicons name="heart" size={22} color={COLORS.accent} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    paddingTop:20
  },
  countBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  countText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: COLORS.primary,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
});