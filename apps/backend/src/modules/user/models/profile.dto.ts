import { Expose } from 'class-transformer';
import { StringLength } from '#core/database/models/beans/columns-enums';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Dto } from '#core/beans/Dto';
import { Nested } from '#core/decorators/Nested';
import { UserDto } from './user.dto';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NON_BINARY = 'NON_BINARY',
}

export class ProfileDto extends Dto<ProfileDto> {
  @Expose()
  id: string;

  @Expose()
  @MaxLength(StringLength.TEXT)
  @IsOptional()
  description?: string;

  @IsDate()
  @Nested(() => Date)
  dateOfBirth: Date;

  @Expose()
  @IsEnum(Gender)
  gender: Gender;

  @Expose()
  @IsArray()
  @IsEnum(Gender, { each: true })
  gendersToShow: Gender[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  trackIds: string[];

  @Expose()
  @IsUUID(4)
  userId: UserDto['id'];
  @Nested(() => UserDto)
  user?: UserDto;

  @Expose()
  creationDate: Date;
  @Expose()
  updatedOn: Date;
  @Expose()
  deletionDate?: Date;
}
