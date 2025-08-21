import supertest from "supertest"

import app from "../app"
import { clearDatabase } from "../db"

import config from "../utils/config"

const api = supertest(app)

beforeEach(async () => {
  await clearDatabase()
})

describe("testing questions api", () => {
  test("adding question", async () => {
    await api
      .post("/api/question")
      .send({ question: "testing", offset: 0, password: config.ADMIN_PASSWORD })
      .expect(200)

    const response = await api.get("/api/question").expect(200)

    expect(response.body.length).toBe(1)
  })
})
