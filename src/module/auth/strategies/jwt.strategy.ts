import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_PASSWORD'),
    });
  }

  //TODO: tipar meu payload
  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.username,
      //TODO: como mudar o token quando mudar de instituição
      role: payload.role,
      email: payload.email,
    };
  }
}
