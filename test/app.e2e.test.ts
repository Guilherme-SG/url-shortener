import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { ShortenUrlUseCase } from "../src/use-cases/shorten-url.use-case";

describe("ShortenUrlController (e2e)", () => {
	let app: INestApplication;
	let service: ShortenUrlUseCase;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		service = moduleFixture.get<ShortenUrlUseCase>(ShortenUrlUseCase);
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	describe("/ (POST)", () => {
		it("should return a shortened URL", async () => {
			const longUrl = "https://www.example.com/this/is/a/very/long/url";
			const response = await request(app.getHttpServer())
				.post("/")
				.send(longUrl)
				.expect(201);

			expect(response.body.shortenedUrl).toBeDefined();
			expect(response.body.shortenedUrl).not.toEqual(longUrl);
			expect(response.body.shortenedUrl).toMatch(
				/^http:\/\/localhost:3000\/\w+$/,
			);
		});
	});

	describe("/:url (GET)", () => {
		it("should return the expanded URL", async () => {
			const longUrl = "https://www.example.com/this/is/a/very/long/url";
			const { shortenedUrl } = service.shortenUrl(longUrl);

			const response = await request(app.getHttpServer())
				.get(`/${shortenedUrl}`)
				.expect(302);

			expect(response.status).toEqual(302);
			expect(response.redirect).toBeTruthy();
			expect(response.text).toBe(`Found. Redirecting to ${longUrl}`);
		});
	});
});
