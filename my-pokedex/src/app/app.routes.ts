import { Routes } from '@angular/router';
import { PokedexComponent } from './pages/pokedex/pokedex.component';

export const routes: Routes = [
  { path: 'pokedex', component: PokedexComponent, title: 'Pokedex' },
  { path: '', redirectTo: 'pokedex', pathMatch: 'full' },
  { path: '**', redirectTo: 'pokedex', pathMatch: 'full' },
];
