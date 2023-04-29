import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRandomString(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
