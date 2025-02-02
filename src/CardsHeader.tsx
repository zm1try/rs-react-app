import { Component } from 'react';
import './Card.css';

export class CardsHeader extends Component {
  render() {
    return (
      <div className={'card'}>
        <h3>Name</h3>
        <p>Description</p>
      </div>
    );
  }
}
