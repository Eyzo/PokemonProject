import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListPokemonComponent} from './list-pokemon/list-pokemon.component';
import {DetailPokemonComponent} from './detail-pokemon/detail-pokemon.component';
import {FormPokemonComponent} from './form-pokemon/form-pokemon.component';
import {GuardService} from '../services/guard.service';
import {EditFormPokemonComponent} from './edit-form-pokemon/edit-form-pokemon.component';

const routes: Routes = [
    { path: 'pokemons', canActivate: [GuardService], component: ListPokemonComponent },
    { path: 'pokemons/new', canActivate: [GuardService], component: FormPokemonComponent },
    { path: 'pokemons/edit/:id' , canActivate: [GuardService] , component: EditFormPokemonComponent },
    { path: 'pokemons/:id', canActivate: [GuardService], component: DetailPokemonComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class PokemonRoutingModule { }
