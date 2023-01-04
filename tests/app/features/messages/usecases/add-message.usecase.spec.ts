import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { MessageRepository } from "../../../../../src/app/features/messages/repositories/message.repository";
import { CreateUser } from "../../../../../src/app/features/users/usecases/create-user.usecase";
import { AddMessage } from "../../../../../src/app/features/messages/usecases/add-message.usecase";

const makeRequestDataMsg = () => {
    return {
        description: "test description",
        detail: "test detail"
    }
}

const makeRequestDataUsr = () => {
    return {
        name: "John Doe", 
        password: "john1234", 
        email: "johndoe@johndoe.com"
    }
}

describe("Tests add new message use case", () => {
    test("Tests if a message is added successfully", async () => {
        const usrRepository = new UserRepository();
        const msgRepository = new MessageRepository();
        const usr = new CreateUser(usrRepository);
        const sut = new AddMessage(msgRepository);

        jest.spyOn(usrRepository, "create").mockResolvedValue();
        jest.spyOn(msgRepository, "create").mockResolvedValue();

        const user = await usr.execute(makeRequestDataUsr());
        const result = await sut.execute(user.id, makeRequestDataMsg());

        expect(result.id).toBeTruthy();
        expect(result.description).toBe("test description");
        expect(result.detail).toBe("test detail");
    })
})