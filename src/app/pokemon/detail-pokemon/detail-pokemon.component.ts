import { Component, OnInit } from '@angular/core';
import {PokemonModel} from '../models/pokemon.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonService} from '../services/pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {

  private pokemon;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pokemonService: PokemonService) { }

  ngOnInit() {
      const id = this.route.snapshot.params['id'];
      this.pokemonService.getPokemon(+id).then(
          (pokemon) => {
              this.pokemon = pokemon;
          }
      );
  }

  goBack() {
    this.router.navigate(['/pokemons']);
  }

  goEdit() {
      const id = this.route.snapshot.params['id'];
      this.router.navigate(['/pokemons', 'edit', id]);
  }

}
