import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishesGateway } from './wishes/wishes.gateway';
import { WishesModule } from './wishes/wishes.module';

@Module({
  imports: [WishesModule],
  controllers: [AppController],
  providers: [AppService, WishesGateway],
})
export class AppModule {}
