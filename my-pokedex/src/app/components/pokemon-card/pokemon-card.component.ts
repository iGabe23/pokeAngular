import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { Pokemon, Result } from '../../interfaces/poke-interface';
import { PokemonService } from '../../services/pokemon.service';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent implements OnChanges {
  

  //injecting the service
  pokemonService = inject(PokemonService);
  //initializing variables
  id: string = '0';
  searchValue: string | number = '';
  foundPokemon: any[] = [];

  @Input() data?: Result;
  @Input() pokemon?: Pokemon;

  //A method that is invoked after a default change
  ngOnChanges(): void {
    this.getInformation();
    this.managePokemonById();
  }

  async managePokemonById() {
    try {
      this.pokemon = await this.pokemonService.getPokemonById(this.id);
      //console.log(this.pokemon);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  }

  getInformation(): void {
    //getting the ID out of the pokemon url
    if (this.data) {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      //console.log(this.data);
    }
  }
  
}
