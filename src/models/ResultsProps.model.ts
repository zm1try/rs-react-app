import { ResultItem } from './ResultItem.model';

export interface ResultsProps {
  characters: ResultItem[] | null;
  searchQuery: string;
  errorMessage: string;
}
