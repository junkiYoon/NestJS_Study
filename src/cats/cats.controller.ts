import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { timeoutInterceptor } from 'src/common/interceptors/timeout.interceptor';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    try {
      return this.catsService.findAll();
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'Custom Message' },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  @Get('/timeout')
  @UseInterceptors(timeoutInterceptor)
  async testTimeout() {
    return new Promise((resolve) => setTimeout(resolve, 6000));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.findOne(id);
  }
}
