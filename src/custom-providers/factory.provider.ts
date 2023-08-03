import { Injectable, Module } from '@nestjs/common';

@Injectable()
export class OptionsProvider {
  get = () => {
    return {
      url: 'Some DB URL',
    };
  };
}

class DatabaseConnection {
  constructor(options) {
    return `Create connection with ${options}`;
  }
}

const connectionProvider = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider, optionalProvider?: string) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider, { token: 'SomeOptionalProvider', optional: true }],
};

@Module({
  providers: [
    connectionProvider,
    OptionsProvider,
    { provide: 'SomeOptionalProvider', useValue: 'anything' },
  ],
  exports: ['CONNECTION'],
})
export class AppModule {}
