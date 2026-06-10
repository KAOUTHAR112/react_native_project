import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Header({ title, subtitle, onSearchPress }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {onSearchPress ? (
        <Pressable style={styles.searchButton} onPress={onSearchPress}>
          <Text style={styles.searchText}>Recherche</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827'
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 3
  },
  searchButton: {
    backgroundColor: '#111827',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16
  },
  searchText: {
    color: '#ffffff',
    fontWeight: '700'
  }
});
