import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity{
    @PrimaryColumn({type: 'uuid'})
    id!: string;

    @Column({name: 'username'})
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({name: 'time_created'})
    timeCreated!: Date;

    @Column({name: 'time_updated'})
    timeUpdated!: Date;
}