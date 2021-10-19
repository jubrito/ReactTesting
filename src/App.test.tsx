import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("when the app is rendered", () => {
  test("should render app without errors", () => {
    render(<App />);
    screen.debug();
  })
})