import { Test, TestingModule } from "@nestjs/testing";
import { ShortenUrlController } from "./shorten-url.controller";
import { ShortenUrlUseCase } from "./use-cases/shorten-url.use-case";

describe("ShortenUrlController", () => {
	let controller: ShortenUrlController;
	let service: ShortenUrlUseCase;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShortenUrlController],
			providers: [ShortenUrlUseCase],
		}).compile();

		controller = module.get<ShortenUrlController>(ShortenUrlController);
		service = module.get<ShortenUrlUseCase>(ShortenUrlUseCase);
	});

	describe("redirectTo", () => {
		it("should redirect to original URL", () => {
			const longUrl = "https://www.example.com/this/is/a/very/long/url";
			jest.spyOn(service, "expandUrl").mockReturnValue(longUrl);

			const res = {
				redirect: jest.fn(),
			} as any;

			controller.redirectTo("abc123", res);
			expect(service.expandUrl).toHaveBeenCalledWith("abc123");
		});

		it("should throw an error if given short url doesn't exist", () => {
			jest.spyOn(service, "expandUrl").mockReturnValue(null);

			const res = {
				redirect: jest.fn(),
			} as any;

			expect(() => controller.redirectTo("abc123", res)).toThrowError();
			expect(service.expandUrl).toHaveBeenCalledWith("abc123");
		});
	});

	describe("shortenUrl", () => {
		it("should return a shortened URL", () => {
			const longUrl = "https://www.example.com/this/is/a/very/long/url";
			const shortUrl = "abc123";
			jest
				.spyOn(service, "shortenUrl")
				.mockReturnValue({ shortenedUrl: shortUrl });
			expect(controller.shortenUrl({ url: longUrl })).toEqual({
				shortenedUrl: shortUrl,
			});
			expect(service.shortenUrl).toHaveBeenCalledWith({ url: longUrl });
		});
	});
});
