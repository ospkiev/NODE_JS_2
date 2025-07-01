import {Module, MiddlewareConsumer, Logger} from '@nestjs/common';
import { ConfigModule }   from '@nestjs/config';
import configuration      from './config/configuration';
import { UsersModule }    from './users/users.module';
import { AuthModule }     from './auth/auth.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    AuthModule,
    UsersModule,
  ],
  providers: [Logger]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}