import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

export default function MealCard({ meal, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: meal.strMealThumb }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name} numberOfLines={2}>
        {meal.strMeal}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    minHeight: 205,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#e5e7eb'
  },
  name: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    textAlign: 'center',
    color: '#111827',
    fontSize: 14
  }
});
