
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";


@Entity({ name: "time_work" })
export class TimeInOut extends BaseEntity {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    checkInOut : boolean;

    @Column({ type: "double" })
    long: number;

    @Column({ type: "double" })
    lat: number;

    @Column()
    dateTime: string;
}