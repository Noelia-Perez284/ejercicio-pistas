import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VehiculoController } from './vehiculo/vehiculo.controller';
import { AppService } from './app.service';
import { VehiculoService } from './vehiculo/vehiculo.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
  ],
  controllers: [AppController,VehiculoController],
  providers: [AppService,VehiculoService],
})
export class AppModule {}
