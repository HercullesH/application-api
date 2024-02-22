import { ApiProperty } from "@nestjs/swagger";
import { type_user_enum } from "@prisma/client";
import { IsString, IsEmail, MinLength, IsEnum } from "class-validator";

export class AuthRegisterDTO {

    @ApiProperty({
        type: "string",
        enum: type_user_enum,
        example: type_user_enum.Admin,
        description: "Can be 'Admin' or 'Applicant'. "
    })
    @IsEnum(type_user_enum)
    typeUser: type_user_enum;

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