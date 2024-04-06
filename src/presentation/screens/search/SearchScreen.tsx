/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { globalTheme } from '../../../config/theme/globalTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId } from '../../../actions/pokemons';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState('');

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: getPokemonNamesWithId,
  });

  // todo: aplicar debounce
  const pokemonNameIdList = useMemo(() => {
    // Es un número
    if (!isNaN(Number(term))) {
      const pokemon = pokemonNameList.find(
        pokemonList => pokemonList.id === Number(term),
      );
      return pokemon ? [pokemon] : [];
    }

    if (term.length === 0) return [];
    if (term.length < 3) return [];

    return pokemonNameList.filter(pokemonList =>
      pokemonList.name.includes(term.toLowerCase()),
    );
  }, [term]);

  return (
    <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
      <TextInput
        placeholder="Buscar ¨Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
      />

      {isLoading ? (
        <ActivityIndicator style={{ paddingTop: 20 }} />
      ) : (
        <FlatList
          data={[] as Pokemon[]}
          keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          style={{ paddingTop: top + 20 }}
          renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon} />}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Text>{JSON.stringify(pokemonNameIdList, null, 2)}</Text>
    </View>
  );
};
