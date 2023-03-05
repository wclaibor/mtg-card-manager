import { render } from '@testing-library/react';

import CardManager from './card-manager';

describe('CardManager', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardManager />);
    expect(baseElement).toBeTruthy();
  });
});
