import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    @IsString()
    @IsNotEmpty() 
    @Expose() 
    fullName: string;

    @Column()
    @Expose()
    cookie: string;

    @Column('date')
    @Expose()
    birthday: Date;

    @Column({ unique: true })
    @IsEmail()
    @Expose()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;

    @Column()
    isActive: boolean;
}