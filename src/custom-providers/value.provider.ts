import { Module } from '@nestjs/common';
import { CatsModule } from 'src/cats/cats.module';
import { CatsService } from 'src/cats/cats.service';

const mockCatsService = {
  /**
   * 구현내용
   */
};

@Module({
  imports: [CatsModule],
  providers: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
  ],
})
export class AppModule {}
