import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";


@Entity({name: "user"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    deviceToken: string;
}