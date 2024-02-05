import { Injectable } from '@angular/core';
//
import { Result } from '../interfaces/poke-interface';
import { Pokemon } from '../interfaces/poke-interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}

  //Method that communicates with the API and fetchs 10 pokemon
  async getPokemonByPage(page: number, limit: number = 10): Promise<Result[]> {
    const offset = limit * (page - 1);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    const resPoke = await res.json();
    if (resPoke.results.length > 0) {
      return resPoke.results;
    }
    return [];
  }
  //Method that communicates with the API
  async getPokemonById(id: number | string): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      weight: data.weight / 10,
      height: data.height / 10,
      types: data.types.map((typeData: { type: { name: string } }) => ({
        type: { name: typeData.type.name },
      })),
    };
    return pokemon;
  }
  //Method that communicates with the API
  getByType() {}
}
