import { CardListProps } from '../models/CardListProps.model.ts';
import { Card } from './Card.tsx';
import { Component } from 'react';

export class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;
    return (
      <div>
        {items.map((item, index) => (
          <Card key={index} pokemon={item} />
        ))}
      </div>
    );
  }
}
