import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Roulette {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'roulette_id'
    })
    id: number

    @Column({
        nullable: false
    })
    random_number: number
}