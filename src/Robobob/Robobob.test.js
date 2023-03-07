
import { render, screen } from '@testing-library/react';
import App from './Robobob';

test('renders the heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/ROBOBOB/i);
  expect(headingElement).toBeInTheDocument();
});


