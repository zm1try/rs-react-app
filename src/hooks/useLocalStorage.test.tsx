import { useState, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

const TestComponent = ({ lsKey }: { lsKey: string }) => {
  const { loadSearchQuery, saveSearchQuery } = useLocalStorage(lsKey);
  const [value, setValue] = useState('');

  useEffect(() => {
    const loadedValue = loadSearchQuery();
    if (loadedValue) {
      setValue(loadedValue);
    }
  }, [loadSearchQuery]);

  const handleSave = (newValue: string) => {
    saveSearchQuery(newValue);
    setValue(newValue);
  };

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => handleSave('testValue')}>
        Save to LocalStorage
      </button>
    </div>
  );
};

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  it('should load and display value from localStorage', () => {
    (Storage.prototype.getItem as jest.Mock).mockReturnValue(
      JSON.stringify('loadedValue')
    );
    render(<TestComponent lsKey={'testKey'} />);
    expect(screen.getByTestId('value').textContent).toBe('loadedValue');
  });
});
