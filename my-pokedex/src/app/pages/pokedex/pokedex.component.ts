import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
//
import { PokemonService } from '../../services/pokemon.service';
import { Result } from '../../interfaces/poke-interface';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    PokemonCardComponent,
    CommonModule,
    FooterComponent,
    NavigationComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent {
  pokemonService = inject(PokemonService);
  pokemonList: Result[] = [];
  page: number = 1;
  loading: boolean = false;
  value = 'Pikachu';

  ngOnInit(): void {
    this.manageByPage('');
  }

  async manageByPage(e: any) {
    if (this.loading) return;
    this.loading = true;
    this.pokemonList = [
      ...this.pokemonList,
      ...(await this.pokemonService.getPokemonByPage(this.page)),
    ];
    console.log(this.pokemonList);
    this.page++;
    this.loading = false;
  }

  manageNextPage(e: any) {
    //console.log(e);
    this.pokemonList = [];
    this.manageByPage(e);
  }
  managePrevPage(e: any) {
    //console.log(e);
    this.pokemonList = [];
    this.page -= 2;
    this.manageByPage(e);
  }

  handleSearch(value: string) {
    console.log('Valor de búsqueda:', this.value);
    this.manageByPage(this.value);
  }
}
