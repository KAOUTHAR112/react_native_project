import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function BackButton({ onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>‹</Text>
      <Text style={styles.text}>Go back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 10
  },
  icon: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginRight: 6,
    lineHeight: 28
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827'
  }
});
