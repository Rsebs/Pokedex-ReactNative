import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/globalTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  // Forma tradicional de una petición http
  // const { isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ['pokemons'], // Key de la petición que para que se maneje en caché
  //   queryFn: () => getPokemons(0), // La función encargada para realizar la petición
  //   staleTime: 1000 * 60 * 60, // 60 minutes | Mantiene la petición "Desactualizada" durante un tiempo, pasado el tiempo se realiza una petición nueva
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: params => getPokemons(params.pageParam),
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
