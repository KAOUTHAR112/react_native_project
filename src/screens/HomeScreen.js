import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { getCategories, getMealsByCategory } from '../api/mealApi';
import CategoryCard from '../components/CategoryCard';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MealCard from '../components/MealCard';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [mealsLoading, setMealsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);
      setError('');

      const data = await getCategories();
      setCategories(data);

      if (data.length > 0) {
        const firstCategory = data[0].strCategory;
        setSelectedCategory(firstCategory);
        await loadMeals(firstCategory);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadMeals(category) {
    try {
      setMealsLoading(true);
      setError('');
      const data = await getMealsByCategory(category);
      setMeals(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setMealsLoading(false);
    }
  }

  function handleCategoryPress(category) {
    const name = category.strCategory;
    setSelectedCategory(name);
    loadMeals(name);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Recipe App"
        subtitle="TheMealDB"
        onSearchPress={() => navigation.navigate('Search')}
      />

      {error ? <ErrorMessage message={error} onRetry={loadCategories} /> : null}

      <FlatList
        data={meals}
        keyExtractor={item => item.idMeal}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Categories</Text>

            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.idCategory}
              contentContainerStyle={styles.categoriesList}
              renderItem={({ item }) => (
                <CategoryCard
                  category={item}
                  selected={selectedCategory === item.strCategory}
                  onPress={() => handleCategoryPress(item)}
                />
              )}
            />

            <Text style={styles.title}>
              Plats de la catégorie: {selectedCategory}
            </Text>

            {mealsLoading ? (
              <Text style={styles.smallLoading}>Chargement des plats...</Text>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('Details', { idMeal: item.idMeal })}
          />
        )}
        ListEmptyComponent={
          !mealsLoading ? <Text style={styles.empty}>Aucun plat trouvé.</Text> : null
        }
        contentContainerStyle={styles.mealsList}
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
    marginTop: 12,
    marginBottom: 10
  },
  categoriesList: {
    paddingLeft: 16,
    paddingRight: 8
  },
  mealsList: {
    paddingBottom: 20
  },
  smallLoading: {
    marginLeft: 16,
    color: '#6b7280',
    marginBottom: 8
  },
  empty: {
    textAlign: 'center',
    marginTop: 25,
    color: '#6b7280',
    fontSize: 16
  }
});
