import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { MessageRepository } from "../../../../../src/app/features/messages/repositories/message.repository";
import { CreateUser } from "../../../../../src/app/features/users/usecases/create-user.usecase";
import { GetAllMessages } from "../../../../../src/app/features/messages/usecases/get-all-messages.usecase";
import { Message } from "../../../../../src/app/models/message";
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

describe("Tests get all messages of an user", () => {
    test("Tests if all messages of an user are returned", async () => {
        jest.setTimeout(10000);

        const usrRepository = new UserRepository();
        const msgRepository = new MessageRepository();
        const usr = new CreateUser(usrRepository);
        const msg = new AddMessage(msgRepository);

        jest.spyOn(usrRepository, "create").mockResolvedValue();
        jest.spyOn(msgRepository, "create").mockResolvedValue();

        const user = await usr.execute(makeRequestDataUsr());
        await msg.execute(user.id, makeRequestDataMsg());
        await msg.execute(user.id, makeRequestDataMsg());

        const sut = new GetAllMessages(new MessageRepository());
        jest
            .spyOn(MessageRepository.prototype, "getAll")
            .mockRejectedValue([
                new Message("test description", "test detail"),
                new Message("test description", "test detail")
            ])
        
        const listMessages = await sut.execute(user.id);

        expect(listMessages).toBeTruthy();
        expect(listMessages).toHaveLength(2);
    })
})