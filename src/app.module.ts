import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
