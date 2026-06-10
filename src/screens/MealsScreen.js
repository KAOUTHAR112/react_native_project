import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';

import { getMealsByCategory } from '../api/mealApi';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import MealCard from '../components/MealCard';

export default function MealsScreen({ route, navigation }) {
  const { category } = route.params;
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMeals();
  }, []);

  async function loadMeals() {
    try {
      setLoading(true);
      setError('');
      const data = await getMealsByCategory(category);
      setMeals(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Plats de la catégorie: {category}</Text>

      {error ? <ErrorMessage message={error} onRetry={loadMeals} /> : null}

      <FlatList
        data={meals}
        keyExtractor={item => item.idMeal}
        numColumns={2}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('Details', { idMeal: item.idMeal })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun plat trouvé.</Text>}
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
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginHorizontal: 16,
    marginVertical: 10
  },
  list: {
    paddingBottom: 20
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#6b7280',
    fontSize: 16
  }
});
