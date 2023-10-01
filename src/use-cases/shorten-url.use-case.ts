import { Injectable } from "@nestjs/common";

@Injectable()
export class ShortenUrlUseCase {
	private readonly urlMap = new Map<string, string>();

	expandUrl(shortUrl: string): string {
		return this.urlMap.get(shortUrl);
	}

	shortenUrl(longUrl: string): { shortenedUrl: string } {
		const randomCode = Math.random().toString(36).substring(2, 8);
		const shortUrl = `http://localhost:3000/${randomCode}`;
		this.urlMap.set(randomCode, longUrl);
		return { shortenedUrl: shortUrl };
	}
}
