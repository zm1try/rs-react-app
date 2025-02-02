import { Component } from 'react';
import './App.css';
import { SearchComponent } from './components/SearchComponent.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

export class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div>
          <h1>Pokémon Search</h1>
          <SearchComponent />
        </div>
      </ErrorBoundary>
    );
  }
}
