import { useState } from 'react';

export function ThrowErrorButton() {
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    setStatus(true);
  };

  if (status) {
    throw new Error();
  }

  return <button onClick={handleClick}>Trigger Error</button>;
}
