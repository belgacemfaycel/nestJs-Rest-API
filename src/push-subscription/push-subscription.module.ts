import { Module } from '@nestjs/common';
import { PushSubscriptionService } from './push-subscription.service';
import {PushSubscriptionController} from './push-subscription.controller';
import { PushSubscription } from '../entity/push-subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([PushSubscription])],
  controllers: [PushSubscriptionController],
  providers: [PushSubscriptionService]
})

export class PushSubscriptionModule {}
