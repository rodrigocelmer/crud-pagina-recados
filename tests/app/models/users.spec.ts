import { User } from "../../../src/app/models/user";

describe("Tests User model", () => {
    test("Tests the creation of a new user", () => {
        const sut = new User("John Doe", "john1234", "johndoe@johndoe.com");

        expect(sut.name).toBe("John Doe");
        expect(sut.password).toBe("john1234");
        expect(sut.email).toBe("johndoe@johndoe.com");
        expect(sut.messages).toHaveLength(0);
        expect(sut).toBeInstanceOf(User);
    });

    test("Tests toJson()", () => {
        const sut = new User("John Doe", "john1234", "johndoe@johndoe.com");

        expect(sut.toJson()).toHaveProperty("id");
        expect(sut.toJson()).toHaveProperty("name", sut.name);
        expect(sut.toJson()).toHaveProperty("email", sut.email);
    });
})