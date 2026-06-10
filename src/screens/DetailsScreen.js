import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { getMealDetails } from '../api/mealApi';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { getIngredients, getInstructionSteps } from '../utils/mealUtils';

export default function DetailsScreen({ route, navigation }) {
  const { idMeal } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDetails();
  }, []);

  async function loadDetails() {
    try {
      setLoading(true);
      setError('');
      const data = await getMealDetails(idMeal);
      setMeal(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <ErrorMessage message={error} onRetry={loadDetails} />
      </SafeAreaView>
    );
  }

  if (!meal) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.empty}>Recette introuvable.</Text>
      </SafeAreaView>
    );
  }

  const ingredients = getIngredients(meal);
  const steps = getInstructionSteps(meal.strInstructions);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: meal.strMealThumb }}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.mealTitle}>{meal.strMeal}</Text>

        <View style={styles.badgesContainer}>
          {meal.strCategory ? <Text style={styles.badge}>{meal.strCategory}</Text> : null}
          {meal.strArea ? <Text style={styles.badge}>{meal.strArea}</Text> : null}
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.card}>
          {ingredients.map(item => (
            <View key={item.id} style={styles.ingredientRow}>
              <View style={styles.bullet} />
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.measure}>{item.measure}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={String(index)} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  image: {
    height: 255,
    marginHorizontal: 16,
    borderRadius: 18,
    backgroundColor: '#111827'
  },
  mealTitle: {
    marginHorizontal: 16,
    marginTop: 14,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#111827'
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
    marginBottom: 8
  },
  badge: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: 'hidden',
    fontWeight: '600'
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 16
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff'
  },
  ingredientRow: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#111827',
    marginRight: 10
  },
  ingredientName: {
    flex: 1,
    fontSize: 15,
    color: '#111827'
  },
  measure: {
    maxWidth: 120,
    textAlign: 'right',
    color: '#6b7280'
  },
  stepsContainer: {
    marginHorizontal: 16,
    paddingBottom: 30
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2
  },
  stepNumberText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#6b7280',
    fontSize: 16
  }
});
