import React from "react";
import { render } from '@testing-library/react';
import Tuner from '../Tuner';


it("renders correctly", () => {
  const {queryByTestId, queryByPlaceholderText} = render(<Tuner/>);
  expect(queryByTestId("retina")).toBeTruthy();
  expect(queryByPlaceholderText('increment-button')).toBeTruthy();
  expect(queryByPlaceholderText('decrement-button')).toBeTruthy();
});

// describe("Change state", () => {
//   it("updates internal state on change", () => {
//     const {queryByPlaceholderText} = render(<Tuner/>);
//     const buttonIncr = queryByPlaceholderText('increment-button');
//     fireEvent.mouseDown(buttonIncr);
//     fireEvent.mouseUp(buttonIncr);
//   })
// });
