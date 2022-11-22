import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({name: 'messages'})
export class MessageEntity{
    @PrimaryColumn({type: 'uuid'})
    id!: string;

    @Column()
    description!: string;

    @Column()
    detail!: string;

    @Column()
    archieved!: boolean;

    @Column({name: 'time_created'})
    timeCreated!: Date;

    @Column({name: 'time_updated'})
    timeUpdated!: Date;

    @Column({name: 'id_user'})
    userId!: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'id_user', referencedColumnName: 'id'})
    user?: UserEntity;
}