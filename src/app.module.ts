import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishesGateway } from './wishes/wishes.gateway';
import { WishesModule } from './wishes/wishes.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [WishesModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService, WishesGateway],
})
export class AppModule {}
