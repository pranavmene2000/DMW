import { render, screen } from '@testing-library/react';
import App from './App';

test('Heading Validation', () => {
  render(<App />);
  const linkElement = screen.getByText(/Twitter Opinion Miner/i);
  expect(linkElement).toBeInTheDocument();
});
