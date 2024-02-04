import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { Result } from '../../interfaces/poke-interface';
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
  id: string = '0'; //initializing the ID

  //A method that is invoked after a default change
  ngOnChanges(): void {
    this.getInformation();
  }

  @Input() data?: Result;

  getInformation(): void {
    //getting the ID
    if (this.data) {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
    }
  }
}
