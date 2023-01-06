import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { MessageRepository } from "../../../../../src/app/features/messages/repositories/message.repository";
import { CreateUser } from "../../../../../src/app/features/users/usecases/create-user.usecase";
import { AddMessage } from "../../../../../src/app/features/messages/usecases/add-message.usecase";
import { UpdateMessage } from "../../../../../src/app/features/messages/usecases/update-message.usecase";

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

describe("Test update message use case", () => {
    test("Test if message was update successfully", async () => {
        const usrRepository = new UserRepository();
        const msgRepository = new MessageRepository();
        const usr = new CreateUser(usrRepository);
        const msg = new AddMessage(msgRepository);

        jest.spyOn(usrRepository, "create").mockResolvedValue();
        jest.spyOn(msgRepository, "create").mockResolvedValue();

        const user = await usr.execute(makeRequestDataUsr());
        let message = await msg.execute(user.id, makeRequestDataMsg());

        const sut = new UpdateMessage(msgRepository);
        jest
            .spyOn(msgRepository, "update")
            .mockResolvedValue();

        message = await sut.execute({
            id: message.id,
            description: "new test description",
            detail: "new test detail"
        })

        expect(message.description).toBe("new test description");
        expect(message.detail).toBe("new test detail");
    })
})