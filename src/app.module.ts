import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishesGateway } from './wishes/wishes.gateway';
import { WishesModule } from './wishes/wishes.module';
import { ImagesModule } from './images/images.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the configuration global
  }),WishesModule, ImagesModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService, WishesGateway],
})
export class AppModule {}
