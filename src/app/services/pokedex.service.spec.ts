import { TestBed } from '@angular/core/testing';
import { CardComponent } from '../components/card/card.component';
import { PokedexService } from './pokedex.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
  });

  test('should return empty array', async () => {
    const poke = new PokedexService();
    const res = await poke.getTwentyMockPokemons();
    expect(res.length).toBeLessThan(1);
  });
});
