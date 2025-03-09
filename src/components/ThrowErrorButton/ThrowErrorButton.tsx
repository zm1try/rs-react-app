import { useState } from 'react';

export function ThrowErrorButton() {
  const [status, setStatus] = useState<boolean>(false);

  if (status) {
    throw new Error();
  }

  return (
    <button type="button" onClick={() => setStatus(true)}>
      Trigger Error
    </button>
  );
}
