import { CardProps } from '../models/CardProps.model.ts';
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
