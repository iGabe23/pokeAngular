import { Injectable } from '@angular/core';
//
import { Result } from '../interfaces/poke-interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}

  //Method that communicates with the API and fetchs 10 pokemon
  async getByPage(page: number, limit: number = 10): Promise<Result[]> {
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
  async getById(id: string): Promise<Result[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const resPoke = await res.json();
    const prev = resPoke.previous;
    return resPoke;
  }
  //Method that communicates with the API
  getByType() {}
}
