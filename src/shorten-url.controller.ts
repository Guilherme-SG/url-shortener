import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ShortenUrlUseCase } from "./use-cases/shorten-url.use-case";
import { Response } from "express";

@Controller()
export class ShortenUrlController {
	constructor(private readonly shortenUrlService: ShortenUrlUseCase) {}

	@Get("/:url")
	redirectTo(@Param("url") shortnedUrl: string, @Res() res: Response): void {
		const url = this.shortenUrlService.expandUrl(shortnedUrl);
		res.redirect(url);
	}

	@Post()
	shortenUrl(@Body() data: { url: string } ): { shortenedUrl: string } {
		return this.shortenUrlService.shortenUrl(data.url);
	}
}
