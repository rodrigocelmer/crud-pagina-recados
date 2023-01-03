import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { RemoveUser } from "../../../../../src/app/features/users/usecases/remove-user.usecase";

describe("Test the deletion of a user", () => {
    test("Test if user was deleted successfully", async () => {
        const repository = new UserRepository();
        const sut = new RemoveUser(repository);
        const spyRemoveUser = jest
            .spyOn(repository, "remove")
            .mockResolvedValue();

        await sut.execute("any_id");

        expect(spyRemoveUser).toHaveBeenCalledTimes(1);
        expect(spyRemoveUser).toHaveBeenCalledWith("any_id");
    })
})