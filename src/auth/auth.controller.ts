import { Controller, Post, Body, UseGuards, Req } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('auth')
export class AuthController{

	constructor(
		private readonly userService:  UserService,
		private readonly authService: AuthService,
		){}

	@Post('login')
	async login(@Body() body: AuthLoginDTO) {
		return this.authService.login(body.email, body.password);
	}

	@Post('register')
	async register(@Body() body: AuthRegisterDTO) {
		return this.userService.create(body);
	}
}