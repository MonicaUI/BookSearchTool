import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders open library search app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Open Library/i);
  expect(linkElement).toBeInTheDocument();
});

