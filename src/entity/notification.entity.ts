import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sender_id: number;

    @Column()
    recipient_id: number;

    @Column()
    type_of_notification: number;

    @Column()
    is_unread: number;

    @Column()
    post_id: number;

    @Column()
    created_time: Date;

}

