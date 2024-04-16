import { ApiTags } from '@nestjs/swagger';
import { applyDecorators, Controller as NestController } from '@nestjs/common';

export function Controller(path: string) {
  return applyDecorators(
    NestController(path),
    ApiTags(
      path
        .split('/')
        .filter((part) => part) // Filtre les chaînes vides pour ignorer les slashs initiaux et finaux
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalise chaque segment
        .join(' '),
    ),
  );
}
