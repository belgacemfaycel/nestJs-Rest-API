import { Controller, Get } from '@nestjs/common';
import { Notification } from '../entity/notification.entity';
import { NotificationService } from './notification.service';
import JwtAuthenticationGuard from '../authentification/jwt-authentication.guard';
import { ExceptionsLoggerFilter } from '../utils/exceptionsLogger.filter';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('notification')
export class NotificationController {

    constructor(
        private readonly notificationService: NotificationService
    ) { }

    @Get()
    getAllNotification() {
        return this.notificationService.getAllNotification();
    }

}
