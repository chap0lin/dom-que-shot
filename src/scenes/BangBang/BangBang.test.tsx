import { render, screen } from '@testing-library/react';
import { BangBang } from './Game';

describe('Bang Bang Game', () => {
  it('should render label', () => {
    render(<BangBang />);
    expect(screen.queryByTestId('label')).not.toBeNull();
  });
});
