import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PushSubscription {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    endpoint: string;

    @Column()
    expirationTime: Date;

    @Column()
    p256dh: string;

    @Column()
    auth: string;


}

