// Implicit assertion = assert without using expect statement
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("when the app is rendered", () => {
  beforeEach(() => {
    render(<App/>);
  })
  test("should render app without errors", () => {
    screen.debug();
  })
  test("should select the children that is being passed to the CustomInput component", () => {
    screen.getByText('Input:'); // implicit assertion

  })
  test("should select input element by its role", () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // explicit assertion
  })

  test("should select a label element by its text", () => {
    screen.getByLabelText(/Input/);
  })

  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText('example');
  })
})