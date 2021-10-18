import { sumPositiveNumbers } from './example';

// Test suit
describe("when the arguments passed are positive numbers", () => {
    test("should return the right answer", () => {
        expect(sumPositiveNumbers(4, 5)).toBe(9);
    })
})

describe("when one of the arguments is a negative number", () => {
    test("should throw an error", () => {
        let error;
        try {
            sumPositiveNumbers(-1, 5);
        } catch(err) {
            if (err instanceof Error) {
                error = err.message;
            }
        }
        expect(error).toBeDefined();
        expect(error).toBe('Numbers must be positive');
    })
})