
import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [PrismaModule, AuthModule, UserModule],
	controllers: [ApplicationController],
	providers: [ApplicationService],
	exports: []
})
export class ApplicationModule { }