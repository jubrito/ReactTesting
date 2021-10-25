import { getUser } from "./get-user";

describe("when everything is okay", () => {
    it("should return a response", async () => {
        // in a real project you would use axios and mock the get
        const result = await getUser();
        expect(result).toEqual({id: '1', name: 'Juliana'});
    })
});