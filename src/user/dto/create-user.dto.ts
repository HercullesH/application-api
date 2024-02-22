import { ApiProperty } from "@nestjs/swagger";
import { type_user_enum } from "@prisma/client";
import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateUserDTO {

	@ApiProperty()
	typeUser: type_user_enum

	@IsString()
	@ApiProperty()
	name: string;

	@IsEmail()
	@ApiProperty()
	email: string;
	
	@IsString()
	@MinLength(6)
	@ApiProperty()
	password: string;
}