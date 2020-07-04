import React from 'react';
import { render } from '@testing-library/react';
import VolumeController from '../VolumeController';

it("renders correctly", () =>{
  const {getByTestId} = render(<VolumeController/>)
  const linkElement1 = getByTestId("volumeInput");
  expect(linkElement1).toBeInTheDocument();
});

// it("updates internal state on buttons clicked", () =>{
//   const{queryByTestId} = render(<VolumeController/>);
//   const volumeInput = queryByTestId("volumeInput");
//   fireEvent.change(volumeInput, { target: { value: '60' } });
//   expect(volumeInput).toHaveTextContent("60");
// });
