import { ResultsProps } from '../models/ResultsProps.model.ts';
import { Component } from 'react';
import { CardList } from './CardList.tsx';
import { CardsHeader } from './CardsHeader.tsx';

export class Results extends Component<ResultsProps> {
  render() {
    const { items, isLoading, error } = this.props;
    return (
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <CardsHeader />
            <CardList items={items} />
          </>
        )}
      </div>
    );
  }
}
