import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ZipModule } from './zip/zip.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ZipModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('zip');
  }
}
