import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VolumeController from '../VolumeController';

it("renders correctly", () =>{
  const {getByText} = render(<VolumeController/>)
  const linkElement1 = getByText(/Volume Controller/i);
  expect(linkElement1).toBeInTheDocument();
});

it("updates internal state on buttons clicked", () =>{
  const{queryByTestId} = render(<VolumeController/>);
  const volumeInput = queryByTestId("volumeInput");
  fireEvent.change(volumeInput, { target: { value: '60' } });
  expect(volumeInput).toHaveTextContent("60");
});
