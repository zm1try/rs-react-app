import React from 'react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  handleError?: (error: Error) => void;
}
