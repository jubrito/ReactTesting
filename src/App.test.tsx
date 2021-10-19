// Implicit assertion = assert without using expect statement
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { getUser } from './get-user';
import App from './App';
import { mocked } from 'ts-jest/utils';
import userEvent from '@testing-library/user-event';

jest.mock('./get-user');
const allFunctionsInsideAlsoNeedToBeMocked = true;
const mockGetUser = mocked(getUser, allFunctionsInsideAlsoNeedToBeMocked);
const waitForComponentChangesToTestAfterIt = async () => {
  await waitFor(() => expect(mockGetUser).toHaveBeenCalled())
};


describe("SEARCH TYPES => throws errors (getBy)", () => {
  beforeEach(async () => {
    render(<App/>);
    await waitForComponentChangesToTestAfterIt();
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
    screen.getAllByText('Input:'); // implicit assertion
  });

  test("should select one input elements by its role", () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(1);
  });

  test("should select a label element by its text", () => {
    // It doesn't require 'all' like the other tests because both labels have for="search" so react understand them as one
    screen.getByLabelText(/Input/);
    // screen.debug();
  });

  test("should select input element by placeholder text", () => {
    screen.getAllByPlaceholderText('example');
  });
})

describe("SEARCH VARIANTS => don't throw errors (queryBy)", () => {
  beforeEach(async () => {
    render(<App/>);
    await waitForComponentChangesToTestAfterIt();
    
  })
  test("should return null when it doesn't find inexisting role because search variants don't throw errors", () => {
    const result = screen.queryByRole('whatever');
    expect(result).toBeNull();
  })
})

describe("SEARCH VARIANTS, async (when the component fetches the user successfully)", () => {
    beforeEach(() => {
      mockGetUser.mockClear();
    })
    test("should call api (getUser) once", async () => {
      render(<App/>);
      await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
    })
    test("should render the username entered", async () => {
      const name = 'Juliana';
      mockGetUser.mockResolvedValueOnce({ id: '1', name }); 
      render(<App/>);
      expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument();
    })
})

describe("USER INTERACTION, when user enter text on input", () => {
  test("(fireEvent) should display the text in the screen", async () => {
    render(<App/>);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
    expect(screen.getByText(/You typed: .../));
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Juliana Witzke' }
    })
    expect(screen.getByText(/You typed: Juliana Witzke/));
  })
  test("(useEvent) should display the text in the screen", async () => {
    // mimics the actual browser behavior more closely than the fire event
    render(<App/>);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledWith());
    expect(screen.getByText(/You typed: .../));
    const textboxElement = screen.getByRole('textbox');
    await userEvent.type(textboxElement, 'Juliana Brito');
    expect(screen.getByText(/You typed: Juliana Brito/));
  })
})

