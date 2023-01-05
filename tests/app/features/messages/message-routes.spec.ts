import supertest from "supertest";
import { MessageEntity } from "../../../../src/app/shared/database/entities/message.entity";
import { UserEntity } from "../../../../src/app/shared/database/entities/user.entity";
import { pgHelper } from "../../../../src/app/shared/database/pg-helper";
import { redisHelper } from "../../../../src/app/shared/database/redis-helper";
import app from "../../../../src/main/config/app";

let userId: string;
let msgId: string;

describe("Tests all messages routes. Message routes use Redis", () => {
    beforeAll(async () => {
        await pgHelper.connect();
        redisHelper.connect();
        // RedisConnection.connect();
    })
    
    afterAll(async () => {
        await pgHelper.disconnect();
        redisHelper.disconnect();
        // RedisConnection.destroy();
    });

    afterEach(async () => {
        await pgHelper.client.manager.delete(MessageEntity, {id: msgId})
        await pgHelper.client.manager.delete(UserEntity, {id: userId})
    })

    test("Tests if a message is added successfully",async () => {
        const user = await supertest(app)
            .post("/users")
            .send({
                name: "John Doe", 
                password: "john1234", 
                email: "johndoe@johndoe.com"
            });

        userId = user.body.id;

        const response = await supertest(app)
            .post(`/users/${userId}/messages`)
            .send({
                description: "test description",
                detail: "test detail"
            })

        msgId = response.body.id;

        const msgEntity = await pgHelper.client.manager.findOne(
            MessageEntity,
            {
                where: {id: msgId}
            }
        )

        expect(response.status).toBe(200);
        expect(msgEntity).toBeTruthy();
    })

    test("Tests if all messages are returned",async () => {
        jest.setTimeout(10000);
        
        const user = await supertest(app)
            .post("/users")
            .send({
                name: "John Doe", 
                password: "john1234", 
                email: "johndoe@johndoe.com"
            });

        userId = user.body.id;

        const msgResp = await supertest(app)
            .post(`/users/${userId}/messages`)
            .send({
                description: "test description",
                detail: "test detail"
            })

        const response = await supertest(app)
            .get(`/users/${userId}/messages`)

        msgId = msgResp.body.id;

        expect(response.status).toBe(200);

        await supertest(app)
            .delete(`/users/${userId}/messages/${msgId}`)
    })
})