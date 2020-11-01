import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection, createQueryBuilder } from 'typeorm';
import { Notification } from '../entity/notification.entity';
import { User } from '../user/user.entity';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>) { }

    async  getAllNotification() {
        // return await this.notificationRepository.find();
        const notifications = createQueryBuilder(Notification, 'notif')
            .addSelect('notif.type_of_notification', 'type_of_notification')
            .addSelect('notif.is_unread', 'is_unread')
            .addSelect('notif.post_id', 'post_id')
            .addSelect('notif.id', 'id')
            .addSelect('notif.created_time', 'created_time')
            .addSelect('user.fullName', 'fullName')
            .innerJoin(User, 'user', 'notif.sender_id = user.id') //INNER JOIN table2 t2 ON t1.id = t2.id
            .getRawMany() // depend on what you need really
        return notifications;
    }


}
