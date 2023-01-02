import { Message } from "../../../src/app/models/message";

describe("Tests Message model", () => {
    test("Test the creation of a new message", () => {
        const sut = new Message("description", "detail");

        expect(sut.description).toBe("description");
        expect(sut.detail).toBe("detail");
        expect(sut.archieved).toBeFalsy;
        expect(sut).toBeInstanceOf(Message);
    });

    test("Tests toJson()", () => {
        const sut = new Message("description", "detail");

        expect(sut.toJson()).toHaveProperty("id");
        expect(sut.toJson()).toHaveProperty("description", sut.description);
        expect(sut.toJson()).toHaveProperty("detail", sut.detail);
    });

    test("Tests fill()", () => {
        const sut1 = new Message("description", "detail");
        const sut2 = Message.fill(
            sut1.id,
            sut1.description,
            sut1.detail,
            sut1.archieved
        );

        expect(sut2).toEqual(sut1);
    })
})