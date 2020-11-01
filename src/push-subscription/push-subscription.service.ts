
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PushSubscription } from '../entity/push-subscription.entity';


@Injectable()
export class PushSubscriptionService {


    constructor(@InjectRepository(PushSubscription) private pushSubscriptionRepository: Repository<PushSubscription>) {

    }

    async createPushSubriction(push: PushSubscription) {
        this.pushSubscriptionRepository.save(push)
    }

    async getAllSubscriptions() {
       return await this.pushSubscriptionRepository.find();
    }



}
