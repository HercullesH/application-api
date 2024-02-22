import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Roles(Role.Admin)
	@Get()
	async findAll() {
		return this.userService.findAll();
	}

	@Roles(Role.Admin)
	@Get(':id')
	async findById(@Param('id', ParseIntPipe) id: number) {
		return this.userService.findById(id);
	}
}