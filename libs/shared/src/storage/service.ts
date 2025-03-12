import { Injectable } from '@nestjs/common';
// import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
// import * as sharp from 'sharp';
import { randomUUID } from 'crypto';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  // private s3: S3Client;
  // private bucket: string;

  // constructor(private configService: ConfigService) {
  // this.s3 = new S3Client({
  //   region: this.configService.get<string>('AWS_REGION'),
  //   credentials: {
  //     accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
  //     secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
  //   },
  // });
  // this.bucket = this.configService.get<string>('AWS_S3_BUCKET');
  // }

  /**
   * Saves image locally in a specific folder inside `uploads/`
   */
  saveToLocal(file: Express.Multer.File, folder: string): string {
    const fileExt = extname(file.originalname);
    const newFilename = `${randomUUID()}${fileExt}`;
    const uploadPath = join(__dirname, '..', '..', 'uploads', folder);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    const finalPath = join(uploadPath, newFilename);
    fs.writeFileSync(finalPath, file.buffer);
    return `/uploads/${folder}/${newFilename}`;
  }

  async deleteFromLocal(filePath: string): Promise<void> {
    const fullPath = join(__dirname, '..', '..', filePath);

    // try {
    await fs.promises.access(fullPath);
    await fs.promises.unlink(fullPath);
    // } catch (error) {
    //   throw new ;
    //   // console.error(`Error deleting file: ${error}`);
    // }
  }
  /**
   * Uploads image to AWS S3
   */
  // async uploadToS3(file: Express.Multer.File, folder: string): Promise<string> {
  //   const fileExt = extname(file.originalname);
  //   const newFilename = `${randomUUID()}${fileExt}`;

  //   // Process Image (resize)
  //   const processedImage = await sharp(file.buffer)
  //     .resize(500, 500, { fit: 'cover' })
  //     .toBuffer();

  //   // Upload to S3
  //   await this.s3.send(
  //     new PutObjectCommand({
  //       Bucket: this.bucket,
  //       Key: `${folder}/${newFilename}`,
  //       Body: processedImage,
  //       ContentType: file.mimetype,
  //     }),
  //   );

  //   return `https://${this.bucket}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${folder}/${newFilename}`;
  // }
}
