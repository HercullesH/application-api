import { PartialType } from "@nestjs/mapped-types";
import { CreateApplicationDTO } from "./create-application.dto";
import { type_status_enum } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export class UpdatePutApplicationDTO extends PartialType(CreateApplicationDTO) {

    @ApiProperty({
        type: "string",
        enum: type_status_enum,
        example: type_status_enum.Approved,
        description: "Can be 'Pending', 'Approved' or 'Rejected'. "
    })
    @IsEnum(type_status_enum)
    status: type_status_enum;

}
