import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    @IsString()
    @IsNotEmpty()  
    fullName: string;

    @Column('date')
    birthday: Date;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;

    @Column()
    isActive: boolean;
}