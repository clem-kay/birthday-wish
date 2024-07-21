import { Controller, Get, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  addWish(@Body('name') name: string,
    @Body('message') message: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = file ? `/public/images/${file.filename}` : undefined;
    this.wishesService.addWish(name,message, imageUrl);
    this.wishesService.saveWish(name,message,imageUrl);
    return {name, message, imageUrl };
  }

  @Get('/all-wishes')
  getAllWishes() {
    return this.wishesService.getAllWishes();
  }
}
