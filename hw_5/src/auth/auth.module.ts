import { Module } from '@nestjs/common';
import { JwtModule }  from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService }   from './auth.service';
import { AuthController }from './auth.controller';

@Module({
  controllers: [AuthController],
  providers:   [AuthService],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get('jwtSecret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}