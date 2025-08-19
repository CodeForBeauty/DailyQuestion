import supertest from "supertest"

import app from "../app"
import { clearDatabase } from "../db"

const api = supertest(app)

const defaultUser = { name: "test", password: "password" }

beforeEach(async () => {
  await clearDatabase()

  await api.post("/user/reg").send(defaultUser)
})

describe("testing login api", () => {
  test("new account is registered", async () => {
    const response = await api
      .post("/user/reg")
      .send({ name: "new_user", password: "password" })
      .expect(200)

    expect(response.body.token).not.toBeNull()
  })

  test("can login into existing account", async () => {
    const response = await api.post("/user/login").send(defaultUser).expect(200)

    expect(response.body.token).not.toBeNull()
  })

  test("can't login into non existing account", async () => {
    await api.post("/user/login").send({name: "non existent", password: ""}).expect(401)
  })

  test("can't login with wrong password", async () => {
    await api.post("/user/login").send({name: defaultUser.name, password: ""}).expect(401)
  })
})
