import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PowerSwitch from '../PowerSwitch';
import renderer from 'react-test-renderer';

it("renders correctly", () =>{
  const {getByText} = render(<PowerSwitch/>)
  const linkElement1 = getByText(/On/i);
  const linkElement2 = getByText(/Off/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
});

it("updates internal state on buttons clicked", () =>{
  const{queryByTestId} = render(<PowerSwitch/>);
  const component = renderer(<PowerSwitch></PowerSwitch>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  const buttonOn = queryByTestId("powerOn-button");
  const buttonOff = queryByTestId("powerOff-button");
  fireEvent.click(buttonOn);
  expect(tree).toMatchSnapshot();
  fireEvent.click(buttonOff);
  expect(tree).toMatchSnapshot();
});
