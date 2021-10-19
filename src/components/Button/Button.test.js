import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Button from './Button';

test('Check button disabled on first render', () => {
    const { container } = render(<Button />);
    // expect(screen.getByDisplayValue('Search').).toBe('the-id');
});



