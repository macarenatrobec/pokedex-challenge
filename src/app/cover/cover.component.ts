import { Component, Input, OnInit } from '@angular/core';
import { IPokemon } from 'pokeapi-typescript';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export class CoverComponent implements OnInit {
  @Input() pokemon: IPokemon;
  @Input() detail = false;

  constructor() {}

  ngOnInit() {}
}
