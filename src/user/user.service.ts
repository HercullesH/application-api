import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService
	) {}


	async create({ email, name, password, typeUser }: CreateUserDTO) {
		const userExists = await this.findByEmail(email);

		if (userExists) {
			throw new BadRequestException('User with this email already exists');
		}
		
		const passwordEncrypted = await bcrypt.hash(password, await bcrypt.genSalt())
		return this.prismaService.user.create({
			data: {
				name,
				email,
				password: passwordEncrypted,
				type_user: typeUser
			}
		});
	}

	async findByEmail(email: string) {
		return this.prismaService.user.findFirst({
			where: {
				email
			},
		});
	}

	async findById(id: number) {
		return this.prismaService.user.findUnique({
			where: {
				id
			},
		});
	}

	async findAll() {
		return this.prismaService.user.findMany({
			where: {
				deleted: false,
			},
		});
	}
}