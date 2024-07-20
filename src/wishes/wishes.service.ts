import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishesService {

  constructor(private readonly prismaService: PrismaService){}
  private wishes: { message: string, imageUrl?: string }[] = [];

  addWish(message: string, imageUrl?: string) {
    this.wishes.push({ message, imageUrl });
  }
  
  async saveWish(message:string,imageUrl:string) {
    const dto = {message:message,imageUrl:imageUrl} 
    return await this.prismaService.wish.create({
      data:dto
    })
  }

  async getAllWishes() {
    try {
      const wishesFromDb = await this.prismaService.wish.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return wishesFromDb
    } catch (error) {
      console.log(error)
    }
  };
}
