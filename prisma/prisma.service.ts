import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
	async onModuleInit() {
		await this.$connect();
	}

	async enabledShutdownHooks(app: INestApplication) {
		process.on('beforeExit', async () => {
			console.log('beforeExit hook')
			await app.close();
		  })
	}
}