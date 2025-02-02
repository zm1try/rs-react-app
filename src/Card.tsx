import { CardProps } from './CardProps.interface.ts';
import { Component } from 'react';
import './Card.css';

export class Card extends Component<CardProps> {
  render() {
    const { pokemon } = this.props;
    return (
      <div className={'card'}>
        <h3>{pokemon.name}</h3>
        <p>{pokemon.url}</p>
      </div>
    );
  }
}
