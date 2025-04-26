export interface MediaUploader {
  processAndUpload(
    file: Express.Multer.File,
  ): Promise<{ videoUrl: string; audioUrl: string }>;
}
