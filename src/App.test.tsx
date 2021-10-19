// Implicit assertion = assert without using expect statement
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("when the app is rendered", () => {
  test("should render app without errors", () => {
    render(<App />);
    screen.debug();
  })
  test("should select the children that is being passed to the CustomInput component", () => {
    render(<App/>);
  
    screen.getByText('Input:'); // implicit
    // expect(screen.getByText('Input:')).toBeInTheDocument(); // not implicit
  })
})