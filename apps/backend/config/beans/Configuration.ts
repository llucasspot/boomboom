import { DatabaseDialect } from './DatabaseConfig';
import { Algorithm } from 'jsonwebtoken';
import { DatabaseService } from '#core/database/services/database.service';
import { ClassProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Dto } from '#core/beans/Dto';

export class ServerConfig extends Dto<ServerConfig> {
  port: number;
  cors: CorsOptions;
}

export type DatabaseConfig = {
  dialect: DatabaseDialect;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  storage?: string;
  logging: boolean;
  migrationsFolder: string;
  runMigrations: boolean;
  alter: boolean;
};

export class DatabaseConfigs extends Dto<DatabaseConfigs> {
  provider: ClassProvider<DatabaseService>['useClass'];
  configs: Record<DatabaseDialect, DatabaseConfig>;
}

export class DatabaseDialectConfigs extends Dto<DatabaseDialectConfigs> {
  [DatabaseDialect.MY_SQL]: DatabaseConfig;
  [DatabaseDialect.SQLITE]: DatabaseConfig;
}

type ExpiresIn =
  | `${number}m`
  | `${number}h`
  | `${number}d`
  | `${number}w`
  | `${number}y`;

export class JwtConfig extends Dto<JwtConfig> {
  secret: string;
  expiresIn: ExpiresIn;
  refreshTokenExpiresIn: ExpiresIn;
  issuer: string;
  audience: string;
  algorithms: Algorithm[];
}

export class SecurityConfig extends Dto<SecurityConfig> {
  hashingNumberRoundsSalt: number;
}

export class UploadConfig extends Dto<UploadConfig> {
  uploadsFolder: string;
}
