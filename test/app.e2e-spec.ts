import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { NestExpressApplication } from "@nestjs/platform-express";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    await app.init();
  });

  it("/posts (GET)", () => {
    return request(app.getHttpServer()).get("/posts").expect(200);
  });

  it("/auth/register", () => {
    return request(app.getHttpServer())
      .post("/auth/register")
      .set("Accept", "application/json")
      .send({
        name: "Khalid",
        email: "khalid@gmail.com",
        password: "12345",
      })
      .expect(201)
      .expect("Account created!");
  });

  it("/auth/login", async () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .set("Accept", "application/json")
      .send({
        email: "bin@gmail.com",
        password: "123456",
      })
      .expect(201)
      .then((response) => {
        expect(response.body._id).toBe("64cb67b7116ade7c0c33e1fb");
        expect(response.body).toHaveProperty("name");
        console.log(response.body);
      });
  });
});
