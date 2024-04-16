import {
  TypeHelpOptions,
  TypeOptions,
} from 'class-transformer/types/interfaces';
import { applyDecorators } from '@nestjs/common';
import { ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export function Nested(
  // eslint-disable-next-line @typescript-eslint/ban-types
  typeFunction: (type?: TypeHelpOptions) => Function,
  options?: TypeOptions,
) {
  return applyDecorators(
    Expose(),
    ValidateNested(),
    Type(typeFunction, options),
  );
}
