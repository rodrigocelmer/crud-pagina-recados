import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { CreateUser } from "../../../../../src/app/features/users/usecases/create-user.usecase";

const makeRequestData = () => {
    return {
        name: "John Doe", 
        password: "john1234", 
        email: "johndoe@johndoe.com"
    }
}

describe("Tests create User use case", () => {
    test("Tests if a new user is created successfully", async () => {
        const repository = new UserRepository();
        const sut = new CreateUser(repository);

        jest.spyOn(repository, "create").mockResolvedValue();

        const result = await sut.execute(makeRequestData());

        expect(result.id).toBeTruthy();
        expect(result.name).toBe("John Doe");
        expect(result.email).toBe("johndoe@johndoe.com");
    })
})