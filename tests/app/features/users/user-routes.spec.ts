import { dataSource } from "../../../../src/main/database/typeorm";
import { User } from "../../../../src/app/models/user";
import app from "../../../../src/main/config/app";
import supertest from "supertest";
import { UserRepository } from "../../../../src/app/features/users/repositories/user.repository";
import { pgHelper } from "../../../../src/app/shared/database/pg-helper";
import { UserEntity } from "../../../../src/app/shared/database/entities/user.entity";

let userId: string;

describe("Tests all users routes. Users routes do not use Redis", () => {
    beforeAll(async () => {
        await pgHelper.connect();
    });

    afterAll(async () => {
        await pgHelper.disconnect();
    });

    afterEach(async () => {
        await pgHelper.client.manager.delete(UserEntity, {id: userId})
    })

    test("Tests if user is created successfully", async () => {
        const response = await supertest(app)
            .post("/users")
            .send({
                name: "John Doe", 
                password: "john1234", 
                email: "johndoe@johndoe.com"
            });

        userId = response.body.id;

        const userEntity = await pgHelper.client.manager.findOne(
            UserEntity,
            {
                where: {id: userId}
            }
        )        
        
        expect(response.status).toBe(200);
        expect(userEntity).toBeTruthy();
    })
})