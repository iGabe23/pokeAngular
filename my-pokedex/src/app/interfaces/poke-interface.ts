export interface PokeInterface {
  count: number;
  next: string;
  previous: string;
  result: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: {
    type: {
      name: string;
    };
  }[];
}
