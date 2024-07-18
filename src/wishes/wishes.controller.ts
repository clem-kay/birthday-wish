// src/wishes/wishes.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { WishesService } from './wishes.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  // Import Multer's File type
  import { Express } from 'express';
  
  @Controller('wishes')
  export class WishesController {
    constructor(private readonly wishesService: WishesService) {}
  
    @Get()
    getAllWishes() {
      return this.wishesService.getAllWishes();
    }
  
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
    addWish(
      @Body('message') message: string,
      @UploadedFile() file: Express.Multer.File, // Correct type here
    ) {
      const imageUrl = file ? `/images/${file.filename}` : undefined;
      this.wishesService.addWish(message, imageUrl);
      return { message, imageUrl };
    }
  }
  