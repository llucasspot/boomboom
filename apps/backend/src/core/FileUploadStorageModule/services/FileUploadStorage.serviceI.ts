import { GenericService } from '#core/generic.service';
import { Response } from 'express';

export abstract class FileUploadStorageServiceI extends GenericService {
  public static UPLOAD_MIMES_ERROR = 'UPLOAD_MIMES_ERROR';
  public static UPLOAD_LIMIT_FILE_SIZE_ERROR = 'UPLOAD_LIMIT_FILE_SIZE_ERROR';
  public static CHUNKS_MIMES = ['image/jpeg', 'image/jpg', 'image/png'];
  static CHUNK_SIZE: number = 1048576; // 1024 * 1024;

  abstract serveFile(response: Response, fileName: string): void;

  abstract upload(file: Express.Multer.File, fileName: string): Promise<void>;
}
