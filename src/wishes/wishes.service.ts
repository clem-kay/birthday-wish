import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishesService {

  constructor(private readonly prismaService: PrismaService){}
  private wishes: {name:string, message: string, imageUrl?: string }[] = [];

  addWish(name:string,message: string, imageUrl?: string) {
    this.wishes.push({ name,message, imageUrl });
  }
  
  async saveWish(name:string,message:string,imageUrl:string) {
    const dto = {name:name,message:message,imageUrl:imageUrl} 
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
