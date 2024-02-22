import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './applications/application.module';
import { AuthModule } from './auth/auth.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    ApplicationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {
  async configureSwagger() {
    const app = await NestFactory.create(AppModule);
    const options = new DocumentBuilder()
      .setTitle('Application API')
      .setDescription('manages loan applications, including submission, status checks, and admin management')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
