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

    test("Tests fill()", () => {
        const sut1 = new User("John Doe", "john1234", "johndoe@johndoe.com");
        const sut2 = User.fill(
            sut1.id,
            sut1.name,
            sut1.password,
            sut1.email,
            sut1.messages
        );

        expect(sut2).toEqual(sut1);
    })
})