import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { Pokemon, Result } from '../../interfaces/poke-interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent implements OnChanges {
  //injecting the service
  pokemonService = inject(PokemonService);
  //initializing variables
  id: string = '0';

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
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  }

  getInformation(): void {
    //getting the ID
    if (this.data) {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
    }
  }
}

/*if (this.type) {
  this.pokemonType = this.type.type.name;
  console.log(this.pokemon);
}*/
