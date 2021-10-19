// Implicit assertion = assert without using expect statement
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { getUser } from './get-user';
import { mocked } from 'ts-jest/utils';
import userEvent from '@testing-library/user-event';
import CustomInput from './custom-input';

describe("when everything is okay", () => {
    test("(should call the onChange callback handler using FIRE EVENT", () => {
        const onChangeCallbackHandlerMock = jest.fn();
        render(
            <CustomInput value='' onChange={onChangeCallbackHandlerMock}>
                Input: 
            </CustomInput>)
        fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'This text will be copied and pasted by fire event' }
        })
        expect(onChangeCallbackHandlerMock).toHaveBeenCalledTimes(1);
    });
    test("should call the onChange callback handler when using USER EVENT api", async () => {
        const onChangeCallbackHandlerMock = jest.fn();
        render(
            <CustomInput value='' onChange={onChangeCallbackHandlerMock}>
                Input: 
            </CustomInput>)
        await userEvent.type(screen.getByRole('textbox'), 'This will be entered like user input, every character change triggers a change event')
        const numberOfCharactersOfUserInput = 84;
        expect(onChangeCallbackHandlerMock).toHaveBeenCalledTimes(numberOfCharactersOfUserInput);
    })
})