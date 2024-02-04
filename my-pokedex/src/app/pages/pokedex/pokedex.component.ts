import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { NgxPaginationModule } from 'ngx-pagination';
//
import { PokemonService } from '../../services/pokemon.service';
import { Result } from '../../interfaces/poke-interface';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    PokemonCardComponent,
    CommonModule,
    FooterComponent,
    NgxPaginationModule,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent {
  pokemonService = inject(PokemonService);
  pokemonList: Result[] = [];
  page: number = 1;

  ngOnInit(): void {
    this.manageByPage();
    console.log(this.pokemonService.getById('1'));
  }

  async manageByPage() {
    this.pokemonList = [
      ...this.pokemonList,
      ...(await this.pokemonService.getByPage(this.page)),
    ];
    //console.log(this.pokemonList);
    this.page++;
  }

  manageNextPage(e: any) {
    console.log(e);
    this.pokemonList = [];
    this.manageByPage();
  }
  managePrevPage(e: any) {
    console.log(e);
    this.pokemonList = [];
  }
}
