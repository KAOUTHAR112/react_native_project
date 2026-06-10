import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { searchMealsByName } from '../api/mealApi';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import MealCard from '../components/MealCard';

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    const keyword = searchText.trim();

    if (keyword === '') {
      setResults([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSearched(true);
      const data = await searchMealsByName(keyword);
      setResults(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />

      <Text style={styles.title}>Search meal by name</Text>
      <Text style={styles.subtitle}>Exemples : Arrabiata, Chicken, Beef...</Text>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Nom de la recette"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Chercher</Text>
        </Pressable>
      </View>

      {loading ? <Text style={styles.loading}>Recherche en cours...</Text> : null}
      {error ? <ErrorMessage message={error} onRetry={handleSearch} /> : null}

      <FlatList
        data={results}
        keyExtractor={item => item.idMeal}
        numColumns={2}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('Details', { idMeal: item.idMeal })}
          />
        )}
        ListEmptyComponent={
          searched && !loading ? (
            <Text style={styles.empty}>Aucun résultat trouvé.</Text>
          ) : null
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  title: {
    marginHorizontal: 16,
    marginTop: 8,
    fontSize: 24,
    fontWeight: '800',
    color: '#111827'
  },
  subtitle: {
    marginHorizontal: 16,
    marginTop: 4,
    color: '#6b7280'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 18,
    padding: 8
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#111827'
  },
  button: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700'
  },
  loading: {
    marginHorizontal: 16,
    color: '#6b7280',
    marginBottom: 10
  },
  list: {
    paddingBottom: 20
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
    marginTop: 40
  }
});
