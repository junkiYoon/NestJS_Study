import { Injectable, Module } from '@nestjs/common';

@Injectable()
class LoggerService {
  /**
   * 구현내용
   */
}

const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  providers: [LoggerService, loggerAliasProvider],
})
export class AppModule {}
