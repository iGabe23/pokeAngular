import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { PokemonService } from '../../services/pokemon.service';
import { Result } from '../../interfaces/poke-interface';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [PokemonCardComponent, CommonModule, FooterComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent {
  pokemonService = inject(PokemonService);
  pokemonList: Result[] = [];
  //pokemon: Pokemon[] = [];
  page: number = 1;
  loading: boolean = false;

  ngOnInit(): void {
    this.manageByPage();
  }

  async manageByPage() {
    if (this.loading) return;
    this.loading = true;
    this.pokemonList = [
      ...this.pokemonList,
      ...(await this.pokemonService.getPokemonByPage(this.page)),
    ];
    //console.log(this.pokemonList);
    this.page++;
    this.loading = false;
  }

  manageNextPage(e: any) {
    //console.log(e);
    this.pokemonList = [];
    this.manageByPage();
  }
  managePrevPage(e: any) {
    //console.log(e);
    this.pokemonList = [];
    this.page -= 2;
    this.manageByPage();
  }
}
