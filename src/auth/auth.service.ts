import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor (
		private readonly jwtService: JwtService,
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		){}

	createToken(user: User) {
		return {
			accessToken: this.jwtService.sign({
				sub: user.id,
				name: user.name,
				email: user.email,
			}, {
				issuer: 'login',
				audience: 'users',
			})
		}
		
	}

	checkToken(token:string) {
		try {
			const data = this.jwtService.verify(token, {
				audience: 'users',
				issuer: 'login'
			})

			return data
		} catch (error) {
			throw new BadRequestException(error);
		}
		
	}

	isValidToken(token: string) {
		try {
			this.checkToken(token);
			return true;
		} catch (error) {
			return false;
		}
	}

	async login(email: string, password: string) {
		const user = await this.prismaService.user.findFirst({
			where: {
				email
			}
		})

		if (!user) {
			throw new UnauthorizedException('E-mail e/ou senha inválidos')
		}

		if (!bcrypt.compare(password, user.password)) {
			throw new UnauthorizedException('E-mail e/ou senha inválidos')
		}

		return this.createToken(user);
	}

	async register(data: AuthRegisterDTO) {
		const user = await this.userService.create(data);

		return this.createToken(user);
	}
}
