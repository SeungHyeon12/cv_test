import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import { BlobServiceClient } from '@azure/storage-blob';
import { MediaUploader } from 'src/service/interface/mediaUploader.interface';

@Injectable()
export class MediaUploadProcessor implements MediaUploader {
  private readonly containerName = 'your-container-name';
  private readonly azureConnectionString = 'your-azure-blob-connection-string';

  async processAndUpload(
    file: Express.Multer.File,
  ): Promise<{ videoUrl: string; audioUrl: string }> {
    if (!file) {
      throw new Error('No file provided');
    }

    //1. file 에 대해서 local 로 저장장
    const uploadPath = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const originalFilename = `${Date.now()}-${file.originalname}`;
    const inputPath = path.join(uploadPath, originalFilename);
    fs.writeFileSync(inputPath, file.buffer);

    // 2. ffmpeg 적용용
    const croppedPath = inputPath.replace(/\.mp4$/, '-cropped.mp4');
    const mutedPath = inputPath.replace(/\.mp4$/, '-muted.mp4');
    const audioPath = inputPath.replace(/\.mp4$/, '.mp3');

    await this.cropVideo(inputPath, croppedPath);
    await this.removeAudio(croppedPath, mutedPath);
    await this.extractAudio(croppedPath, audioPath);

    // 3. azure blob 에 저장장
    const videoUrl = await this.uploadToAzure(mutedPath);
    const audioUrl = await this.uploadToAzure(audioPath);

    // 4. 로컬 디렉토리 삭제
    fs.unlinkSync(inputPath);
    fs.unlinkSync(croppedPath);
    fs.unlinkSync(mutedPath);
    fs.unlinkSync(audioPath);

    return { videoUrl, audioUrl };
  }

  private cropVideo(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .videoFilters('crop=640:720:640:0')
        .audioCodec('copy')
        .on('end', () => {
          console.log('Crop completed');
          resolve();
        })
        .on('error', (err) => {
          console.error('Crop error:', err);
          reject(err);
        })
        .save(outputPath);
    });
  }

  private removeAudio(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .noAudio()
        .on('end', () => {
          console.log('Crop completed');
          resolve();
        })
        .on('error', (err) => {
          console.error('Crop error:', err);
          reject(err);
        })
        .save(outputPath);
    });
  }

  private extractAudio(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .noVideo()
        .audioCodec('libmp3lame')
        .audioQuality(0)
        .on('end', () => {
          console.log('Crop completed');
          resolve();
        })
        .on('error', (err) => {
          console.error('Crop error:', err);
          reject(err);
        })
        .save(outputPath);
    });
  }

  private async uploadToAzure(filePath: string): Promise<string> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.azureConnectionString,
    );
    const containerClient = blobServiceClient.getContainerClient(
      this.containerName,
    );

    const blobName = path.basename(filePath);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const fileBuffer = fs.readFileSync(filePath);
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: { blobContentType: this.getContentType(blobName) },
    });

    return blockBlobClient.url;
  }

  private getContentType(fileName: string): string {
    if (fileName.endsWith('.mp4')) return 'video/mp4';
    if (fileName.endsWith('.mp3')) return 'audio/mpeg';
    return 'application/octet-stream';
  }
}
