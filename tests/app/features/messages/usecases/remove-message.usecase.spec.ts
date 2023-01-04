import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { MessageRepository } from "../../../../../src/app/features/messages/repositories/message.repository";
import { CreateUser } from "../../../../../src/app/features/users/usecases/create-user.usecase";
import { AddMessage } from "../../../../../src/app/features/messages/usecases/add-message.usecase";
import { RemoveMessage } from "../../../../../src/app/features/messages/usecases/remove-message.usecase";

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

describe("Test the deletion of a message", () => {
    test("Test if a message was deleted successfully", async () => {
        const usrRepository = new UserRepository();
        const msgRepository = new MessageRepository();
        const usr = new CreateUser(usrRepository);
        const msg = new AddMessage(msgRepository);

        jest.spyOn(usrRepository, "create").mockResolvedValue();
        jest.spyOn(msgRepository, "create").mockResolvedValue();

        const user = await usr.execute(makeRequestDataUsr());
        await msg.execute(user.id, makeRequestDataMsg());

        const sut = new RemoveMessage(msgRepository);
        const spyRemoveMsg = jest
            .spyOn(msgRepository, "remove")
            .mockResolvedValue();
        
        await sut.execute("any_id");

        expect(spyRemoveMsg).toHaveBeenCalledTimes(1);
        expect(spyRemoveMsg).toHaveBeenCalledWith("any_id");
    })
})