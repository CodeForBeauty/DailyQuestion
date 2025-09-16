import { MemoryRouter } from "react-router-dom"

import { render, screen } from "@testing-library/react"

import Question from "../components/Question"

describe("<Question />", () => {
  test("Question renders correctly", async () => {
    const question = "Something"

    render(
      <MemoryRouter>
        <Question question={question} id={0} />
      </MemoryRouter>,
    )

    const mainInfo = await screen.findByText(question)

    expect(mainInfo).toBeDefined()
  })
})
