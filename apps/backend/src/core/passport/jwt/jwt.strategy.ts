import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Joi, { PartialSchemaMap } from 'joi';
import { ProjectPermission } from '../beans/ProjectPermission';
import { Dto } from '#core/beans/Dto';
import { PayloadValidated } from '#core/jwt/jwt.service';
import { JwtConfig } from '#config/beans';
import { User } from '#modules/user/models/user.entity';
import { Nullable } from '#core/database/models/beans/associations/Association';
import { AuthAccessToken } from '#modules/auth/models/auth-access-token.entity';
import { AuthService } from '#modules/auth/services/auth.service';

export class JwtStrategyUserInfo extends Dto<JwtStrategyUserInfo> {
  permissions: ProjectPermission[];
  currentAccessTokenId: AuthAccessToken['id'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);
  private readonly JOI_SCHEMA_JWT_PAYLOAD: Joi.ObjectPropertiesSchema<PayloadValidated>;

  constructor(
    private jwtConfig: JwtConfig,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
      algorithms: jwtConfig.algorithms,
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    });
    this.JOI_SCHEMA_JWT_PAYLOAD = {
      sub: Joi.string().required(),
      permissions: Joi.array()
        .items(Joi.string().valid(...Object.values(ProjectPermission)))
        .required(),
      tid: Joi.string().required(),
      iat: Joi.number().required(),
      exp: Joi.number().required(),
      aud: Joi.string().equal(this.jwtConfig.audience).required(),
      iss: Joi.string().equal(this.jwtConfig.issuer).required(),
    };
  }

  async validate(
    payload: object,
    done: (err: null, user: User) => void,
  ): Promise<void> {
    const { sub: subject, permissions, tid } = this.validatePayload(payload);
    const info = new JwtStrategyUserInfo({
      permissions,
      currentAccessTokenId: tid,
    });
    const user = await this.findUser(subject, info);
    if (!user) {
      this.logger.error('Bearer access_token is not valid');
      throw new UnauthorizedException();
    }
    user.info = info;
    return done(null, user);
  }

  private validatePayloadWithJoi(payload: object): Joi.ValidationResult<{
    sub: string;
    permissions: ProjectPermission[];
  }> {
    return Joi.object(
      this.JOI_SCHEMA_JWT_PAYLOAD as PartialSchemaMap<PayloadValidated>,
    ).validate(payload, {
      abortEarly: false,
    });
  }

  private validatePayload(payload: object): PayloadValidated {
    const {
      error,
      value: jwtPayloadValidated,
    }: Joi.ValidationResult<PayloadValidated> =
      this.validatePayloadWithJoi(payload);
    if (error || !jwtPayloadValidated) {
      this.logger.warn('Error validating the token payload : ', error);
      throw new BadRequestException();
    }
    return jwtPayloadValidated;
  }

  private findUser(
    userId: string,
    info: JwtStrategyUserInfo,
  ): Promise<Nullable<User>> {
    if (info.permissions.includes(ProjectPermission.DEFAULT_USER)) {
      this.logger.log(`permission : DEFAULT_USER`);
      return this.authService.findOneUserForSession(userId, info);
    }
    throw new UnauthorizedException();
  }
}
