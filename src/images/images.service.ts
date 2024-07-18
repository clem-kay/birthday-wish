import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { readdir } from 'fs';
import { join } from 'path';


@Injectable()
export class ImagesService {

  private readonly imagesPath = join(__dirname, '..', '..', 'public', 'images');

  async getImages(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      readdir(this.imagesPath, (err, files) => {
        if (err) {
          return reject(err);
        }
        resolve(files.map(file => `/images/${file}`));
      });
    });
  }
  
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }
  

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
