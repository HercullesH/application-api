import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const options = new DocumentBuilder()
    .setTitle('Application API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('auth') // Adding 'auth' tag first
    .addTag('users')
    .addTag('applications')
		.addBearerAuth()
    .build();

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	
	const document = SwaggerModule.createDocument(app, options);
	document.tags = document.tags.sort((a, b) => {
    if (a.name === 'auth') return -1;
    if (b.name === 'auth') return 1;
    return a.name.localeCompare(b.name);
  });

	SwaggerModule.setup('api', app, document);
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())
	app.enableShutdownHooks()
	await app.listen(3001);
}

bootstrap();
