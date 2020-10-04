import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    fullName: string;

    @Column('date')
    birthday: Date;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;
}