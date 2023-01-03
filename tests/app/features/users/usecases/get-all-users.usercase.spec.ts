import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { GetAllUsers } from "../../../../../src/app/features/users/usecases/get-all-users.usecase";
import { User } from "../../../../../src/app/models/user";

describe("Tests get all users", () => {
    test("Tests if all users are returned", async () => {
        const sut = new GetAllUsers(new UserRepository());
        jest
            .spyOn(UserRepository.prototype, "getAll")
            .mockRejectedValue([
                new User("John Doe", "john1234", "johndoe@johndoe.com"),
                new User("John Doe", "john1234", "johndoe@johndoe.com")
            ]);
        
        const listUsers = await sut.execute();

        expect(listUsers).toBeTruthy();
        expect(listUsers).toHaveLength(2);
    })
})