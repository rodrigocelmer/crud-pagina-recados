import { Message } from "../../../src/app/models/message";
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

    test("Tests addMessage()", () => {
        const sut = new User("John Doe", "john1234", "johndoe@johndoe.com");

        sut.addMessage(new Message("description", "detail"));
        
        expect(sut.messages).toHaveLength(1);
        expect(sut.messages[0]).toBeInstanceOf(Message);
    })

    test("Tests deleteMessage()", () => {
        const sut = new User("John Doe", "john1234", "johndoe@johndoe.com");
        const msg = new Message("description", "detail")

        sut.addMessage(msg);

        sut.deleteMessage(0);
        
        expect(sut.messages).toHaveLength(0);
    })

    test("Tests editMessage()", () => {
        const sut = new User("John Doe", "john1234", "johndoe@johndoe.com");
        const msg1 = new Message("description", "detail")

        sut.addMessage(msg1);

        const msg2 = Message.fill(msg1.id, "new description", "new detail", msg1.archieved);

        sut.editMessage(msg2);

        expect(sut.messages).toHaveLength(1);
        expect(sut.messages[0]).toBeInstanceOf(Message);
        expect(sut.messages[0].description).toBe("new description");
        expect(sut.messages[0].detail).toBe("new detail");
    })

    test("Tests changeMsgStatus()", () => {
        const sut = new User("John Doe", "john1234", "johndoe@johndoe.com");
        const msg1 = new Message("description", "detail")

        sut.addMessage(msg1);

        sut.changeMsgStatus(msg1.id, false);

        expect(sut.messages[0].archieved).toBeFalsy();
    })
})