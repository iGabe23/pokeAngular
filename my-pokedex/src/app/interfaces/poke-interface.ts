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

