import app from "../../../../src/main/config/app";
import crypto from "crypto";
import supertest from "supertest";
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

    test("Tests if all users get returned", async () => {
        const userEntity = pgHelper.client.manager.create(UserEntity, {
            id: crypto.randomUUID(),
            name: "John Doe", 
            password: "john1234", 
            email: "johndoe@johndoe.com"
        });

        userId = userEntity.id;

        await pgHelper.client.manager.save(userEntity);

        const response = await supertest(app).get(
            `/users`
        );

        expect(response.status).toBe(200);
    })

    test("Tests if user is removed successfully", async () => {
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
        
        if(userEntity){
            const responseDelete = await supertest(app)
                .delete(`/users/${userId}`)
            const userEntityDeleted = await pgHelper.client.manager.findOne(
                UserEntity,
                {
                    where: {id: userId}
                }
            )

            expect(responseDelete.status).toBe(200);
            expect(userEntityDeleted).toBeFalsy();
        }
    })

    test("Tests invalid body structure when creating an user - no name informed", async () => {
        const response = await supertest(app)
            .post("/users")
            .send({ 
                password: "john1234", 
                email: "johndoe@johndoe.com"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ err: "'name' field not informed" });
    })
    
    test("Tests invalid body structure when creating an user - no password informed", async () => {
        const response = await supertest(app)
            .post("/users")
            .send({ 
                name: "John Doe", 
                email: "johndoe@johndoe.com"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ err: "'password' field not informed" });
    })

    test("Tests invalid body structure when creating an user - no email informed", async () => {
        const response = await supertest(app)
            .post("/users")
            .send({ 
                name: "John Doe", 
                password: "john1234"
            });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ err: "'email' field not informed" });
    })
})