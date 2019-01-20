import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokemonService} from './services/pokemon.service';
import {PokemonRoutingModule} from './pokemon-routing.module';
import {DetailPokemonComponent} from './detail-pokemon/detail-pokemon.component';
import {FormPokemonComponent} from './form-pokemon/form-pokemon.component';
import {ListPokemonComponent} from './list-pokemon/list-pokemon.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditFormPokemonComponent } from './edit-form-pokemon/edit-form-pokemon.component';

@NgModule({
    declarations: [DetailPokemonComponent, FormPokemonComponent, ListPokemonComponent, EditFormPokemonComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PokemonRoutingModule
    ],
    providers: [
        PokemonService
    ]
})
export class PokemonModule { }
