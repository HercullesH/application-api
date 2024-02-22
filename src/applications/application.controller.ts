import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { CreateApplicationDTO } from "./dto/create-application.dto";
import { UpdatePutApplicationDTO } from "./dto/update-put-application.dto";
import { ApplicationService } from "./application.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { User } from "src/decorators/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@UseGuards(AuthGuard, RoleGuard)
@Controller('applications')
@ApiTags('applications')
@ApiBearerAuth()
export class ApplicationController {

	constructor(private readonly applicationService: ApplicationService) {}

	@Roles(Role.Admin, Role.Applicant)
	@Post()
	async create(@User('id') userId, @Body() application: CreateApplicationDTO) {
		return this.applicationService.create(application, userId);
	}
	
	@Roles(Role.Admin)
	@Get()
	async findAll() {
		return this.applicationService.findAll();
	}

	@Roles(Role.Admin, Role.Applicant)
	@Get(':id')
	async findById(@Param('id', ParseIntPipe) id: number) {
		return this.applicationService.findById(id);
	}

	@Roles(Role.Admin)
	@Put(':id/update-status')
	async update(@Body() application : UpdatePutApplicationDTO, @Param('id', ParseIntPipe) id: number) {
		return this.applicationService.update(application, id);

	}

	@Roles(Role.Admin)
	@Delete(':id')
	async delete(@Param('id', ParseIntPipe) id: number) {
		return this.applicationService.delete(id)
	}
}