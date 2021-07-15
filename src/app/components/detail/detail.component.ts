import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IAbility, IEvolutionChain, IPokemon } from 'pokeapi-typescript';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() pokemon: IPokemon;
  abilities: IAbility[] = [];

  constructor(
    private pokedexService: PokedexService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.getCurrentPokemonAbilities();
    console.log(this.abilities);
  }

  async getCurrentPokemonAbilities() {
    this.abilities = [];
    this.pokemon.abilities.forEach(async (ab) => {
      this.abilities.push(
        await this.pokedexService.getAbilities(ab.ability.name)
      );
    });
  }

  async getNextPokemon(id: number) {
    this.pokemon = await this.pokedexService.getOne(id);
    this.getCurrentPokemonAbilities();
  }

  correctString(text: string) {
    return (text.charAt(0).toUpperCase() + text.slice(1)).replace('-', ' ');
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
