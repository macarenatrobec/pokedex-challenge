import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { IPokemon } from 'pokeapi-typescript';
import { DetailComponent } from '../components/detail/detail.component';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pokedex: IPokemon[] = [];
  allPokemons: IPokemon[] = [];

  pokemon: IPokemon;
  searching = false;

  constructor(
    private pokedexService: PokedexService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    this.pokedex = await this.pokedexService.getTwentyPokemons(
      this.pokedex.length
    );
    this.allPokemons = this.pokedex;
  }

  async openPokemonDetail(poke: IPokemon) {
    const modal = await this.modalController.create({
      component: DetailComponent,
      componentProps: {
        pokemon: poke,
      },
    });
    return await modal.present();
  }

  async searchPokemon(ev: any) {
    this.searching = true;
    try {
      const res = await this.pokedexService.getOne(ev.detail.value);
      this.pokedex = [res];
    } catch (error) {
      this.pokedex = [];
    }
    if (ev.detail.value === '') {
      this.pokedex = this.allPokemons;
      this.searching = false;
    }
  }

  getMore() {
    let morePokemons = [];
    setTimeout(async () => {
      morePokemons = await this.pokedexService.getTwentyPokemons(
        this.pokedex.length
      );
    }, 10000);
    this.pokedex.push(...morePokemons);
  }

  // async getMore() {
  //   try {
  //     const data = await this.getMorePokemons();
  //   } catch (error) {}
  // }
}
