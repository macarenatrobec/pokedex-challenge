import { Component, Input, OnInit } from '@angular/core';
import { IPokemon } from 'pokeapi-typescript';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() pokemon: IPokemon;
  constructor() {}

  async ngOnInit() {}

  correctString(text: string) {
    return (text.charAt(0).toUpperCase() + text.slice(1)).replace('-', ' ');
  }
}
