import { Pokemon } from './Pokemon.model.ts';

export interface ResultsProps {
  items: Pokemon[];
  isLoading: boolean;
  error: string;
}
