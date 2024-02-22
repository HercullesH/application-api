import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
	imports: [JwtModule.register({
		secret: '21hsahuhsuahu12'
	}),
	forwardRef(() => UserModule)
	,
	PrismaModule,
],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {

}