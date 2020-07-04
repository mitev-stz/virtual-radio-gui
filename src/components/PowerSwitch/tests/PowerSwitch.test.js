import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PowerSwitch from '../PowerSwitch';
import TestRenderer  from 'react-test-renderer';

it("renders correctly", () =>{
  const {getByPlaceholderText} = render(<PowerSwitch/>)
  const linkElement1 = getByPlaceholderText("power-switch");
  expect(linkElement1).toBeInTheDocument();
});

it("updates internal state on buttons clicked", () =>{
  const{queryByTestId} = render(<PowerSwitch/>);
  const component = TestRenderer.create(<PowerSwitch></PowerSwitch>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  const buttonOn = queryByTestId("checkbox");
  fireEvent.click(buttonOn);
  expect(tree).toMatchSnapshot();
  fireEvent.click(buttonOn);
  expect(tree).toMatchSnapshot();
});
