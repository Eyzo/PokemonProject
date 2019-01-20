import {Component, OnDestroy, OnInit} from '@angular/core';
import {PokemonModel} from '../models/pokemon.model';
import {PokemonService} from '../services/pokemon.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit, OnDestroy {

  private pokemons: PokemonModel[];
  private pokemonsSubscribtion: Subscription;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit() {
    this.pokemonsSubscribtion = this.pokemonService.pokemonsSubject.subscribe(
        (pokemons: PokemonModel[]) => {
          this.pokemons = pokemons;
        }
    );
    this.pokemonService.pokemonsEmit();
  }

  onNewPokemon() {
    this.router.navigate(['/pokemons', 'new']);
  }

  onDelete(pokemon) {
    const confirm = window.confirm('Voules vous vraiment supprimer ce pokemon ?');

    if (confirm) {
      this.pokemonService.removePokemon(pokemon);
    }
  }

  onViewPokemon(id: number) {
    this.router.navigate(['/pokemons', id]);
  }

  ngOnDestroy() {
    this.pokemonsSubscribtion.unsubscribe();
  }

}
