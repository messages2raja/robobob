
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/ROBOBOB/i);
  expect(headingElement).toBeInTheDocument();
});


