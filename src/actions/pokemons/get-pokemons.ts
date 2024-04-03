import { pokeApi } from '../../config/api/pokeApi';
import type { Pokemon } from '../../domain/entities/pokemon';
import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeApi.interfaces';

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

    console.log(pokeApiPokemons);

    return [];
  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};
