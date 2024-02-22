import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsDate, IsNumber } from "class-validator";

export class CreateApplicationDTO {
	@IsNumber()
	@ApiProperty({
        type: "number",
        example: 999.99,
        description: "Can be 'Pending', 'Approved' or 'Rejected'. "
    })
	amount: number;

}

enum TypeStatus {
	Applicant = 'applicant',
	Admin = 'Admin',
}