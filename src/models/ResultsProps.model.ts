import { ResultItem } from './ResultItem.model.ts';

export interface ResultsProps {
  characters: ResultItem[] | null;
  searchQuery: string;
  errorMessage: string;
}
