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
    screen.getByText('Input:'); // implicit assertion

  })
  test("should select input element by its role", () => {
    render(<App/>);
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // explicit assertion
  })

  test("should select a label element by its text", () => {
    render(<App/>);
    screen.getByLabelText(/Input/);
  })

  test("should select input element by placeholder text", () => {
    render(<App/>);
    screen.getByPlaceholderText('example');
  })
})