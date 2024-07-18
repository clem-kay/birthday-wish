// src/wishes/wishes.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class WishesService {
  private wishes: { message: string; imageUrl?: string }[] = [];

  getAllWishes() {
    return this.wishes;
  }

  addWish(message: string, imageUrl?: string) {
    this.wishes.push({ message, imageUrl });
  }
}
