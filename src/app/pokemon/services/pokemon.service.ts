import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {PokemonModel} from '../models/pokemon.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemons = [];
  pokemonsSubject = new Subject<PokemonModel[]>();

  private types = ['feu', 'eau', 'plante', 'electrique', 'psy', 'fée', 'insecte', 'combat', 'tenebre', 'acier', 'poison', 'dragon'];

  constructor() {
      this.getPokemons();
  }

  pokemonsEmit() {
    this.pokemonsSubject.next(this.pokemons);
  }

  savePokemonsDatabase() {
    firebase.database().ref('/pokemons').set(this.pokemons);
  }

  getPokemons() {
      firebase.database().ref('/pokemons').on('value',
          (data) => {
            this.pokemons = data.val() ? data.val() : [];
            this.pokemonsEmit();
      });
  }

  getPokemon(id: number) {
    return new Promise(
        (resolve, reject) => {
          firebase.database().ref('/pokemons/' + id).once('value').then(
              (data) => {
                resolve(data.val());
              },
              (error) => {
                reject(error);
              }
          );
        }
    );
  }

  uploadFile(file: File) {
    return new Promise(
        (resolve, reject) => {
          const uniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref()
              .child('images/' + uniqueFileName + file.name).put(file);

          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
              () => {
                console.log('chargement');
              },
              (error) => {
                console.log('Erreur de chargement : ' + error);
                reject();
              },
              () => {
                upload.snapshot.ref.getDownloadURL().then(
                    (url) => {
                      resolve(url);
                    }
                );
              }
          );
        }
    );
  }

  createNewPokemon(pokemon: PokemonModel) {
    this.pokemons.push(pokemon);
    this.savePokemonsDatabase();
    this.pokemonsEmit();
  }

  updatePokemon(id: number, pokemon: PokemonModel) {

      firebase.database().ref('/pokemons/' + id).set(pokemon);
      this.pokemonsEmit();
  }

  removePokemon(pokemon: PokemonModel) {

    if (pokemon.image) {
     const imgURL = firebase.storage().refFromURL(pokemon.image);
     imgURL.delete().then(
         () => {
             console.log('image bien supprimé du storage');
         }, (error) => {
             console.log(error);
         }
     );
    }

    const indexPokemon = this.pokemons.findIndex(
        (pokemonData) => {
          if (pokemon === pokemonData) {
            return true;
          }
        }
    );

    this.pokemons.splice(indexPokemon, 1);
    this.savePokemonsDatabase();
    this.pokemonsEmit();
  }

  getTypes() {
      return this.types;
  }

}
