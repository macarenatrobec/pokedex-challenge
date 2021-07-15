import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PokeAPI, { IAbility, IPokemon } from 'pokeapi-typescript';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor() {}

  async getTwentyPokemons(pokemonsDisplaying: number): Promise<IPokemon[]> {
    try {
      const populatedPokemons: IPokemon[] = [];
      const completeResourceList = await PokeAPI.Pokemon.list(
        20,
        pokemonsDisplaying
      );
      completeResourceList.results.map(async (pokemon) => {
        populatedPokemons.push(await this.getOne(pokemon.name));
      });
      return populatedPokemons;
    } catch (error) {}
  }

  async getOne(idOrName): Promise<IPokemon> {
    try {
      const result = await PokeAPI.Pokemon.resolve(idOrName);
      return result;
    } catch (error) {}
  }

  async getAbilities(name: string): Promise<IAbility> {
    const result = await PokeAPI.Ability.resolve(name);
    return result;
  }
}