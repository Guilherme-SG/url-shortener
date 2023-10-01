import { Module } from "@nestjs/common";
import { ShortenUrlController } from "./shorten-url.controller";
import { ShortenUrlUseCase } from "./use-cases/shorten-url.use-case";

@Module({
	imports: [],
	controllers: [ShortenUrlController],
	providers: [ShortenUrlUseCase],
})
export class AppModule {}
