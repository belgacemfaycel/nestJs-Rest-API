import { Controller, Post, Body } from '@nestjs/common';
import { PushSubscriptionService } from './push-subscription.service';
import { PushSubscription } from '../entity/push-subscription.entity';
import * as webPush from 'web-push';

@Controller('push-subscription')
export class PushSubscriptionController {
    vapidKeys = {
        "publicKey": "BMs5BkLftBIYqjL4r99k0u6cM3L8eMZFZrIolitBeyUP8y87EBO6Ob9L_qAUJLQofTqyRveWAeZq2vzftrSMHBo",
        "privateKey": "EMZK5tOXwYHLSyXJm4X3L2GhThLToGWbp39vM3RT8Oo"
    };
    constructor(
        private readonly pushSubscriptionService: PushSubscriptionService
    ) {
        this.setupWebPush();
    }
    setupWebPush(): void {
        webPush.setVapidDetails(
            'mailto:my_email@my_domain.com',
            this.vapidKeys.publicKey,
            this.vapidKeys.privateKey,
        )
    }
    @Post()
    // @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() push: any) {

        let item: PushSubscription = new PushSubscription();
        item.endpoint = push.endpoint;
        item.auth = push.keys.auth;
        item.p256dh = push.keys.p256dh;
        item.expirationTime = new Date();
        console.log(item);
        return this.pushSubscriptionService.createPushSubriction(item);
    }
    @Post('sendNewsletter')
    // @UseGuards(JwtAuthenticationGuard)
    async sendNewsletter(req, res) {
        this.pushSubscriptionService.getAllSubscriptions().then(data => {
            const allSubscriptions: any = [];
            // data;
            for (let index = 0; index < data.length; index++) {
                let element: any = {};
                element.endpoint = data[index].endpoint;
                element.expirationTime = data[index].expirationTime;
                element.keys = {};
                element.keys.p256dh = data[index].p256dh;
                element.keys.auth = data[index].auth;
                allSubscriptions.push(element);
            }
            console.log(allSubscriptions);

            const notificationPayload = {
                "notification": {
                    "title": "Angular News",
                    "body": "Newsletter Available!",
                    "icon": "assets/main-page-logo-small-hat.png",
                    "vibrate": [100, 50, 100],
                    "data": {
                        "dateOfArrival": Date.now(),
                        "primaryKey": 1
                    },
                    "actions": [{
                        "action": "explore",
                        "title": "Go to the site"
                    }]
                }
            };
            Promise.all(allSubscriptions.map(sub => webPush.sendNotification(
                sub, JSON.stringify(notificationPayload))))
                .then(() => res.status(200).json({ message: 'Newsletter sent successfully.' }))
                .catch(err => {
                    console.error("Error sending notification, reason: ", err);
                    res.sendStatus(500);
                });
        });


    }




}
