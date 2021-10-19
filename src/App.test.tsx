// Implicit assertion = assert without using expect statement
import { render, screen, waitFor } from '@testing-library/react';
import { getUser } from './get-user';
import App from './App';
import { mocked } from 'ts-jest/utils';

jest.mock('./get-user');
const allFunctionsInsideAlsoNeedToBeMocked = true;
const mockGetUser = mocked(getUser, allFunctionsInsideAlsoNeedToBeMocked)
const waitingForComponentChangesToTestAfterIt = async () => {
  await waitFor(() => expect(mockGetUser).toHaveBeenCalled())
};


describe("SEARCH TYPES => throws errors (getBy)", () => {
  beforeEach(async () => {
    render(<App/>);
    await waitingForComponentChangesToTestAfterIt();
  })

  test("should throw an error when it doesn't find inexisting input because search types throw errors", () => {
    let error;
    try {
      screen.getByLabelText(/whatever/);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
  });

  test("should select the children that is being passed to the CustomInput component", () => {
    screen.getByText('Input:'); // implicit assertion
  });

  test("should select input element by its role", () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // explicit assertion
  });

  test("should select a label element by its text", () => {
    screen.getByLabelText(/Input/);
  });

  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText('example');
  });
})

describe("SEARCH VARIANTS => don't throw errors (queryBy)", () => {
  beforeEach(async () => {
    render(<App/>);
    await waitingForComponentChangesToTestAfterIt();
    
  })
  test("should return null when it doesn't find inexisting role because search variants don't throw errors", () => {
    const result = screen.queryByRole('whatever');
    expect(result).toBeNull();
  })
})