import {
  BadRequestException,
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import helmet from 'helmet';
import { ServerConfig } from '#config/beans';
import { SequelizeUniqueConstraintErrorFilter } from './errors/SequelizeUniqueConstraintErrorFilter';
import { InternalServerErrorFilter } from './errors/InternalServerErrorFilter';
import { MulterPayloadTooLargeExceptionFilter } from './errors/MulterPayloadTooLargeExceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { ConfigurationService } from '#core/configuration/configuration.service';
import { DatabaseService } from '#core/database/services/database.service';
import {
  ApiBadRequestErrorMessage,
  Constraints,
} from '#core/swagger/ApiBadRequestResponse.decorator';
import { GenericService } from '#core/generic.service';

export class AppService extends GenericService {
  private readonly GLOBAL_PREFIX = 'api';
  private readonly SWAGGER_PATH = 'api/docs';
  private readonly PORT: ServerConfig['port'];
  private readonly CORS: ServerConfig['cors'];
  private databaseService: DatabaseService;

  constructor(private app: INestApplication) {
    super();
    const serverConfig = app.get(ServerConfig);
    this.databaseService = app.get(DatabaseService);
    this.PORT = serverConfig.port || 3000;
    this.CORS = serverConfig.cors;
  }

  public async init() {
    this.setGlobalPrefix();
    this.useGlobalPipes();
    this.useGlobalInterceptors();
    this.useExceptionFilters();
    this.useProtections();
    this.initSwagger();
    await this.initDatabaseService();
  }

  public async initDatabaseService() {
    this.databaseService.addModels();
    await this.databaseService.authenticate();
    await this.databaseService.runMigrations();
  }

  private setGlobalPrefix(): void {
    this.app.setGlobalPrefix(this.GLOBAL_PREFIX);
  }

  async listen(): Promise<void> {
    await this.app.listen(this.PORT);
    Logger.log(
      `🚀 Application is running on: http://localhost:${this.PORT}/${this.GLOBAL_PREFIX}`,
    );
    Logger.log(
      `🚀 Swagger UI is server on: http://localhost:${this.PORT}/${this.SWAGGER_PATH}`,
    );
    Logger.log(
      `🚀 Swagger json file is server on: http://localhost:${this.PORT}/${this.SWAGGER_PATH}-json`,
    );
  }

  private useCors(): void {
    this.app.enableCors(this.CORS);
  }

  useGlobalInterceptors() {
    this.app.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.app.get(Reflector), {
        excludeExtraneousValues: true,
      }),
    );
  }

  private useExceptionFilters() {
    this.app.useGlobalFilters(new SequelizeUniqueConstraintErrorFilter());
    this.app.useGlobalFilters(new InternalServerErrorFilter());
    this.app.useGlobalFilters(new MulterPayloadTooLargeExceptionFilter());
  }

  private useGlobalPipes() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // supprime automatiquement toutes les propriétés qui n'ont pas de décorateurs définis dans le DTO
        disableErrorMessages: ConfigurationService.isProductionMode(), // Désactiver les messages d'erreur détaillés
        transform: true, // transforme automatiquement les objets simples en instances de leur classe
        forbidNonWhitelisted: true,
        exceptionFactory: (errors) => {
          const errorsForResponse = errors.map(
            (error) =>
              new ApiBadRequestErrorMessage({
                property: error.property,
                constraints: error.constraints as unknown as Constraints,
              }),
          );
          this.logger.error(errors);
          return new BadRequestException(errorsForResponse);
        },
      }),
    );
  }

  private useProtections() {
    this.useCors();
    this.useHttpHeadersProtection();
  }

  private useHttpHeadersProtection() {
    this.app.use(helmet());
  }

  private initSwagger() {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Boumboum API')
      .setDescription('The Boumboum API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(this.SWAGGER_PATH, this.app, document);
  }
}
