import { Column, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { MessageEntity } from "./message.entity";

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

    @UpdateDateColumn({name: 'time_updated'})
    timeUpdated!: Date;

    @OneToMany(() => MessageEntity, (message) => message.user)
    message?: MessageEntity[];
}