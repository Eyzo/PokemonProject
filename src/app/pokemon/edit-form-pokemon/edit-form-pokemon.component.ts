import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../services/pokemon.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-form-pokemon',
  templateUrl: './edit-form-pokemon.component.html',
  styleUrls: ['./edit-form-pokemon.component.scss']
})
export class EditFormPokemonComponent implements OnInit {

  private pokemon;
  private types;
  private form: FormGroup;
  private fileUploading = false;
  private fileUrl;
  private fileUploaded = false;

  constructor(private pokemonService: PokemonService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.pokemon = this.pokemonService.getPokemon(+id).then(
        (pokemon) => {
          this.pokemon = pokemon;
        }
    );
    this.types = this.pokemonService.getTypes();
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
        nom: ['', Validators.required],
        hp: ['', Validators.required],
        damage: ['', Validators.required],
        image: ['', Validators.required]
    });

  }

  hasPokemonTypes(type: string) {
    const index = this.pokemon.types.indexOf(type);

    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  onDectectFile(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onUploadFile (file: File) {
    this.fileUploading = true;
    this.pokemonService.uploadFile(file).then(
        (url) => {
          this.fileUploading = false;
          this.fileUploaded = true;
          this.fileUrl = url;
        } , () => {
          console.log('une erreur est survenue lors de l\'upload');
        }
    );
  }

  onSelectType(event) {
    if (event.target.checked) {
      this.pokemon.types.push(event.target.value);
    } else {
      const index = this.pokemon.types.indexOf(event.target.value);
      if (index > -1) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  onSubmit() {
    const nom = this.form.get('nom').value;
    const hp = this.form.get('hp').value;
    const damage = this.form.get('damage').value;
    const image = this.fileUrl;

    this.pokemon.nom = nom;
    this.pokemon.hp = hp;
    this.pokemon.damage = damage;
    this.pokemon.image = image;

    const id = this.route.snapshot.params['id'];
    this.pokemonService.updatePokemon(+id, this.pokemon);

    this.router.navigate(['/pokemons']);
  }

}
