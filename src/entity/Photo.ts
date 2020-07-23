import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

/*
    View type database in here
    https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
*/

@Entity({name: "photos"})
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column("text")
    description: string;

    @Column()
    filename: string;

    @Column("decimal")
    views: number;

    @Column()
    isPublished: boolean;

    @Column()
    address: string;

    @Column()
    phone: string;

}
