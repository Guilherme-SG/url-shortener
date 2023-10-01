import { ShortenUrlUseCase } from "./shorten-url.use-case";

describe("ShortenUrlUseCase", () => {
	let shortenUrlUseCase: ShortenUrlUseCase;

	beforeEach(() => {
		shortenUrlUseCase = new ShortenUrlUseCase();
	});

	describe("shortenUrl", () => {
		it("should return a shortened URL", () => {
			const longUrl = "https://www.example.com/this/is/a/very/long/url";
			const { shortenedUrl } = shortenUrlUseCase.shortenUrl(longUrl);

			expect(shortenedUrl).toBeDefined();
			expect(shortenedUrl).not.toEqual(longUrl);
			expect(shortenedUrl).toMatch(/^http:\/\/localhost:3000\/\w+$/);
		});
	});

	describe("expandUrl", () => {
		it("should return the original URL", () => {
			const longUrl = "https://www.example.com/this/is/a/very/long/url";
			const { shortenedUrl } = shortenUrlUseCase.shortenUrl(longUrl);
			const foundUrl = shortenUrlUseCase.expandUrl(shortenedUrl);

			expect(foundUrl).toBeDefined();
			expect(foundUrl).toEqual(longUrl);
		});
	});
});
