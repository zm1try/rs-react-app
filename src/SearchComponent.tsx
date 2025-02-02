import { Component } from 'react';
import { SearchComponentState } from './SearchComponentState.interface.ts';
import { Search } from './Search.tsx';
import { Results } from './Results.tsx';

export class SearchComponent extends Component<object, SearchComponentState> {
  constructor(props: object) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      error: '',
      throwError: false,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.fetchItems(savedSearchTerm); // Fetch items based on the saved search term or fetch all if empty
  }

  fetchItems = async (
    searchTerm: string = '',
    offset: number = 0,
    limit: number = 20
  ) => {
    this.setState({ isLoading: true, error: '' });
    try {
      // Construct the URL based on whether there is a search term
      const url = searchTerm
        ? `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}&search=${searchTerm}`
        : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ items: data.results });
    } catch (e) {
      this.setState({ error: 'Failed to fetch items' });
      console.error(e);
    }
    this.setState({ isLoading: false });
  };

  componentDidUpdate() {
    if (this.state.throwError) {
      throw new Error('Test Error');
    }
  }

  triggerError = () => {
    this.setState({ throwError: true });
  };

  render() {
    const { items, isLoading, error } = this.state;
    return (
      <div>
        <Search onSearch={this.fetchItems} />
        <Results items={items} isLoading={isLoading} error={error} />
        <button onClick={this.triggerError}>Error Button</button>
      </div>
    );
  }
}
