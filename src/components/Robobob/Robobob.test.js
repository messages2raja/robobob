import { render, screen } from '@testing-library/react';
import Robobob from './Robobob';

test('renders the heading', () => {
  render(<Robobob />);
  const headingElement = screen.getByText(/ROBOBOB/i);
  expect(headingElement).toBeInTheDocument();
});


