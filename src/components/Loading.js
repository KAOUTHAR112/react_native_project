import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Loading({ message = 'Loading ...' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <ActivityIndicator size="large" color="#0ea5e9" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25
  },
  text: {
    fontSize: 16,
    color: '#111827'
  }
});
