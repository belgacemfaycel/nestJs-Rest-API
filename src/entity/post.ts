import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    content: string;

    @Column({ length: 25 })
    title: string;

}

