import { Dto, ResponseDto } from '#core/beans/Dto';
import { Expose } from 'class-transformer';
import { Nested } from '#core/decorators/Nested';

export class ImageData extends Dto<ImageData> {
  @Expose()
  height: number;
  @Expose()
  url: string;
  @Expose()
  width: number;
}

export class SerializedTrack extends Dto<SerializedTrack> {
  @Expose()
  uri?: string;
  @Expose()
  popularity?: number;
  @Expose()
  name?: string;
  @Expose()
  trackId?: string;
  @Expose()
  albumName?: string;
  @Nested(() => ImageData)
  albumImage?: ImageData;
  @Expose()
  artistNames: string[];
}

export class SerializedTracksResponse extends ResponseDto<SerializedTracksResponse> {
  @Nested(() => SerializedTrack)
  data: SerializedTrack[];
}
