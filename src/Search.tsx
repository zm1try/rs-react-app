import { Component } from 'react';
import { SearchProps } from './SearchProps.interface.ts';
import './Search.css';

export class Search extends Component<SearchProps> {
  state = { searchTerm: '' };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedSearchTerm });
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm);
    localStorage.setItem('searchTerm', this.state.searchTerm);
  };

  render() {
    return (
      <div className={'search'}>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="Search Pokémon..."
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
