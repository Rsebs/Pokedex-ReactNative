import { pokeApi } from '../../config/api/pokeApi';
import type { Pokemon } from '../../domain/entities/pokemon';
import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeApi.interfaces';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = '/pokemon';
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url, {
      params: {
        offset: page * 10,
        limit,
      },
    });
    const pokemonPromises = data.results.map(info =>
      pokeApi.get<PokeAPIPokemon>(info.url),
    );

    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemons = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    return pokemons;
  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};
