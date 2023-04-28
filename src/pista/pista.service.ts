import { Injectable } from '@nestjs/common';

@Injectable()
export class PistaService {
    getRandomString(): string {
        return (Math.random() + 1).toString(36).substring(7);
      }
}
