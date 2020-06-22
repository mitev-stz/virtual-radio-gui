import React from 'react';
import { render } from '@testing-library/react';
import Retina from '../Retina';


it("renders corectly", () => {
  const {getByText} = render(<Retina/>);
  const linkElement = getByText(/Retina Frequency/i);
  expect(linkElement).toBeInTheDocument();
});
