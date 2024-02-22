import { Injectable } from "@nestjs/common";
import { CreateApplicationDTO } from "./dto/create-application.dto";
import { PrismaService } from "prisma/prisma.service";
import { UpdatePutApplicationDTO } from "./dto/update-put-application.dto";

@Injectable()
export class ApplicationService {
	constructor(
		private readonly prismaService: PrismaService
	) {}


	async create(application: CreateApplicationDTO, userId: number) {
		return this.prismaService.application.create({
			data: {
				...application,
				user_id: userId
			}
		});
	}

	async update(application: UpdatePutApplicationDTO, id: number) {
		return this.prismaService.application.update({
			data: {
				status: application.status,
			},
			where: {
				id
			}
		});
	}

	async findAll() {
        return this.prismaService.application.findMany({
            where: {
                deleted: false
            },
            include: {
                users: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
    }

    async findById(id: number) {
        return this.prismaService.application.findUnique({
            where: {
                id,
                deleted: false
            },
            include: {
                users: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
    }

	async delete(id: number) {
		return this.prismaService.application.update({
			where: { id },
			data: {
				deleted: true,
			},
		  });
	}
}