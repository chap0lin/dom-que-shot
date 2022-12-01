import { render, screen } from '@testing-library/react';
// import { BangBang } from './Game';

describe('Bang Bang Game', () => {
  it('should render label', () => {
    render(<div data-testid="label" />);
    expect(screen.queryByTestId('label')).not.toBeNull();
  });
});
