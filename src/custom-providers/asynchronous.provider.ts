import { Module } from '@nestjs/common';

const createConnection = async (options) => {
  return `Create connection with ${options}`;
};

const connectionProvider = {
  provide: 'ASYNC_CONNECTION',
  useFactory: async () => {
    const options = {
      url: 'Some DB URL',
    };
    const connection = await createConnection(options);
    return connection;
  },
};

@Module({
  providers: [connectionProvider],
})
export class AppModule {}
