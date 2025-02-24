import { screen } from '@testing-library/react';
import { render } from '../../store/test-utils';
import { SearchApp } from './SearchApp';
import { ThemeEnum } from '../../models/Theme.enum';
import * as useTheme from '../../hooks/useTheme';
import * as localStorageHook from '../../hooks/useLocalStorage';

const mockSetSearchParams = jest.fn();
jest.mock('../../hooks/useTheme');
jest.mock('../../hooks/useLocalStorage');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const searchParams = new URLSearchParams(window.location.search);
    return [searchParams, mockSetSearchParams];
  },
  useNavigate: () => jest.fn(),
  Outlet: () => <div data-testid="mock-outlet"></div>,
}));

describe('SearchApp', () => {
  beforeEach(() => {
    jest.spyOn(useTheme, 'useTheme').mockReturnValue({
      theme: ThemeEnum.DARK,
      toggleTheme: jest.fn(),
    });
    jest.spyOn(localStorageHook, 'useLocalStorage').mockReturnValue({
      loadSearchQuery: jest.fn().mockReturnValue(''),
      saveSearchQuery: jest.fn(),
    });
  });

  it('renders without crashing', () => {
    render(<SearchApp />);
    expect(screen.getByText(/swApi search/i)).toBeInTheDocument();
  });
});
