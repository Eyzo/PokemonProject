import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PokemonService} from '../services/pokemon.service';
import {PokemonModel} from '../models/pokemon.model';

@Component({
  selector: 'app-form-pokemon',
  templateUrl: './form-pokemon.component.html',
  styleUrls: ['./form-pokemon.component.scss']
})
export class FormPokemonComponent implements OnInit {

  private form: FormGroup;
  private types: Array<string>;
  private typesPokemon = [];

  private fileIsUploading = false;
  private fileUrl: string;
  private fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private pokemonService: PokemonService) { }

  ngOnInit() {
    this.initForm();
    this.types = this.pokemonService.getTypes();
  }

    initForm() {
      this.form = this.formBuilder.group({
          nom: ['', Validators.required],
          hp: ['', Validators.required],
          damage: ['', Validators.required],
          image: ['', Validators.required]
      });
    }

    onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.pokemonService.uploadFile(file).then(
        (url: string) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
    );
    }

    detectFiles(event) {
      this.onUploadFile(event.target.files[0]);
    }

    onCheck(event) {
      if (event.target.checked) {
        this.typesPokemon.push(event.target.value);
      } else {
        const index = this.typesPokemon.indexOf(event.target.value);
        this.typesPokemon.splice(index, 1);
      }
    }

    onSubmit() {
      const nom = this.form.get('nom').value;
      const hp = this.form.get('hp').value;
      const damage = this.form.get('damage').value;
      const image = this.form.get('image').value;

      const pokemon = new PokemonModel();
      pokemon.nom = nom;
      pokemon.hp = hp;
      pokemon.damage = damage;
      pokemon.types = this.typesPokemon;

      if (this.fileUrl && this.fileUrl !== '') {
        pokemon.image = this.fileUrl;
      }

      this.pokemonService.createNewPokemon(pokemon);
      this.router.navigate(['/pokemons']);
    }
}
