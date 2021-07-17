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
    const res = await this.pokedexService.getOne(ev.detail.value);
    if (res) {
      this.pokedex = [res];
    } else {
      this.pokedex = [];
    }
    if (ev.detail.value === '') {
      this.pokedex = this.allPokemons;
      this.searching = false;
    }
  }

  async getMore(event) {
    setTimeout(async () => {
      event.target.complete();
      const data = await this.pokedexService.getTwentyPokemons(
        this.pokedex.length
      );
      if (data.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
