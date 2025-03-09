import { ResultItem } from '../models/ResultItem.model';

export const formatToCsv = (characters: ResultItem[] = []): string => {
  const headers = characters[0] ? Object.keys(characters[0]) : [];

  const csvContent = characters.map((character) => {
    const row = headers.map((header) => {
      const cell = character[header as keyof ResultItem];
      if (Array.isArray(cell)) {
        return cell.join(';');
      }
      return `"${cell}"`;
    });
    return row.join(',');
  });

  return [headers.join(','), ...csvContent].join('\n');
};
