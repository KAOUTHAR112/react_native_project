import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

export default function CategoryCard({ category, selected, onPress }) {
  return (
    <Pressable
      style={[styles.card, selected && styles.selectedCard]}
      onPress={onPress}
    >
      <Image
        source={{ uri: category.strCategoryThumb }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name} numberOfLines={1}>
        {category.strCategory}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 105,
    marginRight: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 18,
    padding: 8,
    alignItems: 'center'
  },
  selectedCard: {
    backgroundColor: '#ef0000'
  },
  image: {
    width: 86,
    height: 72,
    borderRadius: 14,
    backgroundColor: '#e5e7eb'
  },
  name: {
    marginTop: 6,
    fontSize: 14,
    color: '#111827',
    textAlign: 'center'
  }
});
