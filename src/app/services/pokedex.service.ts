import { Injectable } from '@angular/core';
import PokeAPI, { IAbility, IPokemon } from 'pokeapi-typescript';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  public pokedex: IPokemon[] = [];

  constructor() {}

  async getTwentyPokemons(pokemonsDisplaying: number): Promise<IPokemon[]> {
    try {
      const completeResourceList = await PokeAPI.Pokemon.list(
        20,
        pokemonsDisplaying
      );
      completeResourceList.results.forEach(async (pokemon) => {
        this.pokedex.push(await this.getOne(pokemon.name));
      });
      return this.pokedex;
    } catch (error) {}
  }

  async getOne(idOrName): Promise<IPokemon> {
    try {
      const result = await PokeAPI.Pokemon.resolve(idOrName);
      return result;
    } catch (error) {}
  }

  async getAbilities(name: string): Promise<IAbility> {
    try {
      const result = await PokeAPI.Ability.resolve(name);
      return result;
    } catch (error) {}
  }

  async getTwentyMockPokemons(): Promise<IPokemon[]> {
    return this.pokedex;
  }
}
