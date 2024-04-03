import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';

export const HomeScreen = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['pokemons'], // Key de la petición que para que se maneje en caché
    queryFn: getPokemons, // La función encargada para realizar la petición
    staleTime: 1000 * 60 * 60, // 60 minutes | Mantiene la petición "Desactualizada" durante un tiempo, pasado el tiempo se realiza una petición nueva
  });

  return (
    <View>
      <Text variant="headlineLarge">HomeScreen</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      )}
    </View>
  );
};
