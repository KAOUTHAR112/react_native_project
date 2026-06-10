import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Une erreur est survenue</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Réessayer</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#fff1f2',
    borderWidth: 1,
    borderColor: '#fecdd3'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#be123c',
    marginBottom: 6
  },
  message: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700'
  }
});
