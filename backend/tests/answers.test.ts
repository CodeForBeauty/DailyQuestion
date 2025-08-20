import supertest from "supertest"

import app from "../app"
import { clearDatabase } from "../db"

const api = supertest(app)

let token = ""
let token1 = ""

const baseUrl = "/api"

beforeEach(async () => {
  await clearDatabase()

  const response = await api
    .post(baseUrl + "/user/reg")
    .send({ name: "test", password: "password" })

  const response1 = await api
    .post(baseUrl + "/user/reg")
    .send({ name: "test1", password: "password" })

  token = response.body.token
  token1 = response1.body.token
})

describe("testing answers api", () => {
  test("no access without token", async () => {
    await api.get(baseUrl + "/answer").expect(401)
    await api.post(baseUrl + "/answer").expect(401)
  })

  test("access with token", async () => {
    await api
      .get(baseUrl + "/answer")
      .set("authorization", "Bearer " + token)
      .expect(200)
  })

  test("adding answer", async () => {
    await api
      .post(baseUrl + "/answer")
      .set("authorization", "Bearer " + token)
      .send({ answer: "gibberish" })
      .expect(200)

    const response = await api
      .get(baseUrl + "/answer")
      .set("authorization", "Bearer " + token)
      .expect(200)

    expect(response.body.answers.length).toBe(1)
  })

  test("correct answers are returned", async () => {
    const first = { answer: "gibberish" }
    const second = { answer: "some other answer" }

    await api
      .post(baseUrl + "/answer")
      .set("authorization", "Bearer " + token)
      .send(first)
      .expect(200)
    await api
      .post(baseUrl + "/answer")
      .set("authorization", "Bearer " + token1)
      .send({ ...second, isAnon: true })
      .expect(200)

    const response = await api
      .get(baseUrl + "/answer")
      .set("authorization", "Bearer " + token)
      .expect(200)

    expect(response.body.answers.length).toBe(2)

    expect(response.body.answers[0]).toStrictEqual({ ...first, user: "test" })
    expect(response.body.answers[1]).toStrictEqual({ ...second, user: "Anonymous" })
  })

  test("one user can't answer multiple times", async () => {
    const first = { answer: "gibberish" }
    const second = { answer: "some other answer" }

    await api
      .post(baseUrl + "/answer")
      .set("authorization", "Bearer " + token)
      .send(first)
      .expect(200)
    await api
      .post(baseUrl + "/answer")
      .set("authorization", "Bearer " + token)
      .send({ ...second, isAnon: true })
      .expect(400)
  })
})
